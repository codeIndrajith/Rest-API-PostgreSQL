# My Prisma Project

This project demonstrates how to set up a Node.js project with Prisma using JavaScript.

## Project Setup

### Step 1: Initialize a New Node.js Project

1. Create a new directory for your project:

    ```sh
    mkdir my-prisma-project
    cd my-prisma-project
    ```

2. Initialize a new Node.js project:

    ```sh
    npm init -y
    ```

### Step 2: Install Prisma and Its Dependencies

1. Install Prisma CLI and the Prisma Client:

    ```sh
    npm install @prisma/client
    npm install prisma --save-dev
    ```

### Step 3: Initialize Prisma

1. Initialize Prisma in your project:

    ```sh
    npx prisma init
    ```

    This command will create a `prisma` directory with a `schema.prisma` file and a `.env` file in your project root.

### Step 4: Configure Your Database

1. Open the `.env` file and set your database connection string:

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

    Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual database credentials. For example, if you're using SQLite for simplicity:

    ```env
    DATABASE_URL="file:./dev.db"
    ```

### Step 5: Define Your Data Model

1. Open the `prisma/schema.prisma` file and define your data model:

    ```prisma
    datasource db {
      provider = "sqlite"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model User {
      id    Int     @id @default(autoincrement())
      name  String
      email String  @unique
    }
    ```

### Step 6: Migrate Your Database

1. Create and run your first migration to set up the database:

    ```sh
    npx prisma migrate dev --name init
    ```

### Step 7: Generate Prisma Client

1. Generate the Prisma Client based on your schema:

    ```sh
    npx prisma generate
    ```

### Step 8: Use Prisma Client in Your Project

1. Create a new file `index.js` to use the Prisma Client:

    ```js
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    async function main() {
      // Create a new user
      const user = await prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
        },
      });
      console.log(user);

      // Fetch all users
      const allUsers = await prisma.user.findMany();
      console.log(allUsers);
    }

    main()
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    ```

2. Run your script:

    ```sh
    node index.js
    ```

### Optional: Explore Prisma Studio

1. Prisma Studio is a GUI to view and edit your data:

    ```sh
    npx prisma studio
    ```

This setup will give you a basic Node.js project using Prisma with JavaScript. You can expand on this by adding more models, relations, and further functionality as needed for your project.
