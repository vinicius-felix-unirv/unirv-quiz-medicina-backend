
import { NotFoundError } from '../../src/exception/NotFoundError';
import { CampusDTO } from '../../src/model/CampusDTO';
import campusRepository from '../../src/repository/campusRepository';
import { CampusService } from '../../src/service/CampusService';

jest.mock('../../src/repository/campusRepository');

const campusMock = {
    id: 1,
    curso: 'string',
    turma: 'string',
    periodo: 3,
    nome: 'Pedro',
    usuariosid: 3
};

const campusService = new CampusService();

describe('testando função getCampusByUserId', () => {

    it('deve retorne um campusDTO', async () => {
        
        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(campusMock);

        const result = await campusService.getCampusByUserId(1);
        
        expect(result).toBeInstanceOf(CampusDTO);
        expect(result).toEqual(campusMock);
    });

    it('deve retornar um NotFoundError',  () => {

        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(null);

        expect(async () => campusService.getCampusByUserId(1)).rejects.toThrow(NotFoundError);        

    });

});

describe('testando a função getAllCampusByUserId', () => {

    it('deve retornar uma lista de campusDTO', async () => {

        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([campusMock, campusMock]);

        const campusList = await campusService.getAllCampusByUserId(3);

        expect(campusList).toEqual([campusMock, campusMock]);
        expect(campusList[0]).toBeInstanceOf(CampusDTO);
        expect(campusList).toHaveLength(2);
    });

    it('deve retornar uma lista vazia', async () => {

        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([]);

        const campusList = await campusService.getAllCampusByUserId(3);

        expect(campusList).toEqual([]);
        expect(campusList[0]).not.toBeInstanceOf(CampusDTO);
        expect(campusList).toHaveLength(0);
    });


});