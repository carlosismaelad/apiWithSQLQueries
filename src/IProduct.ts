export default interface Product{
        id: string,
        title: string;
        description: string;
        value: number;
        image: string
        createdAt?: Date;
        updatedAt?: Date;
}