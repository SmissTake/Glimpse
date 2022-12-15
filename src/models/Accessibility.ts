import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/database'

export class Accessibility extends Model
{
    declare id: number;
    declare label: string;
}

Accessibility.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize,
    tableName: "accessibilities",
    timestamps: false
}
);
