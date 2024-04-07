import { Request, Response } from 'express';
import { campusService } from '../service/containerConfig';
import { CampusDTO } from '../model/CampusDTO';

export class CampusController{

  async postCampus(req: Request, res: Response): Promise<Response> {

    const body = req.body;

    const campus = await campusService.createCampus(new CampusDTO(body));

    return res.status(201).json(campus);
        
  }

  async getAllCampusByUserId(req: Request, res: Response): Promise<Response> {

    const userId = parseInt(req.params.id);

    const campus = await campusService.getAllCampusByUserId(userId);

    return res.status(200).json(campus);

  }

  async getCampusById(req: Request, res: Response): Promise<Response> {

    const Id = parseInt(req.params.id);

    const campus = await campusService.getCampusById(Id);

    return res.status(200).json(campus);

  }

  async putCampus(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);
    const body = req.body;

    const updatedCampus = await campusService.updatedCampus(id, new CampusDTO(body));

    return res.status(200).json(updatedCampus);

  }

  async deleteCampus(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    await campusService.deleteCampus(id);

    return res.status(204).json();

  }
}