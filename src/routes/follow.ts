import express from "express";
import { FollowController } from "../controllers/FollowController";
import * as Auth from '../middleware/authenticate';

const followController = new FollowController();

export const routerFollow = express.Router({
    strict:true
});
/**
 * @swagger
 * tags:
 *   name: Follows
 *   description: API for managing follows
 * /follow:
 *   post:
 *     summary: Create a new follow
 *     tags: [Follows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user being followed
 *             required:
 *               - userId
 *     responses:
 *       201:
 *         description: Follow created
 *       400:
 *         description: Invalid request body
 * /unfollow:
 *   delete:
 *     summary: Delete a follow
 *     tags: [Follows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user to unfollow
 *             required:
 *               - userId
 *     responses:
 *       204:
 *         description: Follow deleted
 *       400:
 *         description: Invalid request body
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
routerFollow.route('/follow').post(Auth.authorize(['Utilisateur', 'Administrateur']), followController.create);
routerFollow.route('/unfollow').delete(Auth.authorize(['Utilisateur', 'Administrateur']), followController.delete);