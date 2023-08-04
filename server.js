const express = require('express')
const fs = require('fs')
const path = require('path')
const util = require('util')
const { v4: uuidv4 } = require('uuid')
const fsPromises = require('fs').promises

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))


app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

app.get('/api/notes', (req, res) => {
    fsPromises.readFile('db/db.json', 'utf8')
    .then(data => res.json(JSON.parse(data)))
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    console.log(`${req.method} request received`)

    if(req.body) {
        response = {
            title, 
            text,
            id: uuidv4()
        }
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if(err) {
                console.error(err)
            } else {
                const dbData = JSON.parse(data)
                dbData.push(response)

                fs.writeFile("./db/db.json", JSON.stringify(dbData, null, "\t"), (writeErr) => {
                    writeErr
                        ? console.error(writeErr)
                        : res.status(201).json(response)
                })
            }
        })
    } else {
        res.status(400).json('request body cannot be emptied')
    }
})

// app.get('/assets/js/index.js', (req, res) => {
//     res.sendFile(path.join(__dirname, 'assets/js/index.js'))
// })

// app.get('/assets/css/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname, 'assets/css/style.css'))
// })


// const readFromFile = util.promisify(fs.readFile)

// const writeToFile = (destination, content) =>
//     fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
//         err ? console.error(err) : console.info(`\nData written to ${destination}`)
//     )

//     const readAndAppend = (content, file) => {
//         fs.readFile(file, 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 const parsedData = JSON.parse(data);
//                 parsedData.push(content);
//                 writeToFile(file, parsedData)
//             }
//         })
//     }


// app.get('/api/notes', (req, res) => {
//     //console.info(`${req.method} grabbing saved notes`)

//     readFromFile('./db/db.json', 'utf8')
//         .then((data) => {
//             console.log('File contents:', data)
//             res.status(200).json({ error: 'Failed' })
//         })
// })


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
)