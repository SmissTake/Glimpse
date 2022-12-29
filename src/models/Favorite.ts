import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Favorite extends Model
{
    declare usersId: number;
    declare placesId: number;
}

Favorite.init({
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
    tableName: "favorite",
    timestamps: false
})