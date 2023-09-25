import {createPool} from 'mysql2/promise';

export const conn = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce',
});
