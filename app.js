const express = require('express')
const app = express();
const fetch = require('node-fetch')
const fs = require('fs')
const bodyParser = require('body-parser')
const helmet = require('helmet')
var favMusic = JSON.parse(fs.readFileSync('./favoritesMusic.json'))

app.use(bodyParser.json())
app.use(express.json())
app.use(helmet())

app.get('/music', (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=song`)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            res.send((data.results))
        })
})

app.post('/favoritesMusic', (req, res) => {
    favMusic.push(req.body)

    fs.writeFile('favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("Your upload was unsuccessful", err)
        } else {
            console.log("Your upload was successful")
        }
    })
})

//this gets and displays songs added to json file
app.get('/favoritesMusic', (req, res) => {
    fs.readFile('./favoritesBooks.json', (err, data) => {
        if (err) {
            console.log('Does not work')
        } else {
            res.send(favMusic)
        }
    })
})

app.delete('/favoritesMusic', (req, res) => {
    console.log('access')
    favMusic = favMusic.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile('favoritesMusic.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("unsuccessful", err)
        } else {
            console.log("SUCCESS")
        }
    })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Sever is listening on port ${PORT}`)
})

