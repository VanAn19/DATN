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
    description: string;
    price: number;
    category: string;
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
            description: string;
            price: number;
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
        description: string;
        price: number;
        category: string;
        slug: string;
    }
}