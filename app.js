const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const express = require("express");
const path = require('path');

const app = express();
var PORT = 1912;

app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

// bodyParser for handling url and json using a middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
	res.render("Home");
})

// Using "express-validator" pkg to utilize its middlewares for validating values...
app.post('/saveForm', [
    check('first_name')
        .isAlpha()
        .withMessage("Name should contain alphabets only")
        .isLength({ min: 3, max: 20 })
        .withMessage("Name cannot be empty or must length 3 at least"),
    check('last_name')
        .isAlpha()
        .withMessage("Name should contain alphabets only")
        .isLength({ min: 3, max: 20 })
        .withMessage("Name cannot be empty or must length 3 at least"),
    check('email', 'Email length should be 7 to 30 characters')
        .isEmail()
        .isLength({ min: 10, max: 30 }),
    check('pincode', 'Pincode should be of 6 digits')
        .isNumeric()
        .isLength({ min: 6, max: 6 }),
    check('age','Age should range between 1 to 100').isNumeric({min:18,max:100}),	
    ], (req, res) => {

	// validating if result is having errors or not...
	const err = validationResult(req);

	if (!err.isEmpty()) {
		res.json(err);
	} else {
		res.send("Form validated successfully!");
	}
});

app.listen(PORT, function(err) {
    if (err)
        throw err;
    console.log(`Express-validator app running on PORT ${PORT}!`);
})