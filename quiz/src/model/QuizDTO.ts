import { quiz } from '@prisma/client';

export interface IQuizDTO {

  id?: number;
  titulo: string;
  cursoid: number;
  imagem: string;
  status: boolean;
  avaliativo: boolean;
  usuarioid: number;
}

export class QuizDTO {

  private id?: number;
  private titulo: string;
  private cursoid: number;
  private imagem: string;
  private status: boolean; 
  private avaliativo: boolean; 
  private usuarioid: number;

  constructor(data: IQuizDTO | quiz) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.cursoid = data.cursoid;
    this.imagem = data.imagem;
    this.status = data.status;
    this.avaliativo = data.avaliativo;
    this.usuarioid = data.usuarioid;
  }

  getId(): number | undefined { return this.id; }

  getTitulo(): string { return this.titulo; }

  getCursoId(): number { return this.cursoid; }

  getImagem(): string { return this.imagem; }

  getStatus(): boolean { return this.status; }

  getAvaliativo(): boolean { return this.avaliativo; }

  getUsuarioId(): number { return this.usuarioid; }

  setStatus(status: boolean): void { this.status = status; }
}