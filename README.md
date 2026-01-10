# 🦊 bunx<span style="color: #ff43ad">x</span>-tech

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

```
> SINCRONIZAÇÃO ATIVA...
> SISTEMA OPERACIONAL: BUNX-TECH V0.0.1
> STATUS: PRONTO PARA TRANSMISSÃO
```

---

## ✨ Recursos

- 🔐 **Autenticação Segura** - Registro e login com hash de senha
- 📝 **Sistema de Posts** - Crie, visualize e remova posts em tempo real
- 👥 **Gerenciamento de Usuários** - Perfis únicos por username e email
- ⚡ **Performance Extrema** - Rodando com Bun para velocidade máxima
- 🎨 **UI Cyberpunk** - Interface futurista com design neon-noir
- 📱 **Responsivo** - Funciona em desktop e dispositivos móveis

---

## 🛠️ Tecnologias

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
bun run index.ts
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

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Carrega o feed principal |
| `GET` | `/login-page` | Página de login |
| `GET` | `/cadastro-page` | Página de registro |
| `GET` | `/feed` | Retorna posts em JSON |
| `POST` | `/registro` | Registra novo usuário |
| `POST` | `/login` | Autentica usuário |
| `POST` | `/postar` | Cria novo post |
| `DELETE` | `/postar/:id` | Remove um post |

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

### Criar Post
```bash
curl -X POST http://localhost:3000/postar \
  -H "Content-Type: application/json" \
  -d '{"usuario_id":1,"conteudo":"Olá, mundo! 🚀"}'
```

---

## 🎨 Design & Tema

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

Criado com ❤️ e muita cafeína ☕

```
> UNIDADE OPERACIONAL: BUNX-TECH
> PROTOCOLO: ATIVO
> SINCRONIZAÇÃO: 100%
```

---

<div align="center">

**v0.0.1** — *A rede do futuro está aqui*

[🌐 Visite](#) • [📧 Contato](#) • [🐛 Reportar Bug](#)

</div>
