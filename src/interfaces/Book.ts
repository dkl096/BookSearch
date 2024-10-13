export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publishedDate?: string;
        description?: string;
        imageLinks?:{
            smallThumbnail?: string;
            thumbnail?: string;
        }
    };
}