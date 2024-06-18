import { quiz_avaliativo_usuario } from '@prisma/client';

export interface IQuizAvaliativoUsuariosDTO{
    id?: number;
    quizid: number;
    usuarioid: number;
    pontuacao: number;
    horainicial: Date;
    horafinal: Date;
}
export class QuizAvaliativoUsuariosDTO {

    private id?: number;
    private quizid: number;
    private usuarioid: number;
    private pontuacao: number;
    private horainicial: Date;
    private horafinal: Date;

    constructor(data: quiz_avaliativo_usuario | IQuizAvaliativoUsuariosDTO){

        this.id = data.id;
        this.quizid = data.quizid;
        this.usuarioid = data.usuarioid;
        this.pontuacao = data.pontuacao;
        this.horainicial = data.horainicial;
        this.horafinal = data.horafinal;
    }

    getId(): number | undefined { return this.id; }
    getQuizId(): number { return this.quizid; }
    getUsuarioId(): number { return this.usuarioid; }
    getPontuacao(): number { return this.pontuacao; }
    getHoraInicial(): Date { return this.horainicial; }
    getHoraFinal(): Date { return this.horafinal; }
}