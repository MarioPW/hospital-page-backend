import { knex } from 'knex'
import dotenv  from 'dotenv'

dotenv.config()
export const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: process.env.PWS
    },
})

export default db