import express from 'express';
import { CommentController } from '../controllers/CommentController';
import * as Auth from '../middleware/authenticate';

const commentController = new CommentController();

export const routerComment = express.Router({
    strict:true
});
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments
 * /comment/show/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Comment not found
 * /comment/place/{id}:
 *   get:
 *     summary: Get all comments for a place by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the place to retrieve comments for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Place not found
 * /comment/create:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment to create
 *               usersId:
 *                 type: integer
 *                 description: The ID of the user creating the comment
 *               placesId:
 *                 type: integer
 *                 description: The ID of the place the comment is for
 *             required:
 *               - comment
 *               - usersId
 *               - placesId
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Invalid request body
 * /comment/delete/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
routerComment.route('/comment/show/:id').get(commentController.read);
routerComment.route('/comment/place/:id').get(commentController.readAllByPlaceId);
routerComment.route('/comment/create').post(Auth.authorize(['Utilisateur', 'Administrateur']), commentController.create);
routerComment.route('/comment/delete/:id').delete(Auth.authorize(['Utilisateur', 'Administrateur']), commentController.delete);