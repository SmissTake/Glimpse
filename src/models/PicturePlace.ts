import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../config/database';

import { Place } from './Place';

export class PicturePlace extends Model
{
    declare id: number;
    declare url: string;
    declare placesId: number;
}

PicturePlace.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Place,
            key: 'id'
        }
    }
},
{
    sequelize,
    tableName: "picture_places",
    timestamps: false
})