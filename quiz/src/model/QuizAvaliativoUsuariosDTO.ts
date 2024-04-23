import { quiz_avaliativo_usuario } from '@prisma/client';

export interface IQuizAvaliativoUsuariosDTO{
    id?: number;
    quizavaliativoid: number;
    usuarioid: number;
    pontuacao: number;
    horainicial: Date;
    horafinal: Date;
}
export class QuizAvaliativoUsuariosDTO {

    private id?: number;
    private quizavaliativoid: number;
    private usuarioid: number;
    private pontuacao: number;
    private horainicial: Date;
    private horafinal: Date;

    constructor(data: quiz_avaliativo_usuario | IQuizAvaliativoUsuariosDTO){

        this.id = data.id;
        this.quizavaliativoid = data.quizavaliativoid;
        this.usuarioid = data.usuarioid;
        this.pontuacao = data.pontuacao;
        this.horainicial = data.horainicial;
        this.horafinal = data.horafinal;
    }

    getId(): number | undefined { return this.id; }
    getQuizAvaliativoId(): number { return this.quizavaliativoid; }
    getUsuarioId(): number { return this.usuarioid; }
    getPontuacao(): number { return this.pontuacao; }
    getHoraInicial(): Date { return this.horainicial; }
    getHoraFinal(): Date { return this.horafinal; }
}