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
Exemplo de configuração no arquivo `.env`:
```
DB_USER="seu_usuario"
DB_PASSWORD="sua_senha"  
DB_DB="nome_do_banco"
DB_PORT="5432"
DB_HOST="localhost"
SV_PORT="3333"
```

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
    ├── database/        # Migrations e seeders
    │   ├── migrations/  # Scripts de migração do banco
    │   └── seeders/     # Dados iniciais para desenvolvimento
    ├── routes/          # Definição das rotas da API
    ├── app.js           # Configuração do Express e middlewares
    └── server.js        # Ponto de entrada da aplicação
```

## Estrutura da API

| Categoria       | Rota                                         | Método | Descrição                                        |
|-----------------|----------------------------------------------|--------|--------------------------------------------------|
| **Transactions**|                                              |        |                                                  |
|                 | `/transactions`                              | POST   | Cria uma nova transação                          |
|                 | `/transactions/:transactionId`               | GET    | Busca transação por ID                           |
|                 | `/transactions`                              | GET    | Lista todas as transações                        |
|                 | `/transactions/:transactionId`               | PUT    | Atualiza uma transação específica                |
|                 | `/transactions/:transactionId`               | DELETE | Exclui uma transação específica                  |
| **Users**       |                                              |        |                                                  |
|                 | `/users`                                     | POST   | Cria um novo usuário                             |
|                 | `/users/id/:userId`                          | GET    | Busca usuário por ID                             |
|                 | `/users/cpf/:userCpf`                        | GET    | Busca usuário por CPF                            |
|                 | `/users`                                     | GET    | Lista todos os usuários                          |
|                 | `/users/:userId`                             | PUT    | Atualiza dados de um usuário                     |
|                 | `/users/:userId`                             | DELETE | Exclui um usuário específico                     |
|                 | `/users/:userId/accounts`                    | POST   | Cria uma conta associada a um usuário            |
|                 | `/users/:userId/balances`                    | GET    | Busca saldos de contas do usuário                |
|                 | `/users/:userId/balance/total`               | GET    | Retorna saldo total do usuário                   |
|                 | `/users/:userId/balance`                     | GET    | Filtra saldo por instituição (query: institution)|
|                 | `/users/:userId/transactions`                | GET    | Lista transações do usuário                      |
|                 | `/users/:userId/transaction`                 | GET    | Filtra transações por instituição (query: institution)|
|                 | `/users/:userId/transaction`                 | POST   | Executa transação utilizando open finance        |
|                 | `/users/:userId/transaction/institution`     | POST   | Executa transação filtrada por instituição (query: institution)|
| **Institutions**|                                              |        |                                                  |
|                 | `/institutions`                              | POST   | Cria uma nova instituição                        |
|                 | `/institutions/id/:institutionId`            | GET    | Busca instituição por ID                         |
|                 | `/institutions/code/:institutionCode`        | GET    | Busca instituição por código                     |
|                 | `/institutions`                              | GET    | Lista todas as instituições                      |
|                 | `/institutions/:institutionId`               | PUT    | Atualiza dados de uma instituição                |
|                 | `/institutions/:institutionId`               | DELETE | Exclui uma instituição específica                |
| **Accounts**    |                                              |        |                                                  |
|                 | `/accounts`                                  | POST   | Cria uma nova conta bancária                     |
|                 | `/accounts/id/:accountId`                    | GET    | Busca conta por ID                               |
|                 | `/accounts/user/:userId`                     | GET    | Lista contas de um usuário                       |
|                 | `/accounts`                                  | GET    | Lista todas as contas                            |
|                 | `/accounts/:accountId`                       | PUT    | Atualiza dados de uma conta                      |
|                 | `/accounts/:accountId`                       | DELETE | Exclui uma conta específica                      |

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
