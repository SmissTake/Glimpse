import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/database'

export class Category extends Model {
    declare id: number;
    declare label: string;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 50,
        }
    },
},
{
    sequelize,
    tableName: "categories",
    timestamps: false
}
);