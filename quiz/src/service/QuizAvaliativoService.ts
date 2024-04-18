import { quiz_avaliativo } from '@prisma/client';
import { QuizAvaliativoDTO } from '../model/QuizAvaliativoDTO';
import quizAvaliativoRepository from '../repository/quizAvaliativoRepository';
import { cursoService, usuarioService } from './containerConfig';
import { NotFoundError } from '../exception/NotFoundError';
import { Service } from 'typedi';

@Service()
export class QuizAvaliativoService {

    async checksQuizAvaliativoExistsById(id: number): Promise<quiz_avaliativo> {

        const quizExists = await quizAvaliativoRepository.getQuizAvaliativoById(id);

        if(!quizExists) throw new NotFoundError('Quiz nao encontrado');

        return quizExists;
    }
    async createQuizAvaliativo(quiz: QuizAvaliativoDTO): Promise<QuizAvaliativoDTO> {

        await Promise.all([
            usuarioService.checksUsuarioExistsById(quiz.getUsuariosId()),
            cursoService.checksCursoExistsById(quiz.getCursoId())
        ]);

        const newQuiz = await quizAvaliativoRepository.createQuizAvaliativo(quiz);

        return new QuizAvaliativoDTO(newQuiz);
    }

    async getQuizAvaliativoById(id: number): Promise<QuizAvaliativoDTO> {

        const quiz = await this.checksQuizAvaliativoExistsById(id); 

        return new QuizAvaliativoDTO(quiz);
    }

    async getAllQuizAvaliativoByUsuarioId(usuarioId: number): Promise<QuizAvaliativoDTO[]> {

        await usuarioService.checksUsuarioExistsById(usuarioId);

        const quizList = await quizAvaliativoRepository.getAllQuizAvaliativoByUserId(usuarioId);

        return quizList.map(q => new QuizAvaliativoDTO(q));
    }

    async updateQuizAvaliativo(id: number, quiz: QuizAvaliativoDTO): Promise<QuizAvaliativoDTO> {

        await this.checksQuizAvaliativoExistsById(id);

        const updatedQuiz = await quizAvaliativoRepository.alterQuizAvaliativo(id, quiz);

        return new QuizAvaliativoDTO(updatedQuiz);
    }

    async updateStatusQuizAvaliativo(id: number){

        const quizExists = await this.checksQuizAvaliativoExistsById(id);

        const quiz = new QuizAvaliativoDTO(quizExists);

        quiz.setStatus(!quiz.getStatus());

        const updatedQuiz = await quizAvaliativoRepository.alterStatusQuizAvaliativo(id, quiz);

        return new QuizAvaliativoDTO(updatedQuiz);
    }

}