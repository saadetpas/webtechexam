import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Const.js';
import db from './dbConfig.js';
import Movie from './entities/Movie.js';
import Crewmember from './entities/Crewmember.js';

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

let conn;

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then((connection) => {
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS Production');
})
.then(() => {
    return conn.end();
})
.catch((err) => {
    console.warn(err.stack);
})


router.route('/create').get(async (req, res) => {
    try{
        await db.sync({force: true})
        res.status(201).json({message: 'created'});
    }
    catch(err){
        console.warn(err.stack);
        res.status(500).json({message: 'server error'});
    }
})

Movie.hasMany(Crewmember, {as: "Crewmembers", foreignKey: "MovieId"});
Crewmember.belongsTo(Movie, {foreignKey: "MovieId"});

db.sync();

// logic functions

async function getMovies(){
    return await Movie.findAll({include: ["Crewmembers"]})
}

async function createMovie(movie){
    return await Movie.create(movie, {include: [{model: Crewmember, as: "Crewmembers"}]});
}

async function getMoviebyId(id){
    return await Movie.findByPk(id, {include: ["Crewmembers"]})
}


router.route('/movie').post( async (req, res) => {
    return res.json(await createMovie(req.body));
})

router.route('/movie').get( async (req, res) => {
    return res.json(await getMovies());
})

router.route('/movie/:id').get( async (req, res) => {
    return res.json(await getMoviebyId(req.params.id));
})



let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);