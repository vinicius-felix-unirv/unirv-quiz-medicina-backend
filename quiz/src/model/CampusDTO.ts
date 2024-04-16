import { campus } from '@prisma/client';

export interface ICampusDTO{
  id?: number;        
  nomecampus: string;
}

export class CampusDTO {

  private id?: number;        
  private nomecampus: string;

  constructor(data: ICampusDTO | campus){
    this.id = data.id;
    this.nomecampus = data.nomecampus;
  }

  getId(): number | undefined {
    return this.id;
  }

  getNomeCampus(): string{
    return this.nomecampus;
  }

}