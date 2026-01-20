# 🦊 bun<span style="color: #ff43ad">x</span>-tech

> Uma rede social descentralizada de próxima geração. Conecte-se. Transmita. Sincronize.

<div align="center">

![Status](https://img.shields.io/badge/status-ativo-00ff00?style=flat-square&logo=github)
![Versão](https://img.shields.io/badge/versão-0.0.1-ff43ad?style=flat-square)
![Runtime](https://img.shields.io/badge/runtime-Bun-222222?style=flat-square&logo=bun)
![Linguagem](https://img.shields.io/badge/linguagem-TypeScript-3178C6?style=flat-square&logo=typescript)

</div>

---

## 🔮 Sobre o Projeto

**bunx-tech** é uma plataforma de rede social futurista construída com [Bun](https://bun.com), combinando tecnologia de ponta com design cyberpunk. Um sistema de posts em tempo real com autenticação segura, gerenciamento de usuários e interface neon-noir.

> **ℹ️ Informação Importante:** Este projeto é um **site em desenvolvimento** e **não está disponível para download**. Atualmente é destinado apenas a **testes pessoais**. A plataforma não está pronta para uso público.

```
> SINCRONIZAÇÃO ATIVA...
> SISTEMA OPERACIONAL: BUNX-TECH V0.0.1
> STATUS: PRONTO PARA TRANSMISSÃO
```

---

## ✨ Recursos

- 🔐 **Autenticação Segura** - Registro e login com hash de senha e middleware de proteção
- 📝 **Sistema de Posts** - Crie, visualize e remova posts em tempo real com validação
- �️ **Postagem de Imagens** - Compartilhe imagens diretamente nos posts com suporte a múltiplos formatos
- �👥 **Gerenciamento de Usuários** - Perfis únicos por username e email
- ⚡ **Performance Extrema** - Rodando com Bun para velocidade máxima
- 🎨 **UI Cyberpunk** - Interface futurista com design neon-noir e efeitos glassmorphism
- 📱 **Responsivo** - Funciona em desktop e dispositivos móveis
- 🔒 **Feed Protegido** - Acesso ao feed sincronizado com autenticação por headers

---

## 🔄 Correções Recentes

- ✅ **Autenticação JWT** - Implementação de tokens JWT com expiração de 7 dias
- ✅ **Middleware de Proteção** - Rotas protegidas com verificação de token via `@elysiajs/jwt`
- ✅ **Derivação de Contexto** - Acesso ao `perfil` decodificado em todas as rotas protegidas
- ✅ **Validação de Permissões** - Apenas proprietários podem deletar seus próprios posts
- ✅ **Suporte a Imagens em Posts** - Compartilhe imagens diretamente nos posts
---

```
├── Bun v1.3.5+        → Runtime JavaScript ultrarrápido
├── Elysia             → Framework web minimalista
├── SQLite             → Banco de dados leve e eficiente
├── TypeScript         → Tipagem estática
├── Tailwind CSS       → Estilização utilitária
└── HTML5/JS Vanilla   → Frontend puro
```

---

## 📋 Pré-requisitos

- **Bun v1.3.5+** - [Instale aqui](https://bun.sh)
- Windows, macOS ou Linux

---

## 🚀 Como Iniciar

### 1. **Instalar Dependências**
```bash
bun install
```

### 2. **Executar o Servidor**
```bash
bun --watch index.ts
```

### 3. **Acessar a Plataforma**
```
🦊 Servidor rodando em http://localhost:3000
```

Abra seu navegador e comece a transmitir! 📡

---

## 📁 Estrutura do Projeto

```
bunx-tech/
├── index.ts           → Backend (Elysia + SQLite)
├── public/
│   ├── login.html     → Página de autenticação
│   ├── cadastro.html  → Página de registro
│   └── feed.html      → Feed principal
├── package.json       → Dependências do projeto
├── tsconfig.json      → Configuração TypeScript
└── BunX_Tech.sqlite   → Banco de dados (criado automaticamente)
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `GET` | `/` | Carrega o feed principal | ✅ JWT Requerido |
| `GET` | `/login-page` | Página de login | ❌ Pública |
| `GET` | `/cadastro-page` | Página de registro | ❌ Pública |
| `GET` | `/feed` | Retorna posts em JSON | ✅ JWT Requerido |
| `POST` | `/registro` | Registra novo usuário | ❌ Pública |
| `POST` | `/login` | Autentica e retorna JWT | ❌ Pública |
| `POST` | `/postar` | Cria novo post | ✅ JWT Requerido |
| `DELETE` | `/postar/:id` | Remove um post | ✅ JWT Requerido (proprietário) |

---

## 💾 Banco de Dados

O projeto usa **SQLite** com duas tabelas principais:

### `usuarios`
```sql
id (PRIMARY KEY)
username (UNIQUE)
email (UNIQUE)
senha_hash
```

### `posts`
```sql
id (PRIMARY KEY)
usuario_id (FOREIGN KEY)
conteudo
data_postagem
```

---

## 🎮 Uso

### Registrar Novo Usuário
```bash
curl -X POST http://localhost:3000/registro \
  -H "Content-Type: application/json" \
  -d '{"username":"neon_user","email":"user@example.com","senha":"senha123"}'
```

### Fazer Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","senha":"senha123"}'
```

### Criar Post (Autenticado com JWT)
```bash
curl -X POST http://localhost:3000/postar \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_JWT_TOKEN" \
  -d '{"conteudo":"Olá, mundo! 🚀"}'
```

### Obter Feed (Autenticado com JWT)
```bash
curl -X GET http://localhost:3000/feed \
  -H "Authorization: Bearer SEU_JWT_TOKEN"
```

### Deletar Post (Autenticado - Apenas Proprietário)
```bash
curl -X DELETE http://localhost:3000/postar/1 \
  -H "Authorization: Bearer SEU_JWT_TOKEN"
```

---

## 🔐 Autenticação JWT

O projeto utiliza **JWT (JSON Web Tokens)** para autenticação segura de rotas protegidas.

### Configuração JWT

- **Algoritmo:** HS256
- **Expiração:** 7 dias
- **Secret:** Configurável via variáveis de ambiente

### Headers Obrigatórios

Rotas protegidas exigem o header de autorização:

```
Authorization: Bearer <JWT_TOKEN>
```

**Exemplo JavaScript:**
```javascript
fetch('/feed', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
```

### Fluxo de Autenticação

1. **Registro** (`POST /registro`) → Criar novo usuário
2. **Login** (`POST /login`) → Receber JWT token e dados do usuário
3. **Armazenar** → Guardar token no localStorage (ou sessão)
4. **Usar Token** → Passar `Authorization: Bearer <token>` em headers das rotas protegidas
5. **Rotas Protegidas** → O servidor verifica e decodifica o token

### Resposta do Login

```json
{
  "status": "Login bem-sucedido!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "username": "seu_usuario"
  }
}
```

### Decodificação do Token

O token JWT contém as informações do usuário:

```json
{
  "id": 1,
  "username": "seu_usuario",
  "iat": 1704067200,
  "exp": 1704672000
}
```

### Postagem com Imagem (Autenticado)

```javascript
fetch('/postar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
        conteudo: 'Confira essa imagem! https://example.com/foto.jpg'
    })
})
```

### Tratamento de Erros

- **401 Unauthorized** → Token inválido, expirado ou ausente
- **403 Forbidden** → Token válido mas usuário sem permissão (ex: deletar post de outro usuário)

**Exemplo de resposta de erro:**
```json
{
  "status": "Erro",
  "mensagem": "Sinal de autenticação inválido. (＃＞＜)"
}
```

---

## 🖼️ Postagem de Imagens

A plataforma agora suporta a postagem de imagens! Simplesmente inclua a URL da imagem no conteúdo do post.

### Formatos Suportados
- PNG (`.png`)
- JPEG (`.jpg`, `.jpeg`)
- GIF (`.gif`)
- SVG (`.svg`)
- WebP (`.webp`)

### Como Usar

1. **Escrever o post** com texto e URL da imagem:
   ```
   Olá! Confira essa imagem legal:
   https://example.com/imagem.jpg
   ```

2. **Sistema detecta automaticamente** a URL da imagem
3. **Imagem aparece renderizada** abaixo do texto no feed

### Características Visuais
- Imagem com bordas arredondadas e borda neon
- Efeito de zoom ao passar o mouse
- Tratamento automático de erros se a URL não carregar
- Texto e imagem separados visualmente

---

O projeto segue uma paleta de cores cyberpunk:

```
🟣 Roxo Escuro:  #8b5cf6
🔴 Rosa Neon:    #ff43ad
⚫ Preto:         #000000
⚪ Branco:        #ffffff
```

Interface com efeitos glassmorphism, bordas neon e animações suaves.

---

## 📦 Scripts Disponíveis

```bash
# Desenvolver
bun run index.ts

# Instalar dependências
bun install

# Visualizar estrutura SQLite
# (O banco é criado automaticamente em BunX_Tech.sqlite)
```

---

## 🐛 Debug & Teste

Use o arquivo `testes.http` para testar os endpoints:

```http
### Listar Feed
GET http://localhost:3000/feed

### Registrar
POST http://localhost:3000/registro
Content-Type: application/json

{
  "username": "seu_usuario",
  "email": "seu@email.com",
  "senha": "sua_senha"
}
```

---

## 📝 Licença

Este projeto é open source. Sinta-se livre para usar, modificar e compartilhar!

---

## 👨‍💻 Desenvolvedor

Criado com ❤️ e muita cafeína ☕ por **HTorike**

```
> UNIDADE OPERACIONAL: BUNX-TECH
> PROTOCOLO: ATIVO
> SINCRONIZAÇÃO: 100%
```

---

<div align="center">

**v0.0.1** — *A rede do futuro está aqui*

[🌐 Visite](#) • [📧 Contato](mailto:hacchimantorike@gmail.com) • [🐛 Reportar Bug](mailto:hacchimantorike@gmail.com)

</div>
