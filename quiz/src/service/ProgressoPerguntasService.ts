import { Service } from 'typedi';
import { AllProgressoPerguntasDTO, ProgressoPerguntasDTO } from '../model/ProgressoPerguntasDTO';
import progressoPerguntasRepository from '../repository/progressoPerguntasRepository';
import { BadRequestError } from '../exception/BadRequestError';
import usuariosRepository from '../repository/usuariosRepository';
import perguntasRepository from '../repository/perguntasRepository';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class ProgressoPerguntasService{

  async createProgressoPerg(progressoPergunta: ProgressoPerguntasDTO): Promise<ProgressoPerguntasDTO>{

    const [usuariosIdExists, perguntaIdExists] = await Promise.all(
      [
        usuariosRepository.getUsuarioById(progressoPergunta.getUsuariosId()),
        perguntasRepository.getPerguntaById(progressoPergunta.getPerguntasId())
      ]
    );
    
    if(!usuariosIdExists || !perguntaIdExists) throw new NotFoundError('Usuario or Pergunta not found');

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(progressoPergunta.getUsuariosId());

    const progressoExist = progressoPergByUsuario.filter( p => p.perguntasid === progressoPergunta.getPerguntasId());
     
    if(progressoExist.length != 0) throw new BadRequestError('ProgressoPergunta already exists');

    const progressoPerg = await progressoPerguntasRepository.createProgressoPergunta(progressoPergunta);

    return new ProgressoPerguntasDTO(progressoPerg);
  }

  async createManyProgressoPergunta(data: AllProgressoPerguntasDTO): Promise<ProgressoPerguntasDTO[]> {

    const usuariosExists = await usuariosRepository.getUsuarioById(data.progressoPerguntas[0].getUsuariosId());

    if (!usuariosExists) throw new NotFoundError('Usuario not found');

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(data.progressoPerguntas[0].getUsuariosId());
    
    const allProgressoPerguntasDTO: ProgressoPerguntasDTO[] = [];
    
    for(let i = 0; i < data.progressoPerguntas.length; i++){

      const perguntaIdExists = await perguntasRepository.getPerguntaById(data.progressoPerguntas[i].getPerguntasId());

      if(!perguntaIdExists) throw new NotFoundError('Pergunta not found');

      const progressoExist = progressoPergByUsuario.filter( p => p.perguntasid === perguntaIdExists.id);

      if(progressoExist.length != 0) throw new BadRequestError('ProgressoPergunta already exists');
 
      const progressoPerg = await progressoPerguntasRepository.createProgressoPergunta(data.progressoPerguntas[i]);

      allProgressoPerguntasDTO.push(new ProgressoPerguntasDTO(progressoPerg));

    }

    return allProgressoPerguntasDTO;

  }

  async getAllProgressoPergByUsuario(usuarioId: number): Promise<ProgressoPerguntasDTO[]> {

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(usuarioId);

    return progressoPergByUsuario.map(p => new ProgressoPerguntasDTO(p));
  }
}