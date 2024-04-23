import { Response, Request } from 'express';
import { quizAvaliativoUsuarioService } from '../service/containerConfig';
import { QuizAvaliativoUsuariosDTO } from '../model/QuizAvaliativoUsuariosDTO';


export class QuizAvaliativoUsuarioController {

    async postScore(req: Request, res: Response): Promise<Response> {

        const body = req.body;

        const newScore = await quizAvaliativoUsuarioService.saveScore(new QuizAvaliativoUsuariosDTO(body));

        return res.status(201).json(newScore);
    }

    async getQuizScore(req: Request, res: Response): Promise<Response> {

        const quizId = parseInt(req.params.id);

        const score = await quizAvaliativoUsuarioService.getScoreById(quizId);

        return res.status(200).json(score);
    }

    async getAllQuizScore(req: Request, res: Response): Promise<Response> {

        const quizId = parseInt(req.params.id); 
        const skip = parseInt(req.params.skip); 
        const take = parseInt(req.params.take);
        
        const scores = await quizAvaliativoUsuarioService.getAllScoreByQuizAvaliativoId(quizId, skip, take);

        return res.status(200).json(scores);
    }
}