import { Request, Response } from 'express';
import { AuthenticationService } from '../service/CreateSessionService';

export class AuthenticationController {

  async createSession(req: Request, res: Response): Promise<Response> {

    const { email, senha } = req.body;

    const creationSession = new AuthenticationService();

    const user = await creationSession.createSession({
      email,
      senha
    });

    return res.status(200).json({ token: user.token, id: user.id, role: user.role });
  }
}