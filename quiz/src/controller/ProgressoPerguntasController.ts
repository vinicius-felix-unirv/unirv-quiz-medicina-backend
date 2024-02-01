import { Request, Response } from 'express';
import { progressoPerguntasService } from '../service/containerConfig';
import { ProgressoPerguntasDTO } from '../model/ProgressoPerguntasDTO';


export class ProgressoPerguntasController{

  async postProgressoPerg(req: Request, res: Response): Promise<Response>{
        
    const body = req.body;

    const progressoPerg = await progressoPerguntasService.createProgressoPerg(new ProgressoPerguntasDTO(body));

    return res.status(200).json(progressoPerg);
  }

  async getAllProgressoPergByUsuario(req: Request, res: Response): Promise<Response>{

    const usuarioId = parseInt(req.params.id);

    const progressoPerg = await progressoPerguntasService.getAllProgressoPergByUsuario(usuarioId);

    return res.status(200).json(progressoPerg);
  }
}