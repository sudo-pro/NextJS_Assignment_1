## NextJS Assignment 1

### Project Setup

- Prerequisite:
  - Node.js
  - npm
  - git

#### Setp 1

```sh
git clone  https://github.com/sudo-pro/NextJS_Assignment_1
cd NextJS_Assignment_1
```

#### Step 2

Setup enviroment variables with proper manually created database credentials

```sh
cp .env.example .env

```

#### Step 3

Install dependencies

```sh
npm install

```

#### Step 4

After setup environment, and proper database setup,
You need to migrate database schema for development purpose,
if found any error, you can refer to [prisma docs](https://www.prisma.io/docs/orm/prisma-migrate/getting-started).

```sh
npm run db:migrate

```

#### Step 5

- Option 1: Run with development server

```sh
npm run dev

```

- Option 2: Run with production server

```sh
npm run build
npm start
```

### Assignment Workflow

```sh
npx create-next-app@latest nextjs-assignment-1 --ts --tailwind --eslint --app  --import-alias "~/*" --empty --use-npm --turbopack --yes
cd  nextjs-assignment-1
git init .
echo "## NextJS Assignment 1" > README.md
git add .
git commit -m "Initial commit"

gh repo create NextJS_Assignment_1 --private
git remote add origin git@github.com:sudo-pro/NextJS_Assignment_1.git
git push origin master

npm i prisma @prisma/client next-auth bycrypt
npm i zod sonner clsx

```
