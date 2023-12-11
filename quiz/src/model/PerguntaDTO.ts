import { perguntas } from '@prisma/client';


export interface IperguntasDTO {
   id?: number;                  
   conteudo: string;
   nivel: number;
   tempo: number;
   pathimage: string;
   status: boolean; 
}
export class PerguntaDTO {

  private id?: number;                  
  private conteudo: string | null;
  private nivel: number;
  private tempo: number;
  private pathimage: string | null;
  private status: boolean; 

  constructor(data: IperguntasDTO | perguntas){
    this.id = data.id;
    this.conteudo = data.conteudo;
    this.nivel = data.nivel;
    this.tempo = data.tempo; 
    this.pathimage = data.pathimage;
    this.status = data.status;
  }

  getId(): number | undefined{
    return this.id;
  }

  getConteudo(): string | null{
    return this.conteudo;
  }

  getNivel(): number {
    return this.nivel;
  }

  getTempo(): number {
    return this.tempo;
  }

  getPathImage(): string | null{
    return this.pathimage;
  }

  getStatus(): boolean {
    return this.status;
  }
}