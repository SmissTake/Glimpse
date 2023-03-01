import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/database'

export class Category extends Model {
    declare id: number;
    declare label: string;
    declare avatar: string;
    declare is_active: boolean;
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
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            max: 255,
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    sequelize,
    tableName: "categories",
    timestamps: false
}
);