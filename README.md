# Sveltekit + Objection.js Fullstack
this is just plain implementation, from my learning journey
## preparation

1. clone this
2. check knexfile, make sure it matches with your database
3. if knex already installed in global, run `knex migrate:latest`, else run `npx knex migrate:latest` instead

## run

`npm run dev` or `pnpm dev`

## manual test

1. go to `http://localhost:3000/mendaftar` for signup, and create the first user
2. automatically redirect to `http://localhost/masuk` for signin
