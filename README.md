# Portal de Solicitações Internas

## Aplicação web para registro, acompanhamento e gerenciamento de solicitações internas, desenvolvida como parte de uma avaliação para Desenvolvedor Júnior.

## 1. Funcionalidades

- Login com usuário e senha
- Cadastro de usuários
- Autenticação JWT, controle de sessão e logout
- Cadastro de solicitações
- Edição e exclusão de solicitações abertas
- Alteração de status
- Consulta de detalhes
- Listagem de solicitações
- Paginação da listagem
- Filtros por período, categoria, status e título
- Ordenação por data
- Dashboard com total de solicitações e indicadores por status

## 2. Tecnologias

**Frontend:** Angular, TypeScript, HTML, CSS, RxJS, Angular HttpClient e jwt-decode.

**Backend:** Python, Django e Django REST Framework.

**Banco de dados:** PostgreSQL 17.

**Infraestrutura e ferramentas:** Docker, Docker Compose, Git e GitHub.

## 3. Arquitetura

```text
Frontend Angular
       |
       | HTTP / JSON
       v
Backend Django + Django REST Framework
       |
       v
PostgreSQL
```

O frontend é responsável pela interface e interação com o usuário. O backend concentra autenticação, validações, regras de negócio e disponibilização da API REST. O PostgreSQL realiza a persistência dos dados.

O PostgreSQL e o backend são executados em containers Docker. O frontend Angular é executado separadamente em ambiente de desenvolvimento.

## 4. Frontend

A aplicação é organizada principalmente em:

- `pages/` — páginas da aplicação;
- `components/` — componentes da interface;
- `services/` — comunicação com a API e serviços;
- `models/` — interfaces TypeScript;
- `constants/` — constantes e funções auxiliares.

Entre as principais páginas estão:

- Login
- Cadastro
- Dashboard
- Solicitações
- Nova Solicitação

O frontend utiliza um interceptor HTTP para adicionar o token JWT às requisições autenticadas.

## 5. Backend

O backend utiliza Django e Django REST Framework.

As solicitações são disponibilizadas por meio de um `ModelViewSet` e serializers. Operações com regras específicas, como alteração de status, possuem tratamento próprio no backend.

A autenticação utiliza JWT por meio do Django REST Framework Simple JWT.

## 6. Regras principais

Ao criar uma solicitação, o backend define automaticamente:

- o usuário solicitante;
- o status inicial `ABERTO`;
- a data de criação.

### Categorias

- `TI`
- `RH`
- `COMPRAS`
- `FINANCEIRO`
- `INFRAESTRUTURA`

### Status

- `ABERTO`
- `EM_ATENDIMENTO`
- `CONCLUIDO`

Solicitações somente podem ser editadas ou excluídas enquanto estiverem com status `ABERTO`.

Solicitações com status `CONCLUIDO` não podem ter o status alterado.

Essas regras são verificadas no backend.

## 7. Autenticação

A aplicação utiliza autenticação baseada em JWT.

Após o login, a API retorna um access token e um refresh token. O frontend armazena os tokens e utiliza um interceptor HTTP para adicionar o access token às requisições autenticadas.

O `AuthService` acompanha a expiração do access token, apresenta um aviso aproximadamente dois minutos antes da expiração e encerra a sessão quando o token expira.

As rotas protegidas do backend utilizam a permissão `IsAuthenticated`.

O access token possui duração de 15 minutos e o refresh token possui duração de 1 dia.

## 8. API e comunicação

A comunicação entre frontend e backend ocorre por HTTP utilizando JSON.

A API disponibiliza operações para:

- autenticação;
- cadastro de usuários;
- criação de solicitações;
- listagem de solicitações;
- atualização de solicitações;
- exclusão de solicitações;
- consulta de detalhes;
- alteração de status.

### Filtros e ordenação

A listagem de solicitações aceita os seguintes parâmetros:

- categoria;
- status;
- título;
- data inicial;
- data final;
- ordenação.

Os filtros podem ser combinados.

### Paginação

A listagem utiliza paginação baseada em página, com até 10 solicitações por página.

O backend também disponibiliza o parâmetro `page_size`, respeitando o limite máximo definido pela aplicação.

## 9. Banco de dados

O PostgreSQL 17 é executado em um container Docker.

A estrutura do banco de dados é gerenciada pelas migrations do Django:

```bash
python manage.py makemigrations
python manage.py migrate
```

Isso permite criar e atualizar o schema de forma reproduzível, sem depender de scripts SQL manuais.

A conexão do backend com o PostgreSQL é configurada por meio de variáveis de ambiente.

## 10. Como executar

### 10.1 Pré-requisitos

- Docker
- Docker Compose
- Node.js
- npm
- Angular CLI

### 10.2 Configuração das variáveis de ambiente

Na raiz do projeto deve existir um arquivo `.env` contendo as variáveis necessárias para o backend e o banco de dados.

Exemplo:

```env
POSTGRES_DB=portal_solicitacoes
POSTGRES_USER=portal_user
POSTGRES_PASSWORD=portal_password
DB_HOST=postgres
DB_PORT=5432
SECRET_KEY=sua-chave-secreta
```

O arquivo `.env` não deve ser versionado no Git.

### 10.3 Iniciar backend e banco

Na raiz do projeto:

```bash
docker compose up -d --build
```

Verifique os containers:

```bash
docker compose ps
```

### 10.4 Iniciar o frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
ng serve
```

### 10.5 Acessos

Frontend:

```text
http://localhost:4200
```

Backend:

```text
http://localhost:8000
```

## 11. Logs

Para visualizar os logs dos serviços:

```bash
docker compose logs
```

Para acompanhar os logs em tempo real:

```bash
docker compose logs -f
```

Para visualizar apenas os logs do backend:

```bash
docker compose logs -f backend
```

## 12. Migrations

Quando houver alteração nos modelos Django, crie e aplique as migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Quando o backend estiver sendo executado dentro do Docker, os comandos devem ser executados no container do backend.

Exemplo:

```bash
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

## 13. Documentação

O projeto possui um Memorial Técnico de Desenvolvimento com as tecnologias utilizadas, justificativas técnicas, decisões arquiteturais, modelagem de dados, autenticação, comunicação entre frontend e backend, organização do código e análise crítica.

Também possui um Dicionário de Dados com a descrição das principais entidades, campos, relacionamentos e regras relacionadas aos dados persistidos.

## 14. Possíveis melhorias

Como evolução futura, podem ser adicionados:

- testes automatizados;
- renovação automática do access token utilizando o refresh token;
- configurações específicas para ambiente de produção;
- melhorias de observabilidade e monitoramento;
- aprimoramentos no tratamento de erros.
