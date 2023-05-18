import express from "express";
import { UserController } from '../controllers/UserController';
import * as Auth from '../middleware/authenticate';

const userController = new UserController();

export const routerUser = express.Router({
    strict:true
});
/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - pseudonym
 *         - mail
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the user
 *         pseudonym:
 *           type: string
 *           description: Username of the user
 *         mail:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user (not returned in responses)
 *         biography:
 *           type: string
 *           description: Biography of the user
 *         avatar:
 *           type: string
 *           description: URL of the user's avatar image
 *       example:
 *         id: 1
 *         pseudonym: "johndoe"
 *         mail: "johndoe@example.com"
 *         biography: "I'm a software developer"
 *         avatar: "https://example.com/avatar.png"
 * 
 * /user/show/{id}:
 *   get:
 *     summary: Get all information about a user by ID except password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns all information about the user except password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 * 
 * /user/update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 * 
 * /user/listall:
 *   get:
 *     summary: Get ID, username, and avatar of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns an array of all users with their ID, username, and avatar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found
 * 
 * /user/search:
 *   get:
 *     summary: Search for users by username or biography
 *     tags: [User]
 *     requestBody:
 *       description: Search parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: Search query string
 *               limit:
 *                 type: integer
 *                 description: Maximum number of results to return
 *               offset:
 *                 type: integer
 *                 description: Number of results to skip
 *             required:
 *               - query
 *     responses:
 *       200:
 *         description: Returns an array of users matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid limit or offset value, or no query
 *       404:
 *         description: No users found
 */
routerUser.route('/user/show/:id').get(userController.read);
routerUser.route('/user/listall').get(userController.listAll);
routerUser.route('/user/search').get(userController.search);
routerUser.route('/user/update/:id').put(Auth.authorize(['Utilisateur', 'Administrateur']), userController.update);