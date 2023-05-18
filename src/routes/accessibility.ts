import express from "express";
import { AccessibilityController } from "../controllers/AccessibilityController";

const accessibilityController = new AccessibilityController();

export const routerAccessibility = express.Router({
    strict:true
});
/**
 * @swagger
 * tags:
 *   name: Accessibilities
 *   description: API for managing accessibilities
 * /accessibility/listall:
 *   get:
 *     summary: Get a list of all accessibilities
 *     tags: [Accessibilities]
 *     responses:
 *       200:
 *         description: A list of accessibilities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the accessibility
 *                   label:
 *                     type: string
 *                     description: The label of the accessibility
 */
routerAccessibility.route('/accessibility/listall').get(accessibilityController.listAll);