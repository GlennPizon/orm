import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import * as mysql from 'mysql2/promise';

// Database connection options for creating the database (no database selected)
const connectOptions = {
    host: 'localhost',
    port: 3306,
    user: 'localhost',
    password: 'Loay4321*',
    connectTimeout: 60000
};

export const PORT = 3000;

// Database name
const dbName: string = "node-CRUD-mysql-api";

// Function to create the database if it doesn't exist
export const createDB = async (dbName: string) => {
    let connection;
    try {
        connection = await mysql.createConnection(connectOptions);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log(`Database "${dbName}" created or already exists.`);
    } catch (err) {
        console.error(`Error creating database "${dbName}":`, err);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

// AppDataSource: TypeORM DataSource configuration
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "localhost",
    password: "Loay4321*",
    database: dbName, // Use the defined dbName here
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    connectTimeout: 60000 // Timeout for TypeORM connection
});

// Function to initialize the Data Source
export const initialize = async () => {
    await AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!");
    }).catch((err) => {
        console.error("Error during Data Source initialization:", err);
        createDB(dbName);

        console.log(`Database "${dbName}" created`)
        initialize();
    });
};

