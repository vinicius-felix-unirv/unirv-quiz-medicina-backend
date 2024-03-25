import { categorias } from '@prisma/client';
import { containsNull, objectContainsAllAttributes } from './objectUtils';

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

    const requiredAttributes = ['descricao', 'status'];

    if (!objectContainsAllAttributes(data, requiredAttributes) || containsNull(data)) {
      throw new Error('Todos os atributos devem ser fornecidos e não podem ser nulos');
    }

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