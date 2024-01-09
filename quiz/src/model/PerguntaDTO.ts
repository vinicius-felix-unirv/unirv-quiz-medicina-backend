import { perguntas } from '@prisma/client';

export interface IperguntasDTO {
  id?: number;
  conteudo: string;
  perguntasnivelid: number;
  tempo: number;
  pathimage: string;
  status: boolean;
  categoriasid: number;
}
export class PerguntaDTO {

  private id?: number;
  private conteudo: string | null;
  private perguntasnivelid: number;
  private tempo: number;
  private pathimage: string | null;
  private status: boolean;
  private categoriasid: number | null;

  constructor(data: IperguntasDTO | perguntas) {
    this.id = data.id;
    this.conteudo = data.conteudo;
    this.perguntasnivelid = data.perguntasnivelid;
    this.tempo = data.tempo;
    this.pathimage = data.pathimage;
    this.status = data.status;
    this.categoriasid = data.categoriasid;
  }

  getId(): number | undefined {
    return this.id;
  }

  getConteudo(): string | null {
    return this.conteudo;
  }

  getPerguntasNivelId(): number {
    return this.perguntasnivelid;
  }

  getTempo(): number {
    return this.tempo;
  }

  getPathImage(): string | null {
    return this.pathimage;
  }

  getStatus(): boolean {
    return this.status;
  }

  getCategoriasId(): number | null {
    return this.categoriasid;
  }

  setStatus(status: boolean): void {
    this.status = status;
  }
}