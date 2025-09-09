<h1 align="center">🍲 FoodVision</h1>

<p align="center">
  <em>Transforme fotos de ingredientes em receitas únicas com Inteligência Artificial.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Elysia.js-FF6F61?style=flat&logo=javascript&logoColor=white" alt="Elysia.js"/>
  <img src="https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white" alt="Bun"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker"/>
</p>

---

## 📖 Sobre o Projeto

**FoodVision** é um projeto **full-stack** que utiliza **IA multimodal** para transformar imagens de ingredientes em **receitas completas e detalhadas**.

- 📸 Faça upload de **3 fotos** de ingredientes.
- 🤖 A IA identifica os itens e cria uma **receita única**.
- 🐳 O projeto é **containerizado com Docker** e orquestrado via **Docker Compose**, garantindo escalabilidade e facilidade de manutenção.

---

## ✨ Tecnologias Utilizadas

<details>
  <summary><strong>🌐 Frontend</strong></summary>

- ⚛️ <strong>Next.js</strong>: Framework React para interfaces modernas.
- 🟦 <strong>TypeScript</strong>: Tipagem estática para maior segurança.
- 🎨 <strong>Shadcn/UI & Tailwind CSS</strong>: UI elegante, acessível e customizável.
</details>

<details>
  <summary><strong>⚙️ Backend</strong></summary>

- 🚀 <strong>Elysia.js</strong>: Framework de alta performance sobre o Bun.
- ⚡ <strong>Bun</strong>: Runtime JavaScript ultrarrápido.
- 🛢️ <strong>PostgreSQL</strong>: Banco relacional robusto.
- 🏗️ <strong>Clean Architecture & DDD</strong>: Padrões para escalabilidade.
</details>

<details>
  <summary><strong>🧠 Inteligência Artificial</strong></summary>

- 🤖 <strong>Google Gemini (1.5 Pro)</strong>: Reconhecimento de imagens e geração de texto.
</details>

<details>
  <summary><strong>☁️ DevOps & Infraestrutura</strong></summary>

- 🐳 <strong>Docker & Docker Compose</strong>: Containerização e orquestração.
- 🌐 <strong>Nginx</strong>: Reverse Proxy para tráfego inteligente.
</details>

---

## 🏛️ Arquitetura

O projeto segue um **monorepo** com serviços independentes em containers, conectados por rede Docker e roteados pelo **Nginx**.

flowchart TD
A[Usuário (Navegador)] -->|http://localhost:3000| B[Nginx]
B -->|Página /| C[Frontend (Next.js)]
B -->|API /api/\*| D[Backend (Elysia.js)]
D -->|Persistência| E[(PostgreSQL DB)]
D -->|IA| F[Google Gemini API]

---

## 🚀 Como Executar

### ✅ Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
- Uma **chave de API do Google Gemini** ([obter aqui](https://ai.google.dev/)).

### 🔧 Passos de Instalação

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/lucasmarques594/foodvision.git
   cd foodvision
   ```

2. **Configurar Variáveis de Ambiente**

   ```bash
   cp backend/.env.example backend/.env
   ```

   Edite `backend/.env` e insira sua chave na variável:

   ```env
   GEMINI_API_KEY=suachaveaqui
   ```

3. **Subir os Containers**
   ```bash
   docker compose up --build
   ```

---

## 💻 Como Usar

- 🌍 **Aplicação Principal (Frontend):**  
  [http://localhost:3000](http://localhost:3000)

  Faça upload de 3 imagens de ingredientes e gere uma receita.

- 📑 **Documentação da API (Swagger):**  
  [http://localhost:8080/swagger](http://localhost:8080/swagger)

---

## 📌 Estrutura dos Serviços

- **nginx** 🛡️ → Reverse Proxy e ponto único de entrada (porta 3000).
- **frontend** 🎨 → Aplicação Next.js.
- **backend** 🧠 → API REST com Elysia.js + integração com IA.
- **db** 💾 → Banco PostgreSQL com persistência em volume Docker.

---

<h3 align="center">Feito com ❤️ por <a href="https://github.com/lucasmarques594">Lucas Marques</a></h3>
