import { Request, Response } from 'express';
import { perguntasNivelService } from '../service/containerConfig';
import { PerguntasNivelDTO } from '../model/PerguntasNivelDTO';


export class PerguntasNivelController{

  async postPerguntasNivel(req: Request, res: Response){
        
    const body = req.body;

    const perguntaNivel = await perguntasNivelService.createPerguntNivel(new PerguntasNivelDTO(body));

    return res.status(200).json(perguntaNivel);
  }
}