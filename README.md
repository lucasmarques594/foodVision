🍲 FoodVision
FoodVision é um projeto full-stack que utiliza Inteligência Artificial para transformar imagens de ingredientes em receitas completas e detalhadas. Basta fazer o upload de três fotos, e a aplicação identificará os itens e criará uma receita única para você.
O projeto é totalmente containerizado com Docker e orquestrado com Docker Compose, seguindo as melhores práticas de arquitetura de software para garantir escalabilidade e manutenibilidade.
✨ Tecnologias Utilizadas
Este projeto integra um ecossistema de tecnologias modernas para criar uma experiência robusta e performática.
Frontend:
Next.js: Framework React para interfaces de usuário reativas e performáticas.
TypeScript: Para um código mais seguro e manutenível.
Shadcn/UI & Tailwind CSS: Para uma UI bonita, acessível e totalmente personalizável.
Backend:
Elysia.js: Framework backend de alta performance construído sobre o Bun.
Bun: Runtime JavaScript ultra-rápido.
PostgreSQL: Banco de dados relacional para persistência dos dados.
Clean Architecture & DDD: Padrões de arquitetura para um código organizado e escalável.
Inteligência Artificial:
Google Gemini (1.5 Pro): Modelo de IA multimodal para reconhecimento de imagens e geração de texto.
DevOps & Infraestrutura:
Docker & Docker Compose: Para containerização e orquestração de todos os serviços.
Nginx: Como Reverse Proxy para gerenciar e rotear o tráfego entre o frontend e o backend.
🏛️ Arquitetura e Funcionamento
O projeto é estruturado como um monorepo com serviços independentes que se comunicam através de uma rede Docker, orquestrados pelo Nginx.
Fluxo da Requisição
Quando um usuário acessa a aplicação, o Nginx atua como o "porteiro", direcionando o tráfego de forma inteligente:
code
Code
Usuário (Navegador)
|
v
Nginx (localhost:3000)
|
+-- Requisição para a página ('/') --> [ Frontend (Next.js) ]
|
+-- Requisição para a API ('/api/\*') --> [ Backend (Elysia.js) ]
Detalhes dos Serviços
nginx (O Porteiro):
É o único ponto de entrada da aplicação na porta 3000.
Serve os arquivos estáticos e a aplicação Next.js para qualquer requisição que não comece com /api/.
Redireciona todas as requisições que começam com /api/ para o serviço de backend na porta 8080, removendo o prefixo /api no processo.
frontend (A Interface):
Uma aplicação Next.js responsável por toda a experiência do usuário.
Faz chamadas de API para caminhos relativos (ex: fetch('/api/recipes')). Ele não precisa saber onde o backend está; o Nginx cuida disso.
backend (O Cérebro):
Uma API REST construída com Elysia.js.
Recebe as imagens, se comunica com a API do Google Gemini para identificar ingredientes e gerar a receita, e salva o resultado no banco de dados PostgreSQL.
db (A Memória):
Um container PostgreSQL que armazena todas as receitas geradas. Os dados são persistidos em um volume Docker para não serem perdidos.
🚀 Como Executar
Para rodar este projeto, você só precisa do Docker e de uma chave de API do Google Gemini.
Pré-requisitos
Docker e Docker Compose instalados.
Uma chave de API do Google Gemini. Obtenha a sua em Google AI Studio.
Passos para Instalação
Clonar o Repositório
code
Bash
git clone https://github.com/seu-usuario/foodvision.git
cd foodvision
Configurar Variáveis de Ambiente
Navegue até a pasta backend.
Crie uma cópia do arquivo .env.example e renomeie para .env.
code
Bash
cp backend/.env.example backend/.env
Abra o arquivo backend/.env e insira sua chave da API do Gemini na variável GEMINI_API_KEY.
Subir os Containers
Volte para a pasta raiz do projeto.
Execute o comando mágico do Docker Compose. Ele irá construir as imagens e iniciar todos os serviços.
code
Bash
docker compose up --build
O primeiro build pode levar alguns minutos. Os builds subsequentes serão muito mais rápidos.
💻 Como Usar
Após os containers estarem rodando, acesse os seguintes endereços no seu navegador:
Aplicação Principal (Frontend):
http://localhost:3000
Use a interface para fazer o upload das suas 3 imagens e gerar uma receita.
Documentação da API (Swagger):
http://localhost:8080/swagger
A documentação da API do backend está disponível através do Nginx. Use-a para explorar e testar os endpoints diretament
