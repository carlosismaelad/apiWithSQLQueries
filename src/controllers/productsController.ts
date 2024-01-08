import { Request, Response } from "express";
import * as productServices from "../services/productsServices";

const getAll = async (_req: Request, res: Response) => {
    try{
        const products = await productServices.getAll();
        return res.status(200).json(products);
    }catch(error){
        console.log("Erro ao buscar produtos: ", error);
        return res.status(500).json({error: "Erro interno do servidor."});      
    }
}

const getProduct = async (req: Request, res: Response) => {
    try{
        const { productId } = req.params;
        const product = await productServices.getProduct(productId);
        return res.status(200).json(product);
    }catch(error){
        console.log("Erro ao buscar o produto: ", error);
        return res.status(500).json({error: "Erro interno do servidor."});      
    }
}

const createProduct = async (req: Request, res: Response) =>{
    try{
        const createdProduct = await productServices.createProduct(req.body);
        return res.status(201).json(createdProduct);
    }catch(error){
        console.log("Erro ao criar produto: ", error);
        return res.status(500).json({error: "Erro interno do servidor."});      
    }
}

const updateProduct = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const updateValues = req.body;
        const updatedProduct = await productServices.updateProduct(id, updateValues);    
        return res.status(200).json(updatedProduct);
    }catch(error){
        console.log("Erro ao atualizar produto: ", error);
        return res.status(500).json({error: "Erro interno do servidor."});      
    }
}

const deleteProduct = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        await productServices.deleteProduct(id);
        return res.status(204).end();
    }catch(error){
        console.log("Erro ao excluir produto: ", error);
        return res.status(500).json({error: "Erro interno do servidor."});      
    }
}

export {getAll, getProduct, createProduct, updateProduct, deleteProduct}

