import { alternativas } from '@prisma/client';

export interface IAllAlternativasDTO{
    
    alternativas: IAlternativasDTO[];
}
export interface IAlternativasDTO{

    id?: number,
    perguntasid: number,
    resposta: string,
    pathimage: string,
    correta: boolean,

}

export class AlternativasDTO{

    private id?: number;          
    private perguntasid: number | null; 
    private resposta: string | null;    
    private pathimage: string | null;
    private correta: boolean;  

    constructor(data: alternativas | IAlternativasDTO){

        this.id = data.id;
        this.perguntasid = data.perguntasid;
        this.resposta = data.resposta;
        this.pathimage = data.pathimage;
        this.correta = data.correta;
    }

    getId(): number | undefined { return this.id; }

    getPerguntasId(): number | null { return this.perguntasid; }

    getResposta(): string | null { return this.resposta; }

    getPathImage(): string | null { return this.pathimage; }

    getCorreta(): boolean { return this.correta; }
}


export class AllAlternativasDTO{

    public alternativas: AlternativasDTO[];

    constructor(data: IAllAlternativasDTO ){

        this.alternativas = data.alternativas.map(alternativas => new AlternativasDTO(alternativas));

    }


}