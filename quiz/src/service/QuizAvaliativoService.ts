import { quiz_avaliativo } from '@prisma/client';
import { QuizAvaliativoDTO } from '../model/QuizAvaliativoDTO';
import quizAvaliativoRepository from '../repository/quizAvaliativoRepository';
import { cursoService, usuarioService } from './containerConfig';
import { NotFoundError } from '../exception/NotFoundError';
import { Service } from 'typedi';
import { BadRequestError } from '../exception/BadRequestError';

@Service()
export class QuizAvaliativoService {

    async checksQuizAvaliativoExistsById(id: number): Promise<quiz_avaliativo>{

        const quizExists = await quizAvaliativoRepository.getQuizAvaliativoById(id);

        if(!quizExists) throw new NotFoundError('Quiz-avaliativo nao encontrado');

        return quizExists;
    }

    async checksQuizAvaliativoExistsByTituloAndCurso(titulo: string, cursoId: number): Promise<void> {

        const quizExists = await quizAvaliativoRepository.getQuizAvaliativoByTituloAndCursoId(titulo, cursoId);

        if(quizExists) throw new BadRequestError('Quiz-Avaliativo ja existe');
    }

    async createQuizAvaliativo(quiz: QuizAvaliativoDTO): Promise<QuizAvaliativoDTO> {

        await Promise.all([
            usuarioService.checksUsuarioExistsById(quiz.getUsuariosId()),
            cursoService.checksCursoExistsById(quiz.getCursoId()),
            this.checksQuizAvaliativoExistsByTituloAndCurso(quiz.getTitulo(), quiz.getCursoId())
        ]);

        const newQuiz = await quizAvaliativoRepository.createQuizAvaliativo(quiz);

        return new QuizAvaliativoDTO(newQuiz);
    }

    async getQuizAvaliativoById(id: number): Promise<QuizAvaliativoDTO> {

        const quiz = await this.checksQuizAvaliativoExistsById(id); 

        return new QuizAvaliativoDTO(quiz);
    }

    async getAllQuizAvaliativoByUsuarioAndCurso(usuarioId: number, cursoId: number, skip: number, take: number): Promise<QuizAvaliativoDTO[]> {

        await Promise.all([
            usuarioService.checksUsuarioExistsById(usuarioId),
            cursoService.checksCursoExistsById(cursoId)
        ]);

        const quizList = await quizAvaliativoRepository.getAllQuizAvaliativoByUsuarioAndCurso(usuarioId, cursoId, skip, take);

        return quizList.map(q => new QuizAvaliativoDTO(q));
    }

    async getAllQuizAvaliativoByCurso(cursoId: number, skip: number, take: number): Promise<QuizAvaliativoDTO[]> {

        await cursoService.checksCursoExistsById(cursoId);

        const quizList = await quizAvaliativoRepository.getAllQuizAvaliativoByCursoId(cursoId, skip, take);

        return quizList.map(q => new QuizAvaliativoDTO(q));
    }

    async updateQuizAvaliativo(id: number, quiz: QuizAvaliativoDTO): Promise<QuizAvaliativoDTO> {

        const quizExists = await this.checksQuizAvaliativoExistsById(id);

        const quizByTitulo = await quizAvaliativoRepository.getQuizAvaliativoByTituloAndCursoId(quiz.getTitulo(), quizExists.cursoid);

        if(quizByTitulo && id != quizByTitulo.id) throw new BadRequestError('Quiz-Avaliativo ja existe');     

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