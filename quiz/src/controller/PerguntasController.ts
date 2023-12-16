import { Request, Response } from 'express';
import { perguntaService } from '../service/containerConfig';
import { PerguntaDTO } from '../model/PerguntaDTO';

export class PerguntasController{

  async getPergunta(req: Request, res: Response){

    const id = parseInt(req.params.id);

    const pergunta = await perguntaService.getPergunta(id);

    return res.status(200).json(pergunta);

  }

  async getAllPergunta(req: Request, res: Response){

    const perguntas = await perguntaService.getAllPerguntas();

    return res.status(200).json(perguntas);
  }

  async postPergunta(req: Request, res: Response){
    
    const data = req.body;

    const pergunta = await perguntaService.savePergunta(new PerguntaDTO(data));

    return res.status(201).json(pergunta);
  }

  async putPergunta(req: Request, res: Response){

    const id = parseInt(req.params.id);
    const body = req.body;

    const updatedPergunta = await perguntaService.alterPergunta(id, new PerguntaDTO(body));

    return res.status(200).json(updatedPergunta);

  }

  async putStatusPergunta(req: Request, res: Response){

    const id = parseInt(req.params.id);

    const updatedPergunta = await perguntaService.alterStatusPergunta(id);

    return res.status(200).json(updatedPergunta);

  }
}