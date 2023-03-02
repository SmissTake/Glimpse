import express from 'express';
import { CommentController } from '../controllers/CommentController';

const commentController = new CommentController();

export const routerComment = express.Router({
    strict:true
});

routerComment.route('/comment/show/:id').get(commentController.read);