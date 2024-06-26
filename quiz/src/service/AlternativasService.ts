import { Service } from 'typedi';
import { AllAlternativasDTO, AlternativasDTO } from '../model/AlternativasDTO';
import alternativasRepository from '../repository/alternativasRepository';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import { perguntaService } from './containerConfig';


@Service()
export class AlternativasService{

    async alternativasCanBePersistent(alternativas: AllAlternativasDTO): Promise<void>{

        const alternativasByPergunta = await alternativasRepository.getAllAternativasByPerguntaId(alternativas.alternativas[0].getPerguntasId());

        const limitOfAlternativas = alternativasByPergunta.length + alternativas.alternativas.length;

        if (limitOfAlternativas > 5) throw new BadRequestError('Limite de alternativas excedido');

        for(const alternativa of alternativas.alternativas){
            const alternativaExists = alternativasByPergunta.some(a => a.conteudo === alternativa.getConteudo());

            if(alternativaExists) throw new BadRequestError('Alternativa ja existe');
        }

    }

    async checkAlternativaTrueExistInPergunta(perguntaId: number): Promise<void> {
        const alternativaCorretaExists = await alternativasRepository.checkAlternativaTrueExistInPergunta(perguntaId);

        if(alternativaCorretaExists) throw new BadRequestError('Nao pode existir mais de uma alternativa correta');
    }

    async saveAlternativa(alternativa: AlternativasDTO): Promise<AlternativasDTO>{

        await perguntaService.checksPerguntaExistsById(alternativa.getPerguntasId());

        if(alternativa.getCorreta()){
            await this.checkAlternativaTrueExistInPergunta(alternativa.getPerguntasId());
        }

        const alternativasByPergunta = await alternativasRepository.getAllAternativasByPerguntaId(alternativa.getPerguntasId());

        if (alternativasByPergunta.length >= 5) throw new BadRequestError('Limite de alternativas excedido');

        const alternativaExists = alternativasByPergunta.some(a => a.conteudo === alternativa.getConteudo() && a.conteudo != null);

        if(alternativaExists) throw new BadRequestError('Alternativa ja existe');
        
        const newAlternativa = await alternativasRepository.createAlternativa(alternativa);

        return new AlternativasDTO(newAlternativa);
    }

    async saveManyAlternativas(alternativas: AllAlternativasDTO): Promise<AlternativasDTO[]>{

        let perguntaId = alternativas.alternativas[0].getPerguntasId();
        for(const alternativa of alternativas.alternativas){

            await perguntaService.checksPerguntaExistsById(alternativa.getPerguntasId());

            if(perguntaId != alternativa.getPerguntasId()) throw new BadRequestError('Nao pode ter mais de uma pergunta');
            perguntaId = alternativa.getPerguntasId();
        }


        if(alternativas.alternativas.length > 5 || alternativas.alternativas.length < 2 ) throw new BadRequestError('O limite de alternativas minimo 2 e maximo 5');

        for (let i = 0; i < alternativas.alternativas.length; i++){

            const equasAlternativas = alternativas.alternativas[i].getConteudo();

            for(let j = i+1; j < alternativas.alternativas.length; j++){

                if(alternativas.alternativas[j].getConteudo() === equasAlternativas && alternativas.alternativas[j].getConteudo() != null)
                    throw new BadRequestError('As alternativas não podem ser iguais');
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

        await perguntaService.checksPerguntaExistsById(perguntaId);

        const allAlternativasByPergunt = await alternativasRepository.getAllAternativasByPerguntaId(perguntaId);

        return allAlternativasByPergunt.map(alternativa => new AlternativasDTO(alternativa));
    }

    async updateAlternativa(alternativaId: number, alternativa: AlternativasDTO): Promise<AlternativasDTO> {

        const alternativaExists = await alternativasRepository.getAlternativaById(alternativaId);

        if(!alternativaExists) throw new NotFoundError('Alternativa nao encontrada');

        const alternativasByPergunta = await alternativasRepository.getAllAternativasByPerguntaId(alternativa.getPerguntasId());

        const alternativaAleadyExists = alternativasByPergunta.filter(a => a.conteudo === alternativa.getConteudo());

        if(alternativaAleadyExists.length != 0 && alternativaAleadyExists[0].id != alternativaId) throw new BadRequestError('Alternativa ja existe');

        const updateAlternativa = await alternativasRepository.updateAlternativa(alternativaId, alternativa);

        return new AlternativasDTO(updateAlternativa);
    }

    async deleteAlternativa(alternativaId: number): Promise<void> {

        const alternativaExists = await alternativasRepository.getAlternativaById(alternativaId);

        if (!alternativaExists) throw new NotFoundError('Alternativa nao encontrada');

        await alternativasRepository.deleteAlternativa(alternativaId);
    }


}