import pgPromise from "pg-promise";

const pgp = pgPromise({});
const config = {
    db: {
        host: "127.0.0.1",
        port: 5432,
        database: "sota",
        user: "sota",
        // password: "password",
        max: 10, // size of the connection pool
        query_timeout: 60000 // 60sec
    }
};

// production modeでは warningは発生しない
export const sqlExecuter = pgp(config.db);