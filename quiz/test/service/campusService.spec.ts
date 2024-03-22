
import { NotFoundError } from '../../src/exception/NotFoundError';
import { CampusDTO } from '../../src/model/CampusDTO';
import campusRepository from '../../src/repository/campusRepository';
import { CampusService } from '../../src/service/CampusService';

jest.mock('../../src/repository/campusRepository');

const orignGetCampusByUserId = campusRepository.getCampusByUserId;

describe('testando função getCampusByUserId', () => {

    const campusMock = {
        id: 1,
        curso: 'string',
        turma: 'string',
        periodo: 3,
        nome: 'Pedro',
        usuariosid: 3
    };

    beforeEach(() => {
        campusRepository.getCampusByUserId = orignGetCampusByUserId;
    });

    it('deve retorne um campusDTO', async () => {
        
        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(campusMock);

        const campusService = new CampusService();

        const result = await campusService.getCampusByUserId(1);
        
        expect(result).toBeInstanceOf(CampusDTO);
        expect(result).toEqual(campusMock);
    });

    it('deve retornar um NotFoundError',  () => {

        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(null);
        
        const campusService = new CampusService();

        expect(async () => campusService.getCampusByUserId(1)).rejects.toThrow(NotFoundError);        

    });

});