import dotenv  from 'dotenv'

dotenv.config()

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.POSTGRES_URI,
        migrations:{
            directory:'./migrations',
            tableName: 'knex_migrations',
        }
    }
}
// module.exports = {
//     development: {
//         client: 'postgresql',
//         connection: {
//             host:'localhost',
//             user: 'postgres',
//             password: process.env.PWS,
//             dabase: 'gestion_citas',
//             port:5433,
//         },
//         migrations:{
//             directory:'./db/migrations'
//         }
//     }
// }
