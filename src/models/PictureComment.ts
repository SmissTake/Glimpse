import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../config/database';

import { Comment } from './Comment';

export class PictureComment extends Model
{
    declare id: number;
    declare url: string;
    declare commentsId: number;
}

PictureComment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Comment,
            key: 'id'
        }
    }
},
{
    sequelize,
    tableName: "picture_comments",
    timestamps: false
})