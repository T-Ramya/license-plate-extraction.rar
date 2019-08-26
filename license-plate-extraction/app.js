const path = require("path");
const Tesseract = require("./tesseract");
const express = require("express");
const uploader = require("express-fileupload");
const app = express();
app.use(express.static('public'));
app.listen(3000, () => {
    console.log("Express is running in 3000");
});

app.use(uploader());

app.post('/upload', (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.imageFile;
    console.log(file.name);
    
    var random = Math.round(Math.random() * 10000);
    const filePath = 'uploads/' + random + file.name;
    file.mv(filePath, function (err) {
        if (err)
            return res.status(500).send(err);
        return Tesseract
            .recognize(filePath, {
                lang: 'eng'
            })
            .then(function (result) {
                console.log(result.text);
                return res.send(result.text);
            });
    });
});