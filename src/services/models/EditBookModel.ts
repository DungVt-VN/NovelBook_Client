import { BookStatusEnum } from "./BookDetail";

export interface EditBookModel {
    bookId: number;
    name: string;
    ownerId: string;
    coverImage: string;
    status: BookStatusEnum;
    description: string;
    author: string;
    actived: boolean;
    anotherNames?: string[];
    categories?: string[];
    tags?: string[];
}

// Giá trị mặc định cho EditBookModel
export const defaultEditBookModel: EditBookModel = {
    bookId: 0,
    name: '',
    ownerId: '',
    coverImage: '',
    status: BookStatusEnum.Ongoing,
    description: '',
    actived: false,
    author: '',
    anotherNames: [],
    categories: [],
    tags: [],
};