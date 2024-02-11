import { Service } from 'typedi';
import { AlternativasDTO } from '../model/AlternativasDTO';
import alternativasRepository from '../repository/alternativasRepository';
import { BadRequestError } from '../exception/BadRequestError';


@Service()
export class AlternativasService{

    async saveAlternativa(alternativa: AlternativasDTO): Promise<AlternativasDTO>{

        const alternativasByPergunta = await alternativasRepository.gatAllAternativasByPerguntaId(alternativa.getPerguntasId()!);

        if (alternativasByPergunta.length >= 5) throw new BadRequestError('limit of alternativa exceeded');

        // const alternativaExists = alternativasByPergunta.some(a => a.resposta === alternativa.getResposta() || a.pathimage === alternativa.getPathImage());

        // if(alternativaExists) throw new BadRequestError('Alternativa already exists');

        const newAlternativa = await alternativasRepository.createAlternativa(alternativa);

        return new AlternativasDTO(newAlternativa);
    }


}