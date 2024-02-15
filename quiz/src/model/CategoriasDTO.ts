import { categorias } from '@prisma/client';

export interface IcategoriaDTO {

    id?: number;
    descricao: string;
    status: boolean;
}


export class CategoriasDTO{

  private id?: number;
  private descricao: string;
  private status: boolean;

  constructor(data: IcategoriaDTO | categorias) {
    this.id = data.id;
    this.descricao = data.descricao;
    this.status = data.status;
  }

  getId(): number | undefined { return this.id; }

  getDescricao(): string {
    return this.descricao;
  }

  getStatus(): boolean {
    return this.status;
  }

  setStatus(status: boolean): void {
    this.status = status;
  }
}