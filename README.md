# 🚀 Formulário de Cadastro de Clientes

Este projeto é uma aplicação fullstack.  
O objetivo é permitir que usuários cadastrem clientes com validação, persistência no banco de dados e uma interface moderna e responsiva.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (validação)

### Frontend
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)

---

## ✨ Funcionalidades

✅ Cadastro de clientes com os seguintes campos:
- Nome completo
- CPF (com máscara e validação)
- E-mail
- Cor preferida (arco-íris)
- Observações

✅ Prevenção de cadastros duplicados por CPF e e-mail

✅ Validação do formulário no frontend e backend

✅ Feedback ao usuário com toasts de sucesso e erro

✅ Layout responsivo

✅ Integração com banco PostgreSQL

---

## 🚀 Como rodar o projeto localmente

> 💡 **Pré-requisitos**:
> - Node.js (v20+)
> - Docker (opcional, mas recomendado para PostgreSQL)

---

## 📂 Clone o repositório

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

## ⚙️ Configurar o Backend

Acesse a pasta do backend e instale as dependências:

```bash
cd backend
npm install
```
### Configure o `.env`:
```ini
 DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clientes"
```
### Se quiser subir o banco via Docker:
```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=clientes -p 5432:5432 -d postgres
```
### Rode as migrations do Prisma:
```bash
npx prisma migrate dev --name init
```

### Inicie o servidor:
```bash
npm run start:dev
```

#### Backend disponível em: http://localhost:3000.

## 💻 Configurar o frontend

### Em outra aba de terminal, entre na pasta:
```bash
cd frontend
```
### Instale as dependências:

```bash
npm install
```

### Configure o `.env`:
```ini
VITE_API_URL=http://localhost:3000
```

### Inicie a aplicação:
```bash
npm run dev
```

####  O frontend estará rodando em http://localhost:5173.

## 🧪 Testando a API
### Use o Postman ou Insomnia para testar o endpoint:
```bash
POST http://localhost:3000/clientes
```
#### Payload exemplo:
```json
{
  "nome": "João da Silva",
  "cpf": "12345678901",
  "email": "joao@exemplo.com",
  "corPreferida": "azul",
  "observacoes": "Cliente importante"
}
```
## 📝 Decisões Técnicas

- **NestJS:** Modularidade e escalabilidade.
- **Prisma:** Facilita modelagem e manutenção do banco.
- **Zod:** Validação declarativa e integração com TypeScript.
- **React Hook Form:** Melhor performance em formulários + integração com Zod.
- **Tailwind CSS:** Agilidade na criação do layout responsivo.

## 📄 Licença

Projeto criado com fins de demonstração técnica e aprendizado.

## 🙋 Sobre mim

Desenvolvido por [**Laís Bagno**](https://www.linkedin.com/in/laisbagno/) 