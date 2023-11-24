import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req['user'] = decoded; // Attach user information to the request
      } catch (error) {
        // Handle token verification failure
        console.error('Token verification failed:', error);
      }
    }

    next();
  }
}
