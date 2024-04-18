import { quiz_avaliativo } from '@prisma/client';

export interface IQuizAvaliativoDTO {
    id?: number;
    titulo: string;      
    imagem: string;      
    status: boolean;     
    usuarioid: number;
    cursoid: number;
}

export class QuizAvaliativoDTO {

    private id?: number;
    private titulo: string;      
    private imagem: string;      
    private status: boolean;     
    private usuarioid: number;
    private cursoid: number;

    constructor(data: IQuizAvaliativoDTO | quiz_avaliativo){
        this.id = data.id;
        this.titulo = data.titulo;
        this.imagem = data.imagem;
        this.status = data.status;
        this.usuarioid = data.usuarioid;
        this.cursoid = data.cursoid;
    }

    getId(): number | undefined { return this.id; }
    getTitulo(): string { return this.titulo; }
    getImagem(): string { return this.imagem; }
    getStatus(): boolean { return this.status; }
    getUsuariosId(): number { return this.usuarioid; }
    getCursoId(): number { return this.cursoid; }

    setStatus(status: boolean): void { this.status = status; }
    
}