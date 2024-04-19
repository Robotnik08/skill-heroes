import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import { Day } from './assets/js/day.mjs';
import { ValidateDay, checkId, validateName, validateEmail } from './assets/js/validators.mjs';

import config from "./config.json" assert { type: "json" };

const db_connection = mysql.createConnection(config);

const app = express();
const port = config.app_port;


db_connection.connect((err) => {
    if (err) {
        console.log("An error occured when connecting to db");
        throw err;
    }
    console.log("Database connected succesfully.");
})

// middleware
app.use(cors());

app.use(express.json());
 
app.use(express.urlencoded({ extended: true }));
// middleware

// get all shops in a list
app.get('/api/shops', (req, res) => {
    db_connection.query("SELECT * FROM shops;", (err, result) => {
        if (err) {
            res.status(500).send("Error: Internal server error.");
            return;
        }
        res.json(result);
    });
});

// get 1 shop
app.get('/api/shops/:id', (req, res) => {
    const id = Number.parseFloat(req.params.id);

    // check if the number is correct, to prevent injections
    if (!checkId(id, res)) return;

    db_connection.query(`SELECT * FROM shops WHERE id = ${id};`, (err, result) => {
        if (err) {
            res.status(500).send("Internal server error.");
            return;
        }
        if (result.length == 0) 
            res.status(404).send("Error: shop with id not found.");
        else
            res.json(result);
    });
});

// post a reservation
app.post('/api/shops/:id/reservation', (req, res) => {
    const id = Number.parseFloat(req.params.id);

    // check if the number is correct, to prevent injections
    if (!checkId(id, res)) return;

    if (req.body == undefined) {
        res.status(400).send("Error: Header not provided");
        return;
    }

    req.body.day = ValidateDay(Number.parseFloat(req.body?.day));

    if (req.body.day === false) {
        res.status(400).send("Error: Day is invalid, make sure it's a number and it's from 0 to 7.");
        return;
    }

    req.body.name = validateName(req.body?.name);
    req.body.email = validateEmail(req.body?.email);

    if (!req.body.name || !req.body.email) {
        res.status(400).send("Error: Name or Email is invalid.");
        return;
    }

    const query_string = 
        "INSERT INTO `reservations` (`id`, `shop_id`, `day`, `name`, `email`)"
        + `VALUES (NULL, '${id}', '${req.body.day ?? Day.monday}', '${req.body.name}', '${req.body?.email}');`

    db_connection.query(query_string, (err, result) => {
        if (err) {
            res.status(500).send("Error: Internal server error.");
            return;
        }

        res.status(200).send("Reservation added succesfully.");
    });
});

app.get("/img/:image", (req, res) => {
    if (!fs.existsSync(path.join(__dirname, `./api/img/${req.params.image}`))) {
        res.status(404).sendFile(path.join(__dirname, `./api/img/not_found.png`));
        return;
    }

    res.sendFile(path.join(__dirname, `./api/img/${req.params.image}`));
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});