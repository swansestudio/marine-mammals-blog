import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.CONNECTIONSTRING;

const client = new MongoClient(connectionString);

let connection;

try {
  connection = await client.connect();
} catch (e) {
  console.error(e);
}

let db = connection.db("mongo-express");


export default db;
