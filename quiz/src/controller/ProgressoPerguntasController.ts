import { Request, Response } from 'express';
import { progressoPerguntasService } from '../service/containerConfig';
import { AllProgressoPerguntasDTO, ProgressoPerguntasDTO } from '../model/ProgressoPerguntasDTO';


export class ProgressoPerguntasController{

  async postProgressoPerg(req: Request, res: Response): Promise<Response>{
        
    const body = req.body;

    const progressoPerg = await progressoPerguntasService.createProgressoPerg(new ProgressoPerguntasDTO(body));

    return res.status(201).json(progressoPerg);
  }

  async postManyProgressoPerguntas(req: Request, res: Response): Promise<Response>{

    const body = req.body;

    const progressoPerguntas = await progressoPerguntasService.createManyProgressoPergunta(new AllProgressoPerguntasDTO(body));

    return res.status(201).json(progressoPerguntas);

  }

  async getAllProgressoPergByUsuario(req: Request, res: Response): Promise<Response>{

    const usuarioId = parseInt(req.params.id);

    const progressoPerg = await progressoPerguntasService.getAllProgressoPergByUsuario(usuarioId);

    return res.status(200).json(progressoPerg);
  }
}