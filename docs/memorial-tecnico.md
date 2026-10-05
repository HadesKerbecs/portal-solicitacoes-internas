# Memorial Técnico de Desenvolvimento

## Portal de Solicitações Internas

### 1. Introdução

Este documento apresenta o Memorial Técnico de Desenvolvimento do Portal de Solicitações Internas, desenvolvido como parte da avaliação para Desenvolvedor Júnior.

O projeto tem como objetivo disponibilizar uma aplicação web para registro, acompanhamento e gerenciamento de solicitações internas. A solução contempla autenticação de usuários, cadastro de solicitações, controle de status, edição e exclusão conforme as regras de negócio, filtros, consulta de detalhes e um dashboard com indicadores.

A aplicação foi desenvolvida com frontend e backend separados, utilizando uma API REST para comunicação entre as partes e PostgreSQL para persistência dos dados.

### 2. Objetivo do Projeto

O Portal de Solicitações Internas tem como objetivo centralizar o registro e o acompanhamento de demandas internas.

O usuário autenticado pode criar solicitações informando título, descrição e categoria. A solicitação recebe automaticamente o usuário solicitante, a data de criação e o status inicial `Aberto`.

Também foram implementadas as operações de edição e exclusão de solicitações abertas, alteração de status, consulta de detalhes, filtros por período, categoria, status e título, além de um dashboard com a quantidade total de solicitações e a quantidade por status.

### 3. Tecnologias, Frameworks e Ferramentas

O projeto foi estruturado utilizando uma arquitetura web composta por frontend, backend e banco de dados relacional. Para o frontend foi escolhido Angular com TypeScript, enquanto o backend utiliza Python com Django e Django REST Framework. A persistência dos dados é realizada em PostgreSQL e o ambiente do banco é estruturado utilizando Docker e Docker Compose.

#### 3.1 Angular
Angular foi utilizado no desenvolvimento do frontend. A aplicação utiliza componentes, páginas, serviços, rotas, signals, HttpClient e interceptors.

#### 3.2 TypeScript
TypeScript é utilizado como linguagem principal do frontend. A tipagem das entidades, como `Solicitacao`, ajuda a identificar inconsistências durante o desenvolvimento e deixa mais claro o formato dos dados recebidos da API.

#### 3.3 HTML e CSS
HTML é utilizado na construção das interfaces e CSS na estilização dos componentes. Os estilos foram separados por componente, facilitando alterações específicas em cada tela.

#### 3.4 Python
Python foi utilizado como linguagem do backend, principalmente pela integração com Django e pela facilidade de implementar uma API com regras de negócio e persistência de dados.

#### 3.5 Django
Django foi utilizado como framework principal do backend. O framework fornece recursos de ORM, autenticação, migrations e organização da aplicação.

#### 3.6 Django REST Framework
Django REST Framework foi utilizado para disponibilizar a API REST, utilizando serializers, ViewSets e respostas HTTP padronizadas.

#### 3.7 PostgreSQL
PostgreSQL é o banco de dados relacional utilizado pelo projeto. O banco é executado em container Docker e sua estrutura é gerenciada pelas migrations do Django.

#### 3.8 JWT
A autenticação da API utiliza JSON Web Token (JWT). Após o login, o backend retorna um access token e um refresh token.

#### 3.9 jwt-decode
A biblioteca `jwt-decode` é utilizada no frontend para ler a informação de expiração (`exp`) presente no access token. O `AuthService` utiliza essa informação para controlar o tempo restante da sessão.

#### 3.10 Docker e Docker Compose
Docker é utilizado para padronizar a execução do ambiente da aplicação. O backend Django é executado em um container baseado em Python 3.13, enquanto o PostgreSQL 17 é executado em um container separado.

O Docker Compose é utilizado para orquestrar os containers do backend e do banco de dados, além de configurar a comunicação entre os serviços, variáveis de ambiente, portas e volume persistente do PostgreSQL.

#### 3.11 Git e GitHub
Git foi utilizado para controle de versão do código e GitHub para armazenamento do repositório.

#### 3.12 RxJS e HttpClient
O frontend utiliza `HttpClient` para realizar chamadas HTTP e RxJS para trabalhar com os `Observable` retornados pelas requisições.

### 4. Arquitetura da Aplicação

#### 4.1 Visão geral

A aplicação foi organizada em três partes principais:

- Frontend Angular;
- Backend Django + Django REST Framework;
- Banco de dados PostgreSQL.

O frontend é responsável pela interface e interação com o usuário. O backend concentra autenticação, validações, regras de negócio e exposição da API. O PostgreSQL é responsável pela persistência.

A comunicação entre frontend e backend ocorre por HTTP, utilizando JSON.

#### 4.2 Frontend

O frontend foi organizado em páginas, componentes, serviços, modelos, constantes, guards e interceptors.

