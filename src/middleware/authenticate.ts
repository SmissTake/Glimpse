import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../authenticate/jwt';
import status, { UNAUTHORIZED } from 'http-status';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let jwt = req.headers.authorization;

        // verify request has token
        if (!jwt) {
            return res.status(status.UNAUTHORIZED).json({ message: 'Invalid token ' });
        }

        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }
        console.log('avant validate', jwt);

        if (!jwt) {
            return res.status(status.UNAUTHORIZED).json({ message: 'Invalid token ' });
        }

        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }
        console.log('avant validate', jwt);

        // verify token hasn't expired yet and is valid
        const decodedToken = await validateToken(jwt);
        /* const decodedToken = {
         name: 'partenaire1',
         userId: 123,
         // Les accès à l'API que l'on souhaite ouvrir à ce partenaire
         accessTypes: [
         'getRecipeList',
         'updateRecipe',
         'addRecipe'
         ]
        };
        */
        console.log('apres valideToken', jwt);
        const hasAccessToEndpoint = allowedAccessTypes.some(
            (at) => decodedToken.accessTypes.some((uat) => uat === at)
        );

        if (!hasAccessToEndpoint) {
            return res.status(UNAUTHORIZED).json({ message: 'No enough privileges to access endpoint' });
        }

        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            res.status(UNAUTHORIZED).json({ message: 'Expired token' });
            return;
        }

        res.status(status.UNAUTHORIZED).json({ message: 'Failed to authenticate user' });
    }
};