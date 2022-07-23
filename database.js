var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQlite database.');
        db.run(`CREATE TABLE customer (
            customerId INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            address text,
            email text,
            dateOfBirth text,
            gender text,
            age INTEGER,
            cardHolderName text,
            cardNumber INTEGER,
            expiryDate text,
            cvv INTEGER,
            timeStamp text
            )`, (err) => {
            if (err) {
            } else {
                var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                db.run(insert, ["E.L.A. Buddhi Rangana", "No. 85/77A Upekka Mawatha, Kuruduwatta, Gonawala, Kelaniya", "buddhi@gmail.com", "1999.10.20", "Male", 23, "E.L.A. Buddhi Rangana", 324567534235, "10/2026", 200, "2022-02-24 23:54:59"]);
            }
        });

    }
});

module.exports = db;