import { Service } from 'typedi';
import { QuizAvaliativoUsuariosDTO } from '../model/QuizAvaliativoUsuariosDTO';
import { quizAvaliativoService, usuarioService } from './containerConfig';
import { BadRequestError } from '../exception/BadRequestError';
import quizAvaliativoUsuariosRepository from '../repository/quizAvaliativoUsuariosRepository';
import { NotFoundError } from '../exception/NotFoundError';


@Service()
export class QuizAvaliativoUsuarioService {

    async checksScoreExists(quizId: number, usuarioId: number): Promise<void>{

        const scoreExists = await quizAvaliativoUsuariosRepository.getScore(quizId, usuarioId);

        if(scoreExists) throw new BadRequestError('Pontuacao ja existe');
    }

    async saveScore(data: QuizAvaliativoUsuariosDTO): Promise<QuizAvaliativoUsuariosDTO>{

        await Promise.all([
            quizAvaliativoService.checksQuizAvaliativoExistsById(data.getQuizAvaliativoId()),
            usuarioService.checksUsuarioExistsById(data.getUsuarioId()),
        
        ]);

        if(data.getPontuacao() < 0) throw new BadRequestError('A pontuacao nao pode ser negativa');

        await this.checksScoreExists(data.getQuizAvaliativoId(), data.getUsuarioId());

        const newScore = await quizAvaliativoUsuariosRepository.addingScoreQuizAvaliativo(data);

        return new QuizAvaliativoUsuariosDTO(newScore);
    }

    async getScoreById(id: number): Promise<QuizAvaliativoUsuariosDTO> {

        const scoreExists = await quizAvaliativoUsuariosRepository.getScoreById(id);

        if(!scoreExists) throw new NotFoundError('Pontuacao nao encontrada');

        return new QuizAvaliativoUsuariosDTO(scoreExists);
    }

    async getAllScoreByQuizAvaliativoId(quizid: number, skip: number, take: number): Promise<QuizAvaliativoUsuariosDTO[]> {

        await quizAvaliativoService.checksQuizAvaliativoExistsById(quizid);

        const scores = await quizAvaliativoUsuariosRepository.getManyScoreByQuizAvaliativoId(quizid, skip, take);

        return scores.map(score => new QuizAvaliativoUsuariosDTO(score));
    }
}