import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Follow extends Model
{
    declare followerId: number;
    declare followingId: number;
}

Follow.init({
    followerId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    followingId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
},
{
    sequelize,
    tableName: "follow",
    timestamps: false
})