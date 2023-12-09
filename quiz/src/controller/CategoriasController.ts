import { Request, Response } from 'express';
import { categoriasService } from '../service/containerConfig';

export class CategoriasController {

  async postCategoria(req:Request, res: Response) {

    try{
      const categoria = req.body;

      const createdCategoria = categoriasService.saveCategoria(categoria);

      return res.status(201).json(createdCategoria);

    }catch(err){
      res.status(500).json({message: 'internal server error'});    
    }
  }
}