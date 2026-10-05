# Dicionário de Dados

## Portal de Solicitações Internas

Este documento descreve os principais dados persistidos e utilizados pelo Portal de Solicitações Internas.

> Os tipos abaixo são apresentados em termos lógicos. A estrutura física é gerenciada pelas migrations do Django e pelo PostgreSQL.

---

# 1. Entidade: Usuário

A aplicação utiliza o sistema de usuários nativo do Django.

### Campos

#### `id`

- **Tipo:** Inteiro
- **Obrigatório:** Sim
- **Descrição:** Identificador único do usuário.

#### `username`

- **Tipo:** Texto
- **Obrigatório:** Sim
- **Descrição:** Nome utilizado para identificação e login do usuário.

#### `password`

- **Tipo:** Texto protegido
- **Obrigatório:** Sim
- **Descrição:** Senha utilizada para autenticação. É processada pelo mecanismo de autenticação do Django e não deve ser armazenada em texto puro.

### Relacionamento

Um usuário pode possuir várias solicitações.

**Cardinalidade:** `1:N`

---

# 2. Entidade: Solicitação

Representa uma solicitação registrada no portal.

### Campos

#### `id`

- **Tipo:** Inteiro
- **Obrigatório:** Sim
- **Descrição:** Identificador único da solicitação.

#### `titulo`

- **Tipo:** Texto
- **Obrigatório:** Sim
- **Tamanho máximo:** 200 caracteres
- **Descrição:** Título da solicitação. Também é utilizado como critério de pesquisa textual.

#### `descricao`

- **Tipo:** Texto
- **Obrigatório:** Sim
- **Descrição:** Descrição detalhada da necessidade registrada.

#### `categoria`

- **Tipo:** Texto controlado
- **Obrigatório:** Sim
- **Tamanho máximo:** 20 caracteres
- **Descrição:** Categoria à qual a solicitação pertence.

**Valores permitidos:**

- `TI` — TI
- `RH` — RH
- `COMPRAS` — Compras
- `FINANCEIRO` — Financeiro
- `INFRAESTRUTURA` — Infraestrutura

#### `status`

- **Tipo:** Texto controlado
- **Obrigatório:** Sim
- **Tamanho máximo:** 20 caracteres
- **Valor padrão:** `ABERTO`
- **Descrição:** Situação atual da solicitação.

**Valores permitidos:**

- `ABERTO` — Aberto
- `EM_ATENDIMENTO` — Em Atendimento
- `CONCLUIDO` — Concluído

#### `solicitante`

- **Tipo:** Chave estrangeira
- **Obrigatório:** Sim
- **Referência:** Usuário
- **Descrição:** Usuário autenticado responsável pelo registro da solicitação. Definido pelo backend.
- **Regra de exclusão:** `PROTECT`

#### `created_at`

- **Tipo:** Data/hora
- **Obrigatório:** Sim
- **Descrição:** Data e hora de criação da solicitação, preenchida automaticamente pelo backend.

#### `updated_at`

- **Tipo:** Data/hora
- **Obrigatório:** Sim
- **Descrição:** Data e hora da última atualização da solicitação, atualizada automaticamente pelo backend.

---

# 3. Relacionamentos

## Usuário → Solicitação

- Um usuário pode possuir várias solicitações.
- Cada solicitação possui um único solicitante.
- **Cardinalidade:** `1:N`

A relação é implementada por meio de uma `ForeignKey` entre `Solicitacao` e o modelo `User` nativo do Django.

---

# 4. Regras e observações

- O usuário é gerenciado pelo sistema de autenticação nativo do Django.
- A senha é processada pelo mecanismo de autenticação do Django e não deve ser armazenada em texto puro.
- O campo `solicitante` é associado ao usuário autenticado pelo backend durante a criação da solicitação.
- O campo `status` recebe `ABERTO` como valor inicial.
- `created_at` e `updated_at` são controlados automaticamente pelo backend.
- `categoria` utiliza valores controlados definidos no modelo `Solicitacao`.
- `status` utiliza valores controlados definidos no modelo `Solicitacao`.
- Os identificadores `id` são únicos para cada registro.
- A exclusão de um usuário relacionado a solicitações é protegida pela regra `PROTECT`.