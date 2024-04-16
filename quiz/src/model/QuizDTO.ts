import { quiz } from '@prisma/client';

export interface IQuizDTO {

  id?: number;
  titulo: string;
  cursoid: number;
  imagem: string;
}

export class QuizDTO {

  private id?: number;
  private titulo: string;
  private cursoid: number;
  private imagem: string;

  constructor(data: IQuizDTO | quiz) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.cursoid = data.cursoid;
    this.imagem = data.imagem;
  }

  getId(): number | undefined { return this.id; }

  getTitulo(): string {
    return this.titulo;
  }

  getCursoId(): number { return this.cursoid; }

  getImagem(): string {
    return this.imagem;
  }
}