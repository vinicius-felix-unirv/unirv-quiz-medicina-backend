import { perguntas, quiz } from '@prisma/client';

export class IQuizDTO {

  id: number = 0;
  titulo: string = '';
  perguntas: perguntaObject[] = [];

  constructor(data: quiz) {
    this.id = data.id;
    this.titulo = data.titulo;
  }

  setId(_id: number) {
    this.id = _id;
  }
  setTitulo(_titulo: string) {
    this.titulo = _titulo;
  }
  setPerguntas(_perguntas: perguntaObject) {
    this.perguntas.push(_perguntas);
  }
}

class perguntaObject {

  id!: number;
  conteudo!: string | null;
  perguntasnivelid!: number;
  tempo!: number;
  pathimage!: string | null;
  status!: boolean;
  categoriasid!: number | null;
  quizid!: number | null;

  constructor(_pergunta: perguntas) {
    this.id = _pergunta.id;
    this.conteudo = _pergunta.conteudo;
    this.perguntasnivelid = _pergunta.perguntasnivelid;
    this.tempo = _pergunta.tempo;
    this.pathimage = _pergunta.pathimage;
    this.status = _pergunta.status;
    this.categoriasid = _pergunta.categoriasid;
    this.quizid = _pergunta.quizid;
  }
}


export class QuizDTO {

  private id?: number;
  private titulo!: string;

  constructor(data: IQuizDTO | quiz) {
    this.id = data.id;
    this.titulo = data.titulo;
  }

  getId(): number | undefined { return this.id; }

  getTitulo(): string {
    return this.titulo;
  }
}