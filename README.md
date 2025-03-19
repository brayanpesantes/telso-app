# Description

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del `.env.template` y renombrar a `.env` y cambiar las variables de entorno
3. Instalar dependencias ``pnpm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `pnpm dlx prisma migrate dev`
6. Ejecutar seed `pnpm run seed`
7. Correr el proyecto `pnpm run dev`

## Correr en Producción
