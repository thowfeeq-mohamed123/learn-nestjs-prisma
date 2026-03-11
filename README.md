# NestJS Prisma API

A scalable backend API built with **NestJS**, **Prisma ORM**, and **PostgreSQL**.
This project demonstrates a clean architecture with authentication, database migrations, and modular structure.

---

## 🚀 Tech Stack

- **NestJS** – Progressive Node.js framework
- **Prisma ORM** – Modern database ORM
- **PostgreSQL** – Relational database
- **JWT Authentication** – Secure authentication
- **TypeScript** – Type-safe development
- **Passport** – Authentication middleware

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/nestjs-prisma.git
```

Navigate into the project:

```bash
cd nestjs-prisma
```

Install dependencies:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

Example:

```
DATABASE_URL="postgresql://username:password@localhost:5432/nestdb"

JWT_SECRET=yourSuperSecretKey
JWT_EXPIRES_IN=1d
JWT_ALGORITHM=HS512
```

---

## 🗄️ Prisma Setup

Generate Prisma client:

```bash
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate:dev
```

Open Prisma Studio:

```bash
npm run prisma:studio
```

---

## 📦 Available Scripts

| Command                         | Description                |
| ------------------------------- | -------------------------- |
| `npm run start`                 | Start application          |
| `npm run start:dev`             | Start in development mode  |
| `npm run build`                 | Build project              |
| `npm run prisma:generate`       | Generate Prisma client     |
| `npm run prisma:migrate:dev`    | Run development migrations |
| `npm run prisma:migrate:deploy` | Run production migrations  |
| `npm run prisma:studio`         | Open Prisma GUI            |

---

## 🔐 Authentication

This API uses **JWT authentication**.

Example request header:

```
Authorization: Bearer <your_token>
```

Protected routes use a **JWT Guard**.

---

## 📝 Example API Endpoints

### Login

```
POST /auth/login
```

### Create Post

```
POST /post/createPost
```

Requires authentication.

---

## 🧪 Running the Application

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

---

## 📊 Database Migration Workflow

1. Update `schema.prisma`
2. Run migration

```bash
npm run prisma:migrate:dev
```

3. Prisma client will regenerate automatically.

---

## 🧑‍💻 Author

**Mohamed Dowbi**

Senior Backend Developer
Specialized in **Node.js, NestJS, and scalable backend systems**

---

## 📜 License

This project is licensed under the **MIT License**.
