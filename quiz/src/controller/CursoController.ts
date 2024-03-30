import { Response, Request } from 'express';
import { cursoService } from '../service/containerConfig';


export class CursoController{

    async getAllCurso(req: Request, res: Response): Promise<Response> {

        const allCurso = await cursoService.getAllCurso();

        return res.status(200).json(allCurso);
    }
}