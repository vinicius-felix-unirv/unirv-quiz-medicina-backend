
export interface IcategoriaDTO {

    descricao: string;
    status: boolean;
}


export class CategoriasDTO{

  private descricao: string;
  private status: boolean;

  constructor(descricao: string, status: boolean){
    this.descricao = descricao;
    this.status = status;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getStatus(): boolean {
    return this.status;
  }
}