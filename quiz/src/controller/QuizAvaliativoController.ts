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

    async getAllQuizAvaliativosByUsuarioAndCurso(req: Request, res: Response): Promise<Response> {

        const usuarioId = parseInt(req.params.usuarioid);
        const cursoId = parseInt(req.params.cursoid);
        const skip = parseInt(req.params.skip);
        const take = parseInt(req.params.take);

        const quizList = await quizAvaliativoService.getAllQuizAvaliativoByUsuarioAndCurso(usuarioId, cursoId, skip, take);

        return res.status(200).json(quizList);
    }

    async getAllQuizAvaliativosByCurso(req: Request, res: Response): Promise<Response> {

        const cursoId = parseInt(req.params.cursoid);
        const skip = parseInt(req.params.skip);
        const take = parseInt(req.params.take);

        const quizList = await quizAvaliativoService.getAllQuizAvaliativoByCurso(cursoId, skip, take);

        return res.status(200).json(quizList);
    }

    async putQuizAvaliativo(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id);

        const body = req.body;

        const updatedQuiz = await quizAvaliativoService.updateQuizAvaliativo(id, new QuizAvaliativoDTO(body));

        return res.status(200).json(updatedQuiz);
    }

    async putStatusQuizAvaliativo(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id);

        const updatedQuiz = await quizAvaliativoService.updateStatusQuizAvaliativo(id);

        return res.status(200).json(updatedQuiz);
    }
}