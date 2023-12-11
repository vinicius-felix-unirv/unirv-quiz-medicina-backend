import { Request, Response } from 'express';
import { perguntaService } from '../service/containerConfig';
import { PerguntaDTO } from '../model/PerguntaDTO';

export class PerguntasController{

  async postPergunta(req: Request, res: Response){
    
    const data = req.body;

    const pergunta = await perguntaService.savePergunta(new PerguntaDTO(data));

    return res.status(201).json(pergunta);
  }
}