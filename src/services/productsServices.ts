import db from "./db";
import { createId } from "@paralleldrive/cuid2";
import Product from "../IProduct";

const generateUniqueProductId = async (): Promise<string> =>{
    const userId = createId();
    const existsInDatabase = await checkIfExistsInDatabase(userId);
    if(existsInDatabase){
        return generateUniqueProductId();
    }
    return userId;
};

const checkIfExistsInDatabase = async (id: string): Promise<boolean> =>{
    try{
        if (id === '') {
            return false;
        }
        const result = await db.oneOrNone("SELECT id FROM products WHERE id = $1", [id]);
        return result !== null && result.id !== null;
    }catch(error){
        console.log("Erro ao verificar se o ID já existe no banco de dados: ", error);
        return true;
    }
};


const getAll = async(): Promise<Product[]> => {
    const products = await db.any("SELECT * FROM products");
    return products;
};

const getProduct = async (productId: string): Promise<Product | null> => {
    try{
        const product = await db.oneOrNone("SELECT * FROM products WHERE id = $1", [productId]);
        return product;
    }catch(error){
        console.log("Erro ao buscar o produto:", error);
        return null;        
    }
}

const createProduct = async (product: Product) => {
    const { title, description, value, image} = product;
    const id = await generateUniqueProductId();
    const createdAt = new Date();
    
    const query = "INSERT INTO products(id, title, description, value, image, createdAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    try{
        const createdProduct = await db.one(query, [id, title, description, value, image, createdAt]);
        return createdProduct;
    }catch(error){
        console.log("Erro ao criar produto: ", error);
        return null;    
    }

};

const deleteProduct = async (id: string): Promise<Product | null> => {
    try{
        const [removedProduct] = await db.oneOrNone("DELETE FROM products WHERE id= $1 RETURNING *", [id]);
        return removedProduct;
    }catch(error){
        console.log("Erro ao tentar excluir produto: ", error);
        return null;        
    }
}

const updateProduct = async (id: string, updateValues: Partial<Product>): Promise<Product | null> => {
    const {title, description, value, image} = updateValues;
    const updatedAt = new Date();

    const query = "UPDATE products SET title = $1, description = $2, value = $3, image = $4, updatedAt = $5 WHERE id = $5 RETURNING *";

    try{
        const [updatedProduct] = await db.one(query, [title, description, value, image, updatedAt, id]);
        return updatedProduct;
    }catch(error){
        console.log("Erro ao tentar atualizar produto: ", error);
        return null;        
    }
}

export {getAll, getProduct, createProduct, deleteProduct, updateProduct}


