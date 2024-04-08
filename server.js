// En applikation med Express/EJS/PostgreSQL.


// Förbereder miljön för anslutning till PostgreSQL-databasen.
const { Client } = require("pg");
require("dotenv").config();
// Inkluderar Express.
const express = require("express");
// Startar upp applikationen.
const app = express();
// Väljer port.
const port = process.env.PORT || 5000;

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

// Anslutnings- eller felmeddelande.
client.connect((error) => {
    if(error) {
        console.log("Fel vid anslutning: " + error);
    } else {
        console.log("Ansluten till databasen!");
    }
});

// Ställer in view engine till EJS. 
app.set("view engine", "ejs");
// Statiska filer i katalogen "public".
app.use(express.static("public"));
// Möjliggör inläsning och hantering av formulärdata. 
app.use(express.urlencoded( { extended: true }));

// Routing.
// Skickar anrop till Index-sidan.
app.get("/", (req, res) => { 
    res.render("index", {
        fullname: "Jenny Lind",
        title: "Mina kurser", 
    });
});

// Skickar anrop till kurs-sidan.
app.get("/addcourse", (req, res) => { 
    res.render("addcourse", {
        fullname: "Jenny Lind",
        title: "Lägg till kurs"
    });
});

// Skapar/lägger till kurs i databasen.
app.post("/", async (req, res) => {
    const coursename = req.body.name;
    const coursecode = req.body.code;
    const progression = req.body.progression;
    const syllabus = req.body.syllabus;

    // SQL-fråga.
    const result = await client.query("INSERT INTO courses(coursename, coursecode, progression, syllabus) VALUES($1, $2, $3, $4)",
    [coursename, coursecode, progression, syllabus]
    );
    res.redirect("/");
});

// Skickar anrop till Om-sidan.
app.get("/about", (req, res) => { 
    res.render("about", {
        fullname: "Jenny Lind",
        title: "Om appen"
    });
});

// Startar servern.
app.listen(port, ()=> {
    console.log("Servern är startad på port: " + port);
})