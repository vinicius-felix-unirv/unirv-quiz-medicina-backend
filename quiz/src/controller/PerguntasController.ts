import { Request, Response } from 'express';
import { perguntaService } from '../service/containerConfig';
import { PerguntaDTO } from '../model/PerguntaDTO';

export class PerguntasController{

  async postPergunta(req: Request, res: Response){
    
    const data = req.body;

    const pergunta = await perguntaService.savePergunta(new PerguntaDTO(data));

    return res.status(201).json(pergunta);
  }

  async putPergunta(req: Request, res: Response){

    try{

      const id = parseInt(req.params.id);
      const body = req.body;

      const updatedPergunta = await perguntaService.alterPergunta(id, new PerguntaDTO(body));

      return res.status(200).json(updatedPergunta);

    }catch(err) {
      return res.status(500).json({message: 'Internal Server Error'});
    }

  }
}