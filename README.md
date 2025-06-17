# 🔐 Tanman Auth App

A simple and secure authentication app built for **Tanman**, featuring user registration, login, session handling with JWT, and protected routes. The app uses **Next.js App Router**, **PostgreSQL**, **Drizzle ORM**, and **Edge-compatible JWT authentication** via [`jose`](https://github.com/panva/jose).

---

## ⚙️ Tech Stack

- **Framework**: Next.js (App Router)
- **Auth**: JWT (via [`jose`](https://github.com/panva/jose))
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS (optional)
- **Runtime**: Edge-compatible (for fast, serverless deployment)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedelbilal/simple-auth-tanman.git
cd simple-auth-tanman
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a .env file based on the provided .env.example:

```bash
cp .env.example .env
```

Update the values in .env to match your local PostgreSQL setup and JWT secret.

### 4. Run Database Migrations

If you're using Drizzle's migration system:

```bash
npx drizzle-kit push
```

Or manually apply SQL from db/migrations/.

### 5. Start the Development Server

```bash
npm run dev
```

## 🧪 Routes Overview

| Method | Route                | Description                |
| ------ | -------------------- | -------------------------- |
| `POST` | `/api/auth/register` | Register a new user        |
| `POST` | `/api/auth/login`    | Authenticate and set JWT   |
| `GET`  | `/api/auth/me`       | Get current user (via JWT) |
| `POST` | `/api/auth/logout`   | Clear session (JWT cookie) |

## 🛡️ Auth Flow Summary

- **Register**

  - User submits a username and password
  - Password is hashed using `bcrypt`
  - User data is stored in the PostgreSQL database

- **Login**

  - Credentials are verified
  - A JWT is generated containing the user's `id` and `username`
  - JWT is stored in an HTTP-only cookie for security

- **Me**

  - Server reads the JWT from cookies
  - JWT is verified using a secret key
  - If valid, the user’s `id` and `username` are returned

- **Logout**
  - JWT cookie is cleared
  - Session is effectively ended
