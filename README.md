# App de Transporte Particular

Este repositório contém o código para o desenvolvimento de uma aplicação de transporte particular, incluindo backend e frontend.

## 🛠️ Funcionalidades

### Backend
- API REST desenvolvida em **Node.js** com **TypeScript**.
- Três endpoints principais:
  - **POST /ride/estimate**: Calcula a rota entre origem e destino, retorna motoristas disponíveis e informações da rota.
  - **PATCH /ride/confirm**: Confirma a viagem e grava no histórico.
  - **GET /ride/{customer_id}?driver_id={id do motorista}**: Lista o histórico de viagens realizadas por um cliente, com opção de filtragem por motorista.
- Integração com a API Routes do Google Maps para cálculo de rotas e distâncias.
- Banco de dados **MySQL** para salvar o histórico de viagens.

### Frontend
- **Single Page Application** desenvolvida em **React** com **TypeScript** e **Vite**.
- Telas principais:
  1. **Solicitação de Viagem**: Formulário para calcular estimativas de viagem.
  2. **Opções de Viagem**: Visualização das rotas no mapa e lista de motoristas disponíveis.
  3. **Histórico de Viagens**: Listagem das viagens realizadas com filtros.
- Mapa estático com a rota plotada, exibindo pontos A e B.

### Docker
- Aplicação completamente dockerizada.
- Arquivo `docker-compose.yml` para facilitar o deploy:
  - Backend exposto na porta **8080**.
  - Frontend exposto na porta **80**.

## 🚀 Tecnologias Utilizadas

- **Node.js**, **TypeScript**, **Express** e **Jest** para o backend.
- **React**, **TypeScript** e **Vite** para o frontend.
- **MySQL** no banco de dados.
- **Docker** para containerização.
- **Google Maps API** para integração de rotas.
- **Git** para versionamento de código.

## 🔧 Requisitos

- **Node.js** e **npm** ou **yarn** instalados.
- **Docker** e **Docker Compose** configurados.
- Chave de API do Google Maps (configurada no `.env`).

## ⚙️ Instalação e Execução

1. Clone este repositório.

2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do repositório e adicione:
   ```env
   GOOGLE_API_KEY=your_google_api_key
   ```

3. Suba os containers usando Docker Compose:
   ```bash
   docker-compose up
   ```

4. Acesse a aplicação:
   - Frontend: [http://localhost:80](http://localhost:80)
   - Backend: [http://localhost:8080](http://localhost:8080)

## 🧪 Testes
A aplicação possui testes unitários com 100% de cobertura:
![image](https://github.com/user-attachments/assets/c13df6bb-2d9e-42bb-bc12-9b717ffa1003)

- Testes unitários podem ser executados com:
  ```bash
  npm test
  ```
- A cobertura dos testes pode ser verificada com:
  ```bash
  npm run test-coverage
  ```
