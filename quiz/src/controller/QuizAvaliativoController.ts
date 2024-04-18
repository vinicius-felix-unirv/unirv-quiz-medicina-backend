import { Request, Response } from 'express';
import { QuizAvaliativoDTO } from '../model/QuizAvaliativoDTO';
import { quizAvaliativoService } from '../service/containerConfig';

export class QuizAvaliativoController {

    async postQuizAvaliativo(req: Request, res: Response): Promise<Response> {
        
        const body = req.body;

        const newQuiz = await quizAvaliativoService.createQuizAvaliativo(new QuizAvaliativoDTO(body));

        return res.status(201).json(newQuiz);
    }

    async getQuizAvaliativo(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id);

        const quiz = await quizAvaliativoService.getQuizAvaliativoById(id);

        return res.status(200).json(quiz);
    }

    async getAllQuizAvaliativos(req: Request, res: Response): Promise<Response> {

        const usuarioId = parseInt(req.params.id);

        const quizList = await quizAvaliativoService.getAllQuizAvaliativoByUsuarioId(usuarioId);

        return res.status(200).json(quizList);
    }

    async putQuizAvaliativo(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id);

        const body = req.body;

        const updatedQuiz = await quizAvaliativoService.updateQuizAvaliativo(id, body);

        return res.status(200).json(updatedQuiz);
    }

    async putStatusQuizAvaliativo(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id);

        const updatedQuiz = await quizAvaliativoService.updateStatusQuizAvaliativo(id);

        return res.status(200).json(updatedQuiz);
    }
}