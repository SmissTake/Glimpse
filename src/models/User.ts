import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../config/database';

import { Permission } from './Permission'

export class User extends Model
{
    declare id: number;
    declare pseudonym: string;
    declare mail: string;
    declare password: string;
    declare avatar: string;
    declare permissionsId: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pseudonym: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 50,
        }
    },
    mail: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
            max: 100,
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    permissionsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Permission,
            key: 'id',
        }
    }
},
{
    sequelize,
    tableName: "users",
    timestamps: false
}
);