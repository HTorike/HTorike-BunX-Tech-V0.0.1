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
- 👥 **Gerenciamento de Usuários** - Perfis únicos por username e email
- ⚡ **Performance Extrema** - Rodando com Bun para velocidade máxima
- 🎨 **UI Cyberpunk** - Interface futurista com design neon-noir e efeitos glassmorphism
- 📱 **Responsivo** - Funciona em desktop e dispositivos móveis
- 🔒 **Feed Protegido** - Acesso ao feed sincronizado com autenticação por headers

---

## � Correções Recentes

- ✅ **Feed Sincronizado** - Posts agora carregam corretamente com autenticação por header
- ✅ **Middleware de Autenticação** - Proteção de rotas com validação de `user-id`
- ✅ **Validação de Permissões** - Apenas proprietários podem deletar seus próprios posts

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
| `GET` | `/` | Carrega o feed principal | ✅ Requerida |
| `GET` | `/login-page` | Página de login | ❌ Pública |
| `GET` | `/cadastro-page` | Página de registro | ❌ Pública |
| `GET` | `/feed` | Retorna posts em JSON | ✅ Requerida (header `user-id`) |
| `POST` | `/registro` | Registra novo usuário | ❌ Pública |
| `POST` | `/login` | Autentica usuário | ❌ Pública |
| `POST` | `/postar` | Cria novo post | ✅ Requerida |
| `DELETE` | `/postar/:id` | Remove um post | ✅ Requerida (proprietário) |

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

### Criar Post (Autenticado)
```bash
curl -X POST http://localhost:3000/postar \
  -H "Content-Type: application/json" \
  -H "user-id: 1" \
  -d '{"usuario_id":1,"conteudo":"Olá, mundo! 🚀"}'
```

### Obter Feed (Autenticado)
```bash
curl -X GET http://localhost:3000/feed \
  -H "user-id: 1"
```

### Deletar Post (Autenticado - Apenas Proprietário)
```bash
curl -X DELETE http://localhost:3000/postar/1 \
  -H "user-id: 1"
```

---

## 🔐 Autenticação

### Headers Obrigatórios

Rotas protegidas exigem um dos headers abaixo:

```
user-id: <número_do_usuario>
OU
authorization: <token>
```

**Exemplo:**
```javascript
fetch('/feed', {
    headers: {
        'user-id': 1
    }
})
```

### Fluxo de Autenticação

1. **Registro** → Criar novo usuário
2. **Login** → Obter ID do usuário
3. **Usar ID** → Passar `user-id` em headers nas requisições protegidas

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
