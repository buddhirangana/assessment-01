var express = require("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
app.use(bodyParser.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log("Server is running on %PORT%".replace("%PORT%", HTTP_PORT));
});


app.post("/api/customers", [
    check('email').isEmail(),
    check('cardNumber').isLength({ min: 12, max: 12 })
], (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        } = req.body;

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp];
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                res.status(201).json({
                    "message": "customer %NAME% has registered".replace("%NAME%", name),
                    "customerId": this.lastID
                });
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});