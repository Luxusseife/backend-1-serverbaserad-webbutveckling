const { Client } = require("pg");
require("dotenv").config();

// Ansluter till databasen.
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});
    
client.connect((error) => {
    if(error) {
        console.log("Fel vid anslutning: " + error);
    } else {
        console.log("Ansluten till databasen!");
    }
});

// Skapar tabellen course. 
client.query (`
    DROP TABLE IF EXISTS courses;
    CREATE TABLE courses(
        courseid SERIAL PRIMARY KEY,
        coursename TEXT NOT NULL,
        coursecode TEXT NOT NULL,
        syllabus TEXT NOT NULL,
        progression TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);