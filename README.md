# Amevis Perfumaria Norddev

Este é um projeto de e-commerce de perfumaria desenvolvido com React, TypeScript, e Vite.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Começando

Para iniciar o projeto, siga estas etapas:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/amevis-perfumaria-norddev.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd amevis-perfumaria-norddev
   ```

3. Execute o seguinte comando para buildar e iniciar o container Docker:

   ```bash
   docker-compose up -d
   ```

4. Abra seu navegador e acesse [http://localhost:5174](http://localhost:5174) para ver a aplicação em execução.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.

## Ports

- `5174:5174`: Mapeia a porta 5174 do container para a porta 5174 do seu host.