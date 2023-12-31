const pg = require('pg');
// let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const Pool = pg.Pool;

const pool = new Pool({
    host: PGHOST,
    port: 5432,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
})
pool.on('connect', () => {
    console.log('The magical pool thing connected to your postgres database. :)');
})

// Spit out a console log when the pool errors:
pool.on('error', (error) => {
    console.log('The magical pool has errored. Bummer.', error);
})

// if (process.env.DATABASE_URL) {
//     pool = new pg.Pool({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
// }
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
// else {
//     pool = new pg.Pool({
//         host: 'localhost',
//         port: 5432,
//         database: 'saga_movies_weekend', 
//     });
// }

module.exports = pool;
