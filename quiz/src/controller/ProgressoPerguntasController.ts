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

  async getProgressoByQuiz(req: Request, res: Response): Promise<Response>{

    const usuarioId = parseInt(req.params.usuarioid);
    const quizId = parseInt(req.params.quizid);

    const progressoPerg = await progressoPerguntasService.getProgressoPerguntasByQuizIdAndUsuarioId(quizId, usuarioId);

    return res.status(200).json(progressoPerg);
  }
}