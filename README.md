# Sistema de login

Login y registro básicos en Next.js. Los usuarios viven en un SQLite local (`local.db`) y la sesión es una cookie.

## Qué hace

- **Registro** — guarda email y contraseña. La contraseña se hashea con bcrypt antes de insertarla.
- **Login** — busca el usuario y compara el hash. Si cuadra, escribe la cookie `session_user_id` (httpOnly, 24 h).
- **Logout** — borra esa cookie.
- La página alterna entre los dos formularios y muestra el mensaje de éxito o error.

Las acciones (`registerAction`, `loginAction`, `logoutAction`) corren en el servidor. La base se consulta con Drizzle y `better-sqlite3`.

## Arranque

```bash
pnpm install
pnpm db:push
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).
