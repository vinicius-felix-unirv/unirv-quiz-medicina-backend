import { categorias } from '@prisma/client';

export interface IcategoriaDTO {

    id?: number;
    descricao: string;
    status: boolean;
    imagem: string;
    cursoId: number;
}


export class CategoriasDTO{

  private id?: number;
  private descricao: string;
  private status: boolean;
  private imagem: string;
  private cursoId: number;

  constructor(data: IcategoriaDTO | categorias) {

    this.id = data.id;
    this.descricao = data.descricao;
    this.status = data.status;
    this.imagem = data.imagem;
    this.cursoId = data.cursoId;
  }

  getId(): number | undefined { return this.id; }

  getDescricao(): string {
    return this.descricao;
  }

  getStatus(): boolean {
    return this.status;
  }

  getImagem(): string {
    return this.imagem;
  }

  getCursoId(): number {
    return this.cursoId;
  }

  setStatus(status: boolean): void {
    this.status = status;
  }
}