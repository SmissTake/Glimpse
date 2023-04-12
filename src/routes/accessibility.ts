import express from "express";
import { AccessibilityController } from "../controllers/AccessibilityController";

const accessibilityController = new AccessibilityController();

export const routerAccessibility = express.Router({
    strict:true
});

routerAccessibility.route('/accessibility/listall').get(accessibilityController.listAll);