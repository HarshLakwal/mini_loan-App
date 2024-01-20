import dotenv from 'dotenv'
dotenv.config();

export const {
    DB_KEY,
    PORT,
    EMAIL,
    PASSWORD,
    MERCHANTID,
    SALTKEY
} = process.env