import { Service } from 'typedi';
import { ProgressoPerguntasDTO } from '../model/ProgressoPerguntasDTO';
import progressoPerguntasRepository from '../repository/progressoPerguntasRepository';
import { BadRequestError } from '../exception/BadRequestError';

@Service()
export class ProgressoPerguntasService{

  async createProgressoPerg(progressoPergunta: ProgressoPerguntasDTO): Promise<ProgressoPerguntasDTO>{

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(progressoPergunta.getUsuariosId()!);

    const progressoExist = progressoPergByUsuario.filter( p => p.perguntasid === progressoPergunta.getPerguntasId() );
     
    if(progressoExist.length != 0) throw new BadRequestError('Campus already exists');

    const progressoPerg = await progressoPerguntasRepository.createProgressoPergunta(progressoPergunta);

    return new ProgressoPerguntasDTO(progressoPerg);
  }

  async getAllProgressoPergByUsuario(usuarioId: number): Promise<ProgressoPerguntasDTO[]> {

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(usuarioId);

    return progressoPergByUsuario.map(p => new ProgressoPerguntasDTO(p));
  }
}