import Sequelize from "sequelize";
import db from '../dbConfig.js';

const Movie = db.define("Movie", {

    MovieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    MovieTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 100]
        }
    },

    MovieCategory: {
        type: Sequelize.ENUM('Drama', 'Horror', 'Comedy', 'Sci-fi', 'Action'),
        allowNull: false,
    },

    MoviePublicationDate: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

export default Movie;