# Banco Central Simulator

API REST que simula um agregador bancário no padrão Open Finance, desenvolvida com Node.js, Express e Sequelize para integração com PostgreSQL. Consolida informações financeiras de múltiplas instituições, permitindo a visualização unificada de saldos, extratos e transações dos usuários, funcionando como um "mini banco central" de dados bancários.

## Tecnologias e Dependências Principais

- **Express**: Framework web para Node.js
- **Sequelize**: ORM para interação com o banco de dados
- **PostgreSQL**: Banco de dados relacional
- **Podman/Docker**: Containers para ambiente de desenvolvimento

## Como Executar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/marcosschlick/banco-central-simulator.git
cd banco-central-simulator
```

2. Crie o arquivo .env baseado no exemplo .env.example com as configurações do banco de dados.

3. **Rodar PostgreSQL em container**

### Para Podman:
```bash
podman-compose up -d
```

### Para Docker:
```bash
docker-compose up -d
```

4. Instale as dependências:
```bash
npm install
```

5. Execute as migrações do banco de dados:
```bash
npm run migrate
```

6. Popule o banco com dados iniciais:
```bash
npm run seed
```

7. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

8. Teste os endpoints usando os arquivos em `routes-http/` ou com ferramentas como Postman/Insomnia.

## Estrutura de Diretórios

```
├── compose.yml          # Configuração do container PostgreSQL
├── routes-http/         # Coleção de requisições HTTP para teste
└── src/
    ├── app/             # Lógica principal da aplicação
    │   ├── controllers/ # Controladores dos endpoints
    │   ├── models/      # Modelos de dados do Sequelize
    │   ├── repositories/# Camada de acesso ao banco de dados
    │   └── services/    # Lógica de negócio e regras
    ├── config/          # Configurações do projeto
    │   └── database.cjs # Configuração da conexão com o banco
    ├── database/        # Migrações e seeders
    │   ├── migrations/  # Scripts de migração do banco
    │   └── seeders/     # Dados iniciais para desenvolvimento
    ├── routes/          # Definição das rotas da API
    ├── app.js           # Configuração do Express e middlewares
    └── server.js        # Ponto de entrada da aplicação
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
