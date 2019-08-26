const path = require("path");
const Tesseract = require('tesseract.js').create({
    workerPath: path.join(__dirname, 'src/node/worker.js'),
    langPath: path.join(__dirname, 'src/langs'),
    corePath: path.join(__dirname, 'src/node/index.js')
});

module.exports = Tesseract;