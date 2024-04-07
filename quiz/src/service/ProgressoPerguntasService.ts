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
    
    if(!usuariosIdExists || !perguntaIdExists) throw new NotFoundError('Usuario ou pergunta nao encontrados');

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(progressoPergunta.getUsuariosId());

    const progressoExist = progressoPergByUsuario.some( p => p.perguntasid === progressoPergunta.getPerguntasId());
     
    if(progressoExist) throw new BadRequestError('Progresso-Pergunta ja existe');

    const progressoPerg = await progressoPerguntasRepository.createProgressoPergunta(progressoPergunta);

    return new ProgressoPerguntasDTO(progressoPerg);
  }

  async createManyProgressoPergunta(data: AllProgressoPerguntasDTO): Promise<ProgressoPerguntasDTO[]> {

    const usuariosExists = await usuariosRepository.getUsuarioById(data.progressoPerguntas[0].getUsuariosId());

    if (!usuariosExists) throw new NotFoundError('Usuario nao encontrado');

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(data.progressoPerguntas[0].getUsuariosId());
    
    for(const progressoPerguntas of data.progressoPerguntas){

      const perguntaIdExists = await perguntasRepository.getPerguntaById(progressoPerguntas.getPerguntasId());

      if(!perguntaIdExists) throw new NotFoundError('Pergunta nao encontrada');

      const progressoExist = progressoPergByUsuario.some( p => p.perguntasid === perguntaIdExists.id);

      if(progressoExist) throw new BadRequestError('Progresso-Pergunta ja existe');
      
      const perguntasRepeated = new Set<number>();
      
      data.progressoPerguntas.forEach(p => perguntasRepeated.add(p.getPerguntasId()));

      if(perguntasRepeated.size != data.progressoPerguntas.length) throw new BadRequestError('As perguntas não podem se repetir');

    }

    const allProgressoPerguntasDTO: ProgressoPerguntasDTO[] = [];

    for(const progressoPerguntas of data.progressoPerguntas){

      const progressoPergSaved = await progressoPerguntasRepository.createProgressoPergunta(progressoPerguntas);

      allProgressoPerguntasDTO.push(new ProgressoPerguntasDTO(progressoPergSaved));
    }
   
    return allProgressoPerguntasDTO;

  }

  async getAllProgressoPergByUsuario(usuarioId: number): Promise<ProgressoPerguntasDTO[]> {

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(usuarioId);

    return progressoPergByUsuario.map(p => new ProgressoPerguntasDTO(p));
  }
}