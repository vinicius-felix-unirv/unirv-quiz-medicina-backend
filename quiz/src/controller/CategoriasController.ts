import { Request, Response } from 'express';
import { categoriasService } from '../service/containerConfig';
import { CategoriasDTO } from '../model/CategoriasDTO';

export class CategoriasController {

  async postCategoria(req:Request, res: Response) {

    try{
      const body = req.body;

      const categoria = new CategoriasDTO(body.descricao, body.status);

      const createdCategoria = await categoriasService.saveCategoria(categoria);

      return res.status(201).json(createdCategoria);

    }catch(err){
      res.status(500).json({message: 'internal server error'});    
    }
  }
}