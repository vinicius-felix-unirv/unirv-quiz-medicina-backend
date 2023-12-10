
// export interface IcategoriaDTO {

//     descricao: string;
//     status: boolean;
// }


export class CategoriasDTO{

  private id?: number;
  private descricao: string;
  private status: boolean;

  constructor(descricao: string, status: boolean, id?: number) {
    this.id = id;
    this.descricao = descricao;
    this.status = status;
  }

  getId(): number | undefined { return this.id; }

  getDescricao(): string {
    return this.descricao;
  }

  getStatus(): boolean {
    return this.status;
  }
}