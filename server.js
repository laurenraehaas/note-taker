const express = require('express')
const fs = require('fs')

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('*', (req, res))
app.get('/notes', (req, res))

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);