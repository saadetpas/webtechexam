import Sequelize from "sequelize";
import db from '../dbConfig.js';

const Crewmember = db.define("Crewmember", {

    CrewemberId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    CrewmemberName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5, 100]
        }
    },

    CrewmemberRole: {
        type: Sequelize.ENUM('Director', 'Actor', 'Producer', 'Make-up Artist', 'Costume Maker'),
        allowNull: true
    },

    MovieId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Crewmember;