import { UploadFile } from "antd";

export interface Image {
    publicId: string;
    imageUrl: string;
    thumbUrl: string;
}

export interface AuthResponse {
    message: string;
    status: number;
    metadata: {
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: {
            _id: string
            name: string;  
            username: string;
            email: string;
        };
    };
}

export interface Product {
    _id: string;
    name: string;
    thumbnail: string;
    images: Image[]
    description: string;
    price: number;
    sale: number;
    sellingPrice: number;
    category: string;
    slug: string;
};

export interface Category {
    _id: string;
    name: string;
    productCount: number;
    slug: string;
};

export interface ProductResponse {
    message: string;
    status: number;
    metadata: [
        {
            _id: string;
            name: string;
            thumbnail: string;
            images: { publicId: string, imageUrl: string, thumbUrl: string }[];
            description: string;
            price: number;
            sale: number;
            sellingPrice: number;
            category: string;
            slug: string;
        }
    ];
}

export interface OneProductResponse {
    message: string;
    status: number;
    metadata: {
        _id: string;
        name: string;
        thumbnail: string;
        images: { publicId: string, imageUrl: string, thumbUrl: string }[];
        description: string;
        price: number;
        sale: number;
        sellingPrice: number;
        quantity: number;
        category: string;
        slug: string;
    }
}

export interface ProductCart {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    thumbnail: string;
}

export interface ListCartResponse {
    message: string;
    status: number;
    metadata: {
        _id: string;
        status: string;
        user: string;
        productCount: number;
        products: ProductCart[];
    }
}

export interface CheckoutPayload {
    cartId: string;
    orderIds: Array<{
      products: Array<{
        productId: string;
        quantity: number;
        name: string;
        price: number;
      }>;
    }>;
}

export interface FileItem extends UploadFile {
    publicId: string; 
}
