import express from "express";
import { PlaceController } from '../controllers/PlaceController';
import * as Auth from '../middleware/authenticate';

/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Place API
 *   description: API pour gérer les lieux
 *   version: 1.0.0
 * basePath: /
 * schemes:
 *   - http
 * consumes:
 *   - application/json
 * produces:
 *   - application/json
 * 
 * definitions:
 *   Place:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       history:
 *         type: string
 *       town:
 *         type: string
 *       is_active:
 *         type: boolean
 *       keyword:
 *         type: string
 *       categoriesId:
 *         type: integer
 *       accessibilitiesId:
 *         type: integer
 *       usersId:
 *         type: integer
 *       created_at:
 *         type: string
 *         format: date-time
 * 
 *   PlaceList:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Place'
 * 
 *   PlaceInput:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       history:
 *         type: string
 *       town:
 *         type: string
 *       keyword:
 *         type: string
 *       categoriesId:
 *         type: integer
 *       accessibilitiesId:
 *         type: integer
 * 
 *   PlaceUpdate:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       history:
 *         type: string
 *       town:
 *         type: string
 *       keyword:
 *         type: string
 *       categoriesId:
 *         type: integer
 *       accessibilitiesId:
 *         type: integer
 * 
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       code:
 *         type: integer
 * 
 *   Count:
 *     type: object
 *     properties:
 *       count:
 *         type: integer
 * 
 * parameters:
 *   id:
 *     name: id
 *     in: path
 *     description: L'ID du lieu
 *     required: true
 *     type: integer
 *   page:
 *     name: page
 *     in: query
 *     description: Le numéro de la page à récupérer
 *     required: false
 *     type: integer
 *     default: 1
 *   limit:
 *     name: limit
 *     in: query
 *     description: Le nombre d'éléments par page
 *     required: false
 *     type: integer
 *     default: 10
 * 
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 * 
 * paths:
 *   /place/show/{id}:
 *     get:
 *       tags:
 *         - Place
 *       description: Récupérer un lieu spécifique
 *       produces:
 *         - application/json
 *       parameters:
 *         - $ref: '#/parameters/id'
 *       responses:
 *         200:
 *           description: Le lieu a été récupéré avec succès
 *           schema:
 *             $ref: '#/definitions/Place'
 *         404:
 *           description: Le lieu n'a pas été trouvé
 *           schema:
 *             $ref: '#/definitions/Error'
 *   /place/listall:
 *     get:
 *       tags:
 *         - Place
 *       description: Récupérer tous les lieux
 *       produces:
 *         - application/json
 *       parameters:
 *         - $ref: '#/parameters/page'
 *         - $ref: '#/parameters/limit'
 *       responses:
 *         200:
 *           description: Les lieux ont été récupérés avec succès
 *           schema:
 *             $ref: '#/definitions/PlaceList'
 *         404:
 *           description: Aucun lieu n'a été trouvé
 */

const placeController = new PlaceController();

export const routerPlace = express.Router({
    strict:true
});

routerPlace.route('/place/show/:id').get(placeController.read);
routerPlace.route('/place/listall').get(placeController.listAll);
routerPlace.route('/place/count/:id').get(placeController.count);
routerPlace.route('/place/search').get(placeController.search);
routerPlace.route('/place/create').post(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.create);
routerPlace.route('/place/update/:id').put(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.update);
routerPlace.route('/place/delete/:id').delete(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.delete);