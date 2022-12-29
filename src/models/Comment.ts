import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../config/database';

import { User } from './User';
import { Place } from './Place';
import { PictureComment } from './PictureComment';

export class Comment extends Model
{
    declare id: number;
    declare comment: string;
    declare usersId: number;
    declare placesId: number;
    declare created_at: Date;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usersId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    placesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Place,
            key: 'id'
        }
    },
},
{
    sequelize,
    tableName: "comments",
    createdAt: "created_at"
}
);

PictureComment.belongsTo(Comment, {foreignKey: 'commentsId'});
Comment.hasMany(PictureComment, {foreignKey: 'commentsId'});