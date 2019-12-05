const express = require('express')
const app = express()
const teams = require('./teams.json')
const bodyParser = require('body-parser')
// const models = require('./models')
app.use(express.static('client'))

app.get('/', (request, response) => {
    response.send('./client/index.html')
})

app.get('/api/teams', (request, response) => {
    response.send(teams)
})

app.get('/api/teams/:x', (request, response) => {
    const result = teams.filter(team => request.params.x == team.id || request.params.x == team.abbreviation);

    if (result.length) {
        response.send(result)
    } else {
        response.sendStatus(404)
    }
})

// app.get('/teams/:abbreviation', (request, response) => {
//     const result = teams.filter(team => request.params.abbreviation === team.abbreviation)
//     // if (result.length) {
//         response.send(result)
//     // } else {
//     //     // response.sendStatus(404)
//     //     response.send(result)
//     // }
// })

// app.post('/teams', bodyParser.json(), (request, response) => {
//     const body = request.body;
//     console.log(body)
//     response.send(body)
// })

app.use(bodyParser.json())

app.post('/api/teams', bodyParser.json(), (request, response) => {
    const {id, location, mascot, abbreviation, conference, division} = request.body
console.log(request.body)
    if (!id || !location || !mascot || !abbreviation || !conference || !division) {
        response.status(400).send('Test')
    }

    const newTeam = {id, location, mascot, abbreviation, conference, division}

    teams.push(newTeam)
    response.status(201).send(newTeam)
})

app.all('*', (request, response) => {
    response.sendStatus(404)
})

app.listen(5555, () => {
    console.log('Server is running')
})

module.exports = app