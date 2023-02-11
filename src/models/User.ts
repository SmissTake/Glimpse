import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../config/database';

import { Permission } from './Permission'
import { Place } from './Place';
import { Favorite } from './Favorite';
import { Comment } from './Comment';

export class User extends Model
{
    declare id: number;
    declare pseudonym: string;
    declare biography: string;
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
    biography: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            max: 255,
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

// Comment.belongsTo(User, {foreignKey: 'usersId'});
// User.hasMany(Comment, {foreignKey: 'usersId'});