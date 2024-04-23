import { Request, Response } from 'express';
import { perguntasNivelService } from '../service/containerConfig';


export class PerguntasNivelController {

    async getNivel(req: Request, res: Response): Promise<Response> {

        const nivelId = parseInt(req.params.id);

        const nivel = await perguntasNivelService.getNivelById(nivelId);

        return res.status(200).json(nivel);
    }

    async getAllNivel(req: Request, res: Response): Promise<Response> {

        const nivel = await perguntasNivelService.getAllNivel();

        return res.status(200).json(nivel);
    }
}