import { Request, Response } from 'express';
import { perguntaService } from '../service/containerConfig';
import { PerguntaDTO } from '../model/PerguntaDTO';

export class PerguntasController {

  async getPergunta(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    const pergunta = await perguntaService.getPerguntaById(id);

    return res.status(200).json(pergunta);

  }

  async getAllPerguntasByQuizId(req: Request, res: Response): Promise<Response> {

    const skip = parseInt(req.params.skip);
    const take = parseInt(req.params.take);
    const quizId = parseInt(req.params.id);
    const userId = parseInt(req.params.usuariosid);
    const categoriaId = parseInt(req.params.categoriasid);

    const perguntas = await perguntaService.getAllPerguntasByQuizIdAndCategoria(skip, take, quizId, userId, categoriaId);

    return res.status(200).json(perguntas);
  }

  async getAllPerguntasByQuizAvaliativoId(req: Request, res: Response): Promise<Response> {

    const skip = parseInt(req.params.skip);
    const take = parseInt(req.params.take);
    const quizAvaliativoId = parseInt(req.params.id);
    const userId = parseInt(req.params.usuariosid);
    const categoriaId = parseInt(req.params.categoriasid);

    const perguntas = await perguntaService.getAllPerguntasByQuizAvaliativoIdAndCategoria(skip, take, quizAvaliativoId, userId, categoriaId);

    return res.status(200).json(perguntas);
  }

  async postPergunta(req: Request, res: Response): Promise<Response> {

    const data = req.body;

    const pergunta = await perguntaService.savePergunta(new PerguntaDTO(data));

    return res.status(201).json(pergunta);
  }

  async putPergunta(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);
    const body = req.body;

    const updatedPergunta = await perguntaService.alterPergunta(id, new PerguntaDTO(body));

    return res.status(200).json(updatedPergunta);
  }

  async putStatusPergunta(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    const updatedPergunta = await perguntaService.alterStatusPergunta(id);

    return res.status(200).json(updatedPergunta);
  }
}