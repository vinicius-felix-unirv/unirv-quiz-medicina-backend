import { Service } from 'typedi';
import { AllAlternativasDTO, AlternativasDTO } from '../model/AlternativasDTO';
import alternativasRepository from '../repository/alternativasRepository';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import perguntasRepository from '../repository/perguntasRepository';


@Service()
export class AlternativasService{

    async alternativasCanBePersistent(alternativas: AllAlternativasDTO): Promise<void>{

        const alternativasByPergunta = await alternativasRepository.gatAllAternativasByPerguntaId(alternativas.alternativas[0].getPerguntasId());

        const limitOfAlternativas = alternativasByPergunta.length + alternativas.alternativas.length;

        if (limitOfAlternativas > 5) throw new BadRequestError('limit of alternativa exceeded');

        for(const alternativa of alternativas.alternativas){
            const alternativaExists = alternativasByPergunta.some(a => a.resposta === alternativa.getResposta());

            if(alternativaExists) throw new BadRequestError('Alternativa already exists');
        }

    }

    async saveAlternativa(alternativa: AlternativasDTO): Promise<AlternativasDTO>{

        const alternativasByPergunta = await alternativasRepository.gatAllAternativasByPerguntaId(alternativa.getPerguntasId());

        if (alternativasByPergunta.length >= 5) throw new BadRequestError('limit of alternativa exceeded');

        const alternativaExists = alternativasByPergunta.some(a => a.resposta === alternativa.getResposta() && a.resposta != null);

        if(alternativaExists) throw new BadRequestError('Alternativa already exists');
        
        const newAlternativa = await alternativasRepository.createAlternativa(alternativa);

        return new AlternativasDTO(newAlternativa);
    }

    async saveManyAlternativas(alternativas: AllAlternativasDTO): Promise<AlternativasDTO[]>{

        const perguntaExists = await perguntasRepository.getPerguntaById(alternativas.alternativas[0].getPerguntasId());

        if (!perguntaExists) throw new NotFoundError('Pergunta not found');

        if(alternativas.alternativas.length > 5 || alternativas.alternativas.length < 2 ) throw new BadRequestError('The limit of alternatives must be greater than 2 and less than 5');

        for (let i = 0; i < alternativas.alternativas.length; i++){

            const equasAlternativas = alternativas.alternativas[i].getResposta();

            for(let j = i+1; j < alternativas.alternativas.length; j++){

                if(alternativas.alternativas[j].getResposta() === equasAlternativas && alternativas.alternativas[j].getResposta() != null)
                    throw new BadRequestError('the alternatives cannot be the same');
            }

        }

        await this.alternativasCanBePersistent(alternativas);

        const allAlternativas: AlternativasDTO[] = [];

        for (const alternativa of alternativas.alternativas){
            const alternativaSaved =  await alternativasRepository.createAlternativa(alternativa);

            allAlternativas.push(new AlternativasDTO(alternativaSaved));
        }

        return allAlternativas;
    }

    async getAllAlternativasByPerguntaId(perguntaId: number): Promise<AlternativasDTO[]> {

        const allAlternativasByPergunt = await alternativasRepository.gatAllAternativasByPerguntaId(perguntaId);

        return allAlternativasByPergunt.map(alternativa => new AlternativasDTO(alternativa));
    }

    async updateAlternativa(alternativaId: number, alternativa: AlternativasDTO): Promise<AlternativasDTO> {

        const alternativaExists = await alternativasRepository.getAlternativaById(alternativaId);

        if(!alternativaExists) throw new NotFoundError('Alternativa not found');

        const alternativasByPergunta = await alternativasRepository.gatAllAternativasByPerguntaId(alternativa.getPerguntasId());

        const alternativaAleadyExists = alternativasByPergunta.filter(a => a.resposta === alternativa.getResposta());

        if(alternativaAleadyExists.length != 0 && alternativaAleadyExists[0].id != alternativaId) throw new BadRequestError('Alternativa already exists');

        const updateAlternativa = await alternativasRepository.updateAlternativa(alternativaId, alternativa);

        return new AlternativasDTO(updateAlternativa);
    }

    async deleteAlternativa(alternativaId: number): Promise<void> {

        const alternativaExists = await alternativasRepository.getAlternativaById(alternativaId);

        if (!alternativaExists) throw new NotFoundError('Alternativa not found');

        await alternativasRepository.deleteAlternativa(alternativaId);
    }


}