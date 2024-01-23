import { Request, Response } from 'express';
import { perguntasNivelService } from '../service/containerConfig';
import { PerguntasNivelDTO } from '../model/PerguntasNivelDTO';


export class PerguntasNivelController{

  async postPerguntasNivel(req: Request, res: Response){
        
    const body = req.body;

    const perguntaNivel = await perguntasNivelService.createPerguntNivel(new PerguntasNivelDTO(body));

    return res.status(201).json(perguntaNivel);
  }

  async getPerguntaNivelById(req: Request, res: Response){

    const id = parseInt(req.params.id);

    const perguntaNivel = await perguntasNivelService.getPerguntasNivelById(id);

    return res.status(200).json(perguntaNivel);
  }

  async getAllPerguntaNivel(req: Request, res: Response){

    const perguntaNivel = await perguntasNivelService.getAllPerguntasNivel();

    return res.status(200).json(perguntaNivel);
  }

  async putPerguntasNivel(req: Request, res: Response){

    const id = parseInt(req.params.id);
    const body = req.body;

    const updatedPerguntasNivel = await perguntasNivelService.updatePerguntasNivel(id, new PerguntasNivelDTO(body));

    return res.status(200).json(updatedPerguntasNivel);
  }
}