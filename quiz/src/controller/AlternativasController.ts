
import { Request, Response } from 'express';
import { alternativasService } from '../service/containerConfig';
import { AlternativasDTO } from '../model/AlternativasDTO';


export class AlternativasController{

    async postAlternativa(req: Request, res: Response): Promise<Response>{

        const body = req.body;

        const alternativa = await alternativasService.saveAlternativa(new AlternativasDTO(body));

        return res.status(201).json(alternativa);
    }
}