const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = 3001;

const app = express();

const readfromFile = util.promisify(fs.readFile)

const writetoFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    )

    const readandAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(content);
                writetoFile(file, parsedData)
            }
        })
    }

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)
app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/js/index.js'))
})

app.get('/assets/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/css/style.css'))
})

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
)