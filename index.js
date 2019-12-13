const express = require('express')
//const teams = require('./teams.json')
const bodyParser = require('body-parser')
const models = require('./models')
//app.use(express.static('client'))

const app = express()

// app.get('/', (request, response) => {
//     response.send('./client/index.html')
// })

app.get('/teams', (request, response) => {
    models.Teams.findAll().then((teams) => {
    response.send(teams)
    })
})

app.get('/teams/:id', (request, response) => {
    models.Teams.findOne({
        where: { id: request.params.id }
    }).then((team) => {
        if (team) {
            response.send(team)
        } else {
            response.sendStatus(404)
        }
    })
    //const result = teams.filter(team => request.params.x == team.id || request.params.x == team.abbreviation);
    // if (result.length) {
    //     response.send(result)
    // } else {
    //     response.sendStatus(404)
    // }
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

app.post('/teams', bodyParser.json(), (request, response) => {
    const {id, location, mascot, abbreviation, conference, division} = request.body

    if (!id || !location || !mascot || !abbreviation || !conference || !division) {
        response.status(400).send('Test')
    }
    models.Teams.findAll().then((team) => {
        if (!team) {
            response.sendStatus(404).send('Unknown Team Slug')
        } else {
            models.Teams.create({id, location, mascot, abbreviation, conference, division}).then((newTeam) => {
                response.status(201).send(newTeam)
            })
        }
    })
    // const newTeam = {id, location, mascot, abbreviation, conference, division}

    // teams.push(newTeam)
    // response.status(201).send(newTeam)
})

app.all('*', (request, response) => {
    response.sendStatus(404)
})

app.listen(5555, () => {
    console.log('Server is running')
})

module.exports = app