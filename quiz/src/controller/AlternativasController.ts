
import { Request, Response } from 'express';
import { alternativasService } from '../service/containerConfig';
import {  AllAlternativasDTO, AlternativasDTO } from '../model/AlternativasDTO';


export class AlternativasController{

    async postAlternativa(req: Request, res: Response): Promise<Response>{

        const body = req.body;

        const alternativa = await alternativasService.saveAlternativa(new AlternativasDTO(body));

        return res.status(201).json(alternativa);
    }

    async postAllAlternativa(req: Request, res: Response): Promise<Response>{

        const body = req.body;

        const alternativa = await alternativasService.saveManyAlternativas(new AllAlternativasDTO(body));

        return res.status(201).json(alternativa);
    }

    async getAllAlternativasByPerguntaId(req: Request, res: Response): Promise<Response>{

        const perguntaId = parseInt(req.params.id);

        const allAlternativas = await alternativasService.getAllAlternativasByPerguntaId(perguntaId);

        return res.status(200).json(allAlternativas);
    }

    async updateAlternativa(req: Request, res: Response): Promise<Response> {

        const alternativaId = parseInt(req.params.id);
        const body = req.body;

        const updateAlternativa = await alternativasService.updateAlternativa(alternativaId, new AlternativasDTO(body));

        return res.status(200).json(updateAlternativa);
    }

    async deleteAlternativa(req: Request, res: Response): Promise<Response> {

        const alternativaId = parseInt(req.params.id);

        await alternativasService.deleteAlternativa(alternativaId);

        return res.status(200).json({message: 'Alternativa deleted successfully'});
    }
}