const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://code-to-give:LzO8l9BxQm5istgt@cluster0.gmq4xzc.mongodb.net/?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database')

        const db = client.db('hack')
        const postsCollection = db.collection('posts')

        const app = express();


        app.use(bodyParser.urlencoded({ extended: false }))

        app.use(bodyParser.json())

        app.listen(8080, function () {
            console.log('listening on 8080')
        })

        app.get('/', function (req, res) {
            res.send('Hello World')
        })

        app.post('/posts', (req, res) => {
            console.log(req.body)
            postsCollection.insertOne(req.body).then(
                res.status(200).send("Created posts!")
            ).catch(
                error => console.error(error)
            )
        })

    })