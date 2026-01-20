import { Elysia, t } from 'elysia';
import { Database } from "bun:sqlite";
import { staticPlugin } from '@elysiajs/static';
import { jwt } from '@elysiajs/jwt';

const db = new Database("BunX_Tech.sqlite", { create: true });

// --- BANCO DE DADOS ---
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha_hash TEXT NOT NULL
    )`);

db.run(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        conteudo TEXT NOT NULL,
        data_postagem DATETIME DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )`);

function calcularTempoRelativo(dataISO: string): string {
    const agora = new Date();
    const postagem = new Date(dataISO);
    const diferencaSegundos = Math.floor((agora.getTime() - postagem.getTime()) / 1000);
    if (diferencaSegundos < 60) return "Agora mesmo";
    const diferencaMinutos = Math.floor(diferencaSegundos / 60);
    if (diferencaMinutos < 60) return `${diferencaMinutos} minuto(s) atrás`;
    const diferencaHoras = Math.floor(diferencaMinutos / 60);
    if (diferencaHoras < 24) return `${diferencaHoras} hora(s) atrás`;
    return `${Math.floor(diferencaHoras / 24)} dia(s) atrás`;
}

// --- SERVIDOR ---
const app = new Elysia()
    .use(staticPlugin())
    .use(
        jwt({
            name: 'jwt',
            secret: 'G@J1iR4',
            exp: '7d'
        })
    )

    // Rotas de Páginas (Públicas)
    .get('/', () => Bun.file('./public/feed.html'))
    .get('/login-page', () => Bun.file('./public/login.html'))
    .get('/cadastro-page', () => Bun.file('./public/cadastro.html'))

    // Rotas de Autenticação
    .post('/registro', async ({ body }) => {
        const { username, email, senha } = body;
        const hash = await Bun.password.hash(senha);
        try {
            db.run("INSERT INTO usuarios (username, email, senha_hash) VALUES (?, ?, ?)", [username, email, hash]);
            return { status: "Sucesso!", mensagem: "Unidade registrada no núcleo. （￣︶￣）↗　" };
        } catch (e) {
            return { status: "Erro", mensagem: "Dados já sincronizados com outra unidade. ＼（〇_ｏ）／" };
        }
    }, {
        body: t.Object({
            username: t.String({ minLength: 3, maxLength: 20 }),
            email: t.String({ format: 'email' }),
            senha: t.String({ minLength: 6 })
        })
    })

    .post('/login', async ({ body, set, jwt }) => {
        const { email, senha } = body;
        const usuario = db.query("SELECT * FROM usuarios WHERE email = ?").get(email) as any;

        if (!usuario || !(await Bun.password.verify(senha, usuario.senha_hash))) {
            set.status = 401;
            return { status: "Erro", mensagem: "Acesso negado: Credenciais inválidas. (╯︵╰,)" };
        }

        const token = await jwt.sign({ id: usuario.id, username: usuario.username });
        return {
            status: "Login bem-sucedido!",
            token: token,
            usuario: { id: usuario.id, username: usuario.username }
        };
    }, {
        body: t.Object({
            email: t.String({ format: 'email' }),
            senha: t.String()
        })
    })

    // --- ROTAS PROTEGIDAS (JWT) ---
    .guard({
        async beforeHandle({ set, jwt, headers }) {
            const auth = headers['authorization'];
            const token = auth?.split(' ')[1];
            const perfil = await jwt.verify(token);

            if (!perfil) {
                set.status = 401;
                return { status: "Erro", mensagem: "Sinal de autenticação inválido. (＃＞＜)" };
            }
        }
    })
    // Injeta o perfil nas rotas subsequentes para resolver o erro do VS Code
    .derive(async ({ headers, jwt }) => {
        const auth = headers['authorization'];
        const token = auth?.split(' ')[1];
        const perfil = await jwt.verify(token) as { id: number, username: string };

        return { perfil };
    })
    .group('', (protectedApp) =>
        protectedApp
            .get('/feed', () => {
                const posts = db.query(`
                    SELECT posts.id, posts.conteudo, posts.data_postagem, posts.usuario_id, usuarios.username
                    FROM posts
                    JOIN usuarios ON posts.usuario_id = usuarios.id
                    ORDER BY posts.data_postagem DESC
                `).all() as any[];

                return posts.map(post => ({
                    ...post,
                    tempo_relativo: calcularTempoRelativo(post.data_postagem)
                }));
            })

            .post('/postar', async ({ body, perfil }) => {
                db.run(
                    "INSERT INTO posts (usuario_id, conteudo) VALUES (?, ?)",
                    [perfil.id, body.conteudo]
                );
                return { status: "Sucesso", mensagem: "Sinal transmitido! ＼(＾▽＾)／" };
            }, {
                body: t.Object({
                    conteudo: t.String({ minLength: 1, maxLength: 280 })
                })
            })

            .delete('/postar/:id', async ({ params, perfil, set }) => {
                const post = db.query("SELECT usuario_id FROM posts WHERE id = ?").get(params.id) as any;

                if (!post) {
                    set.status = 404;
                    return { status: "Erro", mensagem: "Sinal não encontrado." };
                }

                if (post.usuario_id !== perfil.id) {
                    set.status = 403;
                    return { status: "Erro", mensagem: "Você não tem autoridade. (＃＞＜)" };
                }

                db.run("DELETE FROM posts WHERE id = ?", [params.id]);
                return { status: "Sucesso", mensagem: "Sinal removido!" };
            })
    )
    .listen(3000, () => console.log('🦊 Servidor rodando em http://localhost:3000'));