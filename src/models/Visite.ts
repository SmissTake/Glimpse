import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Visite extends Model
{
    declare usersId: number;
    declare placesId: number;
}

Visite.init({
    usersId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    placesId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
},
{
    sequelize,
    tableName: "visite",
    timestamps: false
})