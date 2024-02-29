import { progressoperguntas } from '@prisma/client';

export interface IProgressoPerguntasDTO{

   id?: number;
   usuariosid: number;
   perguntasid: number;

}

export class ProgressoPerguntasDTO{

  private id?: number;
  private usuariosid: number;
  private perguntasid: number;

  constructor(data: IProgressoPerguntasDTO | progressoperguntas){

    this.id = data.id;
    this.usuariosid = data.usuariosid;
    this.perguntasid = data.perguntasid;
  }



  getId(): number | undefined { return this.id; }

  getUsuariosId(): number { return this.usuariosid; }

  getPerguntasId(): number { return this.perguntasid; }

}

export class AllProgressoPerguntasDTO{

  public progressoPerguntas: ProgressoPerguntasDTO[] = [];

  constructor(data: {
          usuariosid: number,
          perguntasid: number,
      }[]){

        this.progressoPerguntas = data.map(x => new ProgressoPerguntasDTO(x));
  }
}