import { Request, Response } from 'express';
import { quizService } from '../service/containerConfig';
import { QuizDTO } from '../model/QuizDTO';

export class QuizController {

  async postQuiz(req: Request, res: Response): Promise<Response> {

    const body = req.body;

    const createdQuiz = await quizService.saveQuiz(new QuizDTO(body));

    return res.status(201).json(createdQuiz);

  }

  async putQuiz(req: Request, res: Response): Promise<Response> {

    const quizId = parseInt(req.params.quizid);
    const cursoId = parseInt(req.params.cursoid);
    const body = req.body;

    const updatedQuiz = await quizService.updateQuiz(quizId, new QuizDTO(body), cursoId);

    return res.status(200).json(updatedQuiz);
  }

  async getAllquiz(req: Request, res: Response): Promise<Response> {

    const skip = parseInt(req.params.skip);
    const take = parseInt(req.params.take);

    const quizDTOs = await quizService.getAllQuiz(skip, take);

    return res.status(200).json(quizDTOs);
  }

  async getAllquizByCursoId(req: Request, res: Response): Promise<Response> {

    const skip = parseInt(req.params.skip);
    const take = parseInt(req.params.take);
    const cursoId = parseInt(req.params.id);

    const quizDTOs = await quizService.getAllQuizByCurosId(skip, take, cursoId);

    return res.status(200).json(quizDTOs);
  }

  async getQuizId(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    const Quiz = await quizService.getQuizById(id);

    return res.status(200).json(Quiz);
  }
}