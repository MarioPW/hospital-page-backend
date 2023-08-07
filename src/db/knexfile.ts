import dotenv  from 'dotenv'

dotenv.config()

// module.exports = {
//     development: {
//         client: 'pg',
//         connection:  {
//             host: 'localhost',
//             port: 5432,
//             database: 'postgres',
//             user: 'postgres',
//             password: process.env.PWS
//         },
//         migrations:{
//             directory:'./migrations',
//             tableName: 'knex_migrations',
//         }
//     }
// }
// module.exports = {
//     development: {
//         client: 'postgresql',
//         connection: {
//             user: 'postgres',
//             password: process.env.PWS,
//             dabase: 'postgres',
//         },
//         migrations:{
//             tableName: 'knex_migrations'
//         }
//     }
// }
import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg', // El cliente de la base de datos que estás utilizando (por ejemplo, pg para PostgreSQL)
  connection: {
    // Aquí coloca las credenciales y detalles de conexión a tu base de datos
    host: 'localhost',
    user: 'postgres',
    password: "1234",
    database: 'postgres',
  },
};

export default config;