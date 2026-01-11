import {Elysia, t} from 'elysia';
import {Database} from "bun:sqlite";
import { staticPlugin } from '@elysiajs/static';

const db = new Database("BunX_Tech.sqlite", {create: true});

//Tabela de usuários
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL
    )`);

//Tabela de posts
db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id TEXT NOT NULL,
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

    const diferencaDias = Math.floor(diferencaHoras / 24);
    return `${diferencaDias} dia(s) atrás`;
}

const app = new Elysia()
    app.use(staticPlugin())

    // .get('/', () => 'Bem-vindo ao Back-end do BunX Tech! 🚀')
    .get('/', () => Bun.file('./public/feed.html'))
    .get('/login-page', () => Bun.file('./public/login.html'))
    .get('/cadastro-page', () => Bun.file('./public/cadastro.html'))
    .get('/feed-view', () => Bun.file('./public/feed.html'))

// Rotas de autenticação

    .post('/registro', async ({body}) => {
        const {username, email, senha} = body;
        const hash = await Bun.password.hash(senha);
        try {
            db.run(
                "INSERT INTO usuarios (username, email, senha_hash) VALUES (?, ?, ?)",
                [username, email, hash]
            );
            return {status: "Sucesso!", mensagem: "Usuário registrado com sucesso. （￣︶￣）↗　"};
        } catch (e) {
            return {status: "Erro", mensagem: "Parece que já existe um usuário com esses dados. ＼（〇_ｏ）／"};
        }
    }, {
        body: t.Object({
            username: t.String({minLength: 3, maxLength: 20, error: "Username deve ter entre 3 e 20 caracteres."}),
            email: t.String({format: 'email', error: "Email inválido!"}),
            senha: t.String({minLength: 6, error: "Senha deve ter no mínimo 6 caracteres."})
        })
    })

    .post('/login', async ({body, set}) => {
        const {email, senha} = body;
        const usuario = db.query("SELECT * FROM usuarios WHERE email = ?").get(email) as any;

        if (!usuario) {
            set.status = 401;
            return {status: "Erro", mensagem: "Email ou senha inválidos. (╯︵╰,)"};
        }

        const senhaValida = await Bun.password.verify(senha, usuario.senha_hash);

        if (!senhaValida) {
            set.status = 401;
            return {status: "Erro", mensagem: "Email ou senha inválidos. (╯︵╰,)"};
        }
    
        return {
            status: "Login bem-sucedido!",
            mensagem: `Bem-vindo de volta, ${usuario.username}! ヽ(＾Д＾)ﾉ`,
            usuario: {id: usuario.id, username: usuario.username}
        };
    }, {
        body: t.Object({
            email: t.String({format: 'email', error: "Email inválido!"}),
            senha: t.String()
        })
    })
    
// Rotas de posts

    app.guard({
        beforeHandle({set, headers}) {
            if (!headers['authorization'] && !headers['user-id']) {
                set.status = 401;
                return {
                    status: "Erro",
                    mensagem: "Acesso não autorizado. Protocolo de segurança ativo. (＃＞＜)"
                };
            }
        }
    }, (protectedApp) =>
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

    .post('/postar', ({body, set}) => {
        const {usuario_id, conteudo} = body;
        const usuarioExiste = db.query("SELECT id FROM usuarios WHERE id = ?").get(usuario_id);

        if (!usuarioExiste) {
            set.status = 400;
            return { status: "Erro", mensagem: "Usuário não encontrado. Você precisa estar logado. (・・；)" };
        }

        db.run(
            "INSERT INTO posts (usuario_id, conteudo) VALUES (?, ?)",
            [usuario_id, conteudo]
        );

        return {status: "Sucesso",mensagem: "Post criado com sucesso! ＼(＾▽＾)／"};

        }, {
            body: t.Object({
                usuario_id: t.Number(),
                conteudo: t.String({
                    minLength: 1,
                    maxLength: 280,
                    error: "Conteúdo do post deve ter entre 1 e 280 caracteres."
                })
            })
        })

    .delete('/postar/:id', ({params}) => {
        const { id } = params;
        const postExiste = db.query("SELECT * FROM posts WHERE id = ?").get(id);
        if (!postExiste) {
            return { status: "Erro", mensagem: "Post não encontrado." };
        }

        db.run("DELETE FROM posts WHERE id = ?", [id]);
        return {
            status: "Sucesso",
            mensagem: `O post #${id} foi removido com sucesso.👍`
        };
    })
    )

    .listen(3000, () => console.log('🦊 Servidor rodando em http://localhost:3000'));
    