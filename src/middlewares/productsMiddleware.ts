import { Request, Response, NextFunction } from "express";
import Product from "../IProduct";

interface CustomRequest extends Request{
    body: Product;
}


const validateFieldTitle = (req: CustomRequest, res: Response, next: NextFunction) => {
    const {body} = req;

    if(body.title === undefined){
        return res.status(400).json({message: "O campo 'título' é obrigatório."});
    }
    if(body.title === ''){
        return res.status(400).json("O campo título não pode estar vazio.");
    }
    next();
}

const validateFieldDescription = (req: CustomRequest, res: Response, next: NextFunction) => {
    const {body} = req;

    if(body.description === undefined){
        return res.status(400).json({message: "O campo 'descrição' é obrigatório."});
    }
    if(body.description === ''){
        return res.status(400).json("O campo 'descrição' não pode estar vazio.");
    }
    next();
}

const validateFieldValue = (req: CustomRequest, res: Response, next: NextFunction) => {
    const {body} = req;

    if(body.value === undefined){
        return res.status(400).json({message: "O campo 'descrição' é obrigatório."});
    }
    if(isNaN(body.value)){
        return res.status(400).json("O campo 'valor' deve conter um número válido.");
    }
    next();
}

const validateFieldImage = (req: CustomRequest, res: Response, next: NextFunction) => {
    const {body} = req;

    if(body.image === undefined){
        return res.status(400).json({message: "O campo 'imagem' é obrigatório."});
    }
    if(body.image === ''){
        return res.status(400).json("O campo 'imagem' não pode estar vazio.");
    }
    next();
}

export {validateFieldTitle, validateFieldDescription, validateFieldValue, validateFieldImage}