Entre as principais funcionalidades estão Login, Cadastro, Dashboard, Listagem de Solicitações, Nova Solicitação, Edição, Exclusão, Alteração de Status, Consulta de Detalhes, Filtros, Sidebar, Logout e Toast.

A tela de Nova Solicitação utiliza um componente de formulário especializado. Após a criação bem-sucedida, o componente emite o evento `solicitacaoCriada` e a página realiza o redirecionamento para a listagem.

O Dashboard consulta a API e apresenta os indicadores de total, abertas, em atendimento e concluídas, além das cinco solicitações mais recentes retornadas pela API.

#### 4.3 Backend

O backend utiliza Django e Django REST Framework. A entidade principal do domínio é `Solicitacao`. O acesso é disponibilizado por meio de um `ModelViewSet`, que concentra as operações convencionais de listagem, criação, atualização e exclusão.

Também existe uma ação específica para alteração de status, pois essa operação possui regras próprias.

#### 4.4 Banco de dados

O PostgreSQL é utilizado como banco de dados relacional. O Django ORM realiza o mapeamento entre os modelos Python e as tabelas do banco. A relação entre usuário e solicitação é representada por uma chave estrangeira.

O PostgreSQL é executado no container `postgres:17-alpine`, com persistência dos dados por meio de um volume Docker.

#### 4.5 Comunicação entre camadas

O frontend realiza chamadas HTTP para os endpoints da API. O acesso é centralizado em serviços Angular. O interceptor adiciona o token JWT nas requisições protegidas, enquanto login, cadastro e refresh são tratados como endpoints públicos.

### 5. Modelagem de Dados

#### 5.1 Entidade Solicitação

A entidade `Solicitacao` possui `id`, `titulo`, `descricao`, `categoria`, `status`, `solicitante`, `created_at` e `updated_at`.

O campo `solicitante` possui uma relação `ForeignKey` com o usuário nativo do Django.

#### 5.2 Categorias

As categorias disponíveis são TI, RH, Compras, Financeiro e Infraestrutura. Os valores técnicos utilizados pela API são separados dos rótulos apresentados pela interface.

#### 5.3 Status

Os status disponíveis são Aberto, Em Atendimento e Concluído. Uma nova solicitação recebe automaticamente o status `Aberto`.

#### 5.4 Regras de negócio

- somente usuários autenticados podem acessar as solicitações;
- o solicitante é definido automaticamente pelo usuário autenticado;
- o status inicial é `Aberto`;
- solicitações abertas podem ser editadas;
- somente solicitações abertas podem ser excluídas;
- solicitações concluídas não podem ter o status alterado;
- o novo status precisa pertencer aos valores permitidos;
- os campos controlados pelo backend são somente leitura no serializer.

### 6. Autenticação e Controle de Sessão

A aplicação utiliza autenticação baseada em JWT. No login, o backend retorna `access` e `refresh`, armazenados pelo frontend no `localStorage`.

O `AuthInterceptor` envia automaticamente o access token nas requisições autenticadas.

O `AuthService` decodifica a expiração do access token. Quando faltam dois minutos para a expiração, o sistema apresenta uma mensagem ao usuário. Ao atingir a expiração, a sessão é encerrada e o usuário é redirecionado para o login.

O backend utiliza `IsAuthenticated` nos recursos protegidos. Cadastro e login permanecem públicos.

### 7. Organização do Código

No backend, as responsabilidades principais ficam separadas entre models, serializers, views, migrations e configurações do projeto Django.

No frontend, a organização utiliza páginas, componentes, serviços, modelos e constantes. O `SolicitacoesService` centraliza as operações de solicitações; o `AuthService` centraliza autenticação; o `ToastService` centraliza mensagens; o modelo `Solicitacao` evita duplicação de tipos; categorias e status são mantidos em constantes; e o `authGuard` protege as rotas que exigem autenticação.

Os componentes utilizam `@Input` e `@Output` para comunicação, mantendo responsabilidades específicas.

### 8. API e Comunicação Frontend/Backend

A API foi desenvolvida utilizando Django REST Framework. O `SolicitacaoSerializer` utiliza `ModelSerializer` e representa o solicitante com `id` e `username`.

Os campos `id`, `status`, `solicitante`, `created_at` e `updated_at` são somente leitura.

#### 8.1 Endpoints principais

A API possui endpoints para autenticação, cadastro de usuários e gerenciamento de solicitações.

Os endpoints de autenticação são:

- `POST /api/auth/login/` — obtenção dos tokens JWT;
- `POST /api/auth/refresh/` — renovação do access token;
- `POST /api/auth/cadastro/` — criação de usuário.

O gerenciamento de solicitações é disponibilizado pelo `SolicitacaoViewSet`, utilizando as rotas geradas pelo `DefaultRouter`.

#### 8.2 Listagem, paginação e filtros

