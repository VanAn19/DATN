import { Image } from "./index";

export interface Comment {
    _id: string;
    product: string;  
    content: string;
    images: Image[];
}