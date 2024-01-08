import pgPromise from "pg-promise";
import * as dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();
const port = process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432;

const db = pgp({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    port: port,
    ssl: process.env.PG_SSL === "true"
});

export = db;