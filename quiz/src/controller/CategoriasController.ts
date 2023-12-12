import { Request, Response } from 'express';
import { categoriasService } from '../service/containerConfig';
import { CategoriasDTO } from '../model/CategoriasDTO';

export class CategoriasController {

  async postCategoria(req:Request, res: Response) {

    try{
      const body = req.body;

      const createdCategoria = await categoriasService.saveCategoria(new CategoriasDTO(body));

      return res.status(201).json(createdCategoria);

    }catch(err){
      res.status(500).json({message: 'internal server error'});    
    }
  }

  async putCategoria(req: Request, res: Response) {

    try{

      const id = parseInt(req.params.id);
      const body = req.body;

      const updatedCategoria = await categoriasService.alterCategoria(id, new CategoriasDTO(body));

      res.status(200).json(updatedCategoria);

    }catch(err){
      res.status(500).json({message: 'Internal server error'});
    }

  }

  async getAllCategorias(req: Request, res: Response){

    const categoriasDTOs = await categoriasService.getAllCategorias();

    res.status(200).json(categoriasDTOs);
  }
}