A listagem de solicitações utiliza paginação com limite de 10 registros por página.

A API aceita parâmetros para categoria, status, título, data inicial, data final e ordenação. Os filtros podem ser combinados.

A ordenação pode utilizar o parâmetro `ordenacao`, sendo possível consultar os registros em ordem recente ou antiga.

#### 8.3 Alteração de status

A alteração de status possui uma ação específica no `SolicitacaoViewSet`. O backend verifica se a solicitação já está concluída e valida se o novo status pertence aos valores permitidos.

#### 8.4 Dashboard

O dashboard utiliza a API de solicitações para obter as quantidades total, abertas, em atendimento e concluídas. Também utiliza a listagem ordenada por registros recentes para apresentar as cinco solicitações mais recentes.

### 9. Interface e Experiência do Usuário

A interface foi construída com componentes independentes e estilos específicos por componente.

A tela de solicitações apresenta código, título, descrição, categoria, solicitante, data de abertura e status. As ações disponíveis variam conforme o status.

Foi implementado um modal de detalhes e um componente Toast reutilizável para mensagens de sucesso, erro e informação.

A interface possui navegação lateral com acesso ao Dashboard, Solicitações, Nova Solicitação e logout.

A tela de Nova Solicitação possui formulário para título, categoria e descrição, com validações antes do envio à API.

### 10. Validações e Tratamento de Erros

As validações foram distribuídas entre frontend e backend. No cadastro são verificados os campos obrigatórios e a confirmação da senha. Na criação de solicitações são validados título, descrição e categoria.

No backend, as regras de negócio são verificadas novamente antes das operações. Os erros HTTP são tratados no frontend e apresentados por meio do Toast quando aplicável.

Respostas HTTP 401 durante a autenticação são tratadas para orientar o usuário a realizar o login novamente.

### 11. Banco de Dados e Migrations

O PostgreSQL 17 é executado em container Docker. A estrutura do banco é gerenciada pelas migrations do Django, podendo ser reproduzida com:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 12. Decisões Técnicas e Justificativas

A separação entre frontend e backend mantém responsabilidades independentes. O Angular fica responsável pela interface, enquanto o Django concentra regras de negócio, autenticação e persistência.

O uso de serviços no Angular evita que cada componente faça chamadas HTTP diretamente.

O `ModelViewSet` foi utilizado para as operações convencionais de `Solicitacao`, enquanto a alteração de status possui uma ação específica por ter regras próprias.

Categorias e status são valores controlados do domínio e não exigem tabelas auxiliares.

O `select_related('solicitante')` é utilizado para carregar o usuário relacionado junto com a solicitação.

`@Input` e `@Output` foram utilizados para comunicação entre componentes sem introduzir gerenciamento global de estado.

O `authGuard` separa a proteção de rotas da interface, enquanto o `AuthInterceptor` centraliza o envio do token JWT.

O Toast foi separado em serviço e componente, evitando duplicação da lógica de apresentação de mensagens.

### 13. Análise Crítica

#### 13.1 Limitações

O refresh token é armazenado, porém não existe atualmente uma rotina de renovação automática do access token antes da expiração. Quando o access token expira, a sessão é encerrada e o usuário precisa realizar o login novamente.

O controle de permissões ainda é baseado na autenticação do usuário. Não foram implementados perfis ou níveis de acesso diferentes.

O dashboard utiliza consultas da listagem para obter seus indicadores. Em uma aplicação com volume maior de dados, seria possível criar um endpoint específico para métricas e agregações no backend.

#### 13.2 Melhorias futuras

- renovação automática do access token utilizando o refresh token;
- implementação de perfis e permissões;
- endpoint específico para indicadores do dashboard;
- evolução da paginação e dos controles de navegação;
- testes automatizados de frontend e backend;
- melhorias adicionais de acessibilidade;
- implementação de histórico de alterações das solicitações, permitindo identificar os usuários responsáveis por ações como edição e alteração de status.

#### 13.3 Ambiente de produção

Em um ambiente corporativo de produção, seria necessário utilizar HTTPS, revisar as políticas de CORS, configurar adequadamente as variáveis de ambiente e definir uma estratégia mais completa para armazenamento e renovação dos tokens.

Também seriam necessários mecanismos de logs, monitoramento, backup do banco de dados e uma estratégia de implantação adequada ao ambiente da organização.

### 14. Conclusão

O Portal de Solicitações Internas foi estruturado como uma aplicação full stack separada em frontend, backend e banco de dados.

A solução implementa os principais requisitos funcionais definidos para a avaliação, incluindo autenticação, cadastro e gerenciamento de solicitações, filtros, consulta de detalhes e dashboard.

A organização em componentes, serviços, modelos, serializers, ViewSets, guards, interceptors e migrations busca manter o código separado por responsabilidade e facilitar sua manutenção e evolução.
