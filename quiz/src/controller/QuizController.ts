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

    const id = parseInt(req.params.id);
    const body = req.body;

    const updatedQuiz = await quizService.updateQuiz(id, new QuizDTO(body));

    return res.status(200).json(updatedQuiz);

  }

  async getAllquiz(req: Request, res: Response): Promise<Response> {

    const quizDTOs = await quizService.getAllQuiz();

    return res.status(200).json(quizDTOs);
  }

  async getQuizId(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    const Quiz = await quizService.getQuizById(id);

    return res.status(200).json(Quiz);
  }
}