import express from 'express';
import { CommentController } from '../controllers/CommentController';

const commentController = new CommentController();

export const routerComment = express.Router({
    strict:true
});

routerComment.route('/comment/show/:id').get(commentController.read);
routerComment.route('/comment/place/:id').get(commentController.readAllByPlaceId);
routerComment.route('/comment/create').post(commentController.create);
routerComment.route('/comment/delete/:id').delete(commentController.delete);