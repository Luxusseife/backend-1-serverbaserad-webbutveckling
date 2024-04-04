// En applikation med Express/EJS/SQL.


// Inkluderar Express.
const express = require("express");
// Startar upp applikationen.
const app = express();
// Väljer port.
const port = 3000;

// Ställer in view engine till EJS. 
app.set("view engine", "ejs");
// Statiska filer i katalogen "public".
app.use(express.static("public"));

// Routing.
app.get("/", (req, res) => { // Skickar anrop till Index-sidan.
    res.render("index", {
        fullname: "Jenny Lind",
        title: "Mina kurser"
    });
});

app.get("/addcourse", (req, res) => { // Skickar anrop till kurs-sidan.
    res.render("addcourse", {
        fullname: "Jenny Lind",
        title: "Lägg till kurs"
    });
});

app.get("/about", (req, res) => { // Skickar anrop till Om-sidan.
    res.render("about", {
        fullname: "Jenny Lind",
        title: "Om appen"
    });
});

// Startar applikationen.
app.listen(port, () => {
    console.log("Server started on localhost-port: " + port);
});