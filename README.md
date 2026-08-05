# 💰 Sistema de Gestão Financeira Pessoal (Fullstack MVP)

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-18+-red.svg)](https://angular.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)

Um sistema Fullstack de **Gestão Financeira Pessoal** desenvolvido como Minimum Viable Product (MVP) para otimizar o acompanhamento e planejamento de receitas e despesas com categorização dinâmica em tempo real.

---

## 🎯 Objetivo e Problema Resolvido

Muitas pessoas têm dificuldade em controlar suas finanças diárias por falta de ferramentas simples e centralizadas. Este sistema permite:
1. **Cadastrar categorias** organizando os lançamentos por tipo (**Receita** ou **Despesa**).
2. **Registrar, editar, listar e excluir transações financeiras** atreladas às suas respetivas categorias.
3. **Visualizar extrato completo** com diferenciação visual entre entradas e saídas.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3.x**
  - Spring Data JPA (Persistência e ORM)
  - Spring Web (API RESTful)
- **Lombok** (Produtividade e redução de boilerplate)
- **PostgreSQL** (Banco de dados relacional)
- **Maven** (Gerenciador de dependências)

### Frontend
- **Angular (v18+)**
- **Bootstrap 5** (Design System e componentes responsivos)
- **TypeScript / HTML5 / CSS3** (Fonte Poppins)

---

## 📌 Modelagem do Banco de Dados

O projeto aplica o relacionamento relacional exigido pelo desafio:
- **`Transacao` $\rightarrow$ `@ManyToOne` $\rightarrow$ `Categoria`**: Múltiplas transações (receitas ou despesas) estão associadas obrigatoriamente a uma única categoria.

---

## ⚙️ Como Rodar o Backend (Spring Boot)

### Pré-requisitos
- **Java JDK 21+** instalado.
- **PostgreSQL** rodando na porta `5432` com a base de dados `financeiro` criada.

### Passos:
1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Certifique-se de configurar suas credenciais do PostgreSQL no arquivo `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/financeiro
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

3. Execute a aplicação Spring Boot:
```bash
./mvnw spring-boot:run
```
O servidor ficará ativo em `http://localhost:8080`.

---

## 🅰️ Como Rodar o Frontend (Angular)

### Pré-requisitos
- **Node.js** (v18+) e **npm** instalados.

### Passos:
1. Em um novo terminal, entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências necessárias:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento do Angular:
```bash
npm start
```

4. Acesse a aplicação no seu navegador: **`http://localhost:4200`**.

---

## 🔌 Endpoints da API REST

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/categorias` | Lista todas as categorias cadastradas |
| `POST` | `/api/categorias` | Cadastra uma nova categoria |
| `GET` | `/api/transacoes` | Lista todas as transações cadastradas |
| `POST` | `/api/transacoes` | Cadastra uma nova transação |
| `PUT` | `/api/transacoes/{id}` | Atualiza uma transação existente |
| `DELETE` | `/api/transacoes/{id}` | Exclui uma transação |

---

## ✒️ Autor

Desenvolvido por **Adir Silva**.