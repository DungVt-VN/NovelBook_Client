// src/types/BookDetail.ts

export enum BookStatusEnum {
    Ongoing = 0,
    Dropped = 1,
    Deleted = 2,
    Completed = 3,
    Hiatus = 4,
    OnHold = 5,
    Khongro = 6,
}

export interface BookDetail {
    bookId: number;
    name: string;
    nameUrl: string;
    ownerId: string;
    coverImage: string;
    status: BookStatusEnum;
    currentChapter: number;
    description: string;
    author: string;
    voted: number;
    rating: number;
    liked: number;
    viewed: number;
    followed: number;
    commented: number;
    categories: string[] | null;
}

export interface BookDetailAll {
    bookId: number;
    name: string;
    nameUrl: string;
    ownerId: string;
    coverImage: string;
    status: BookStatusEnum;
    currentChapter: number;
    description: string;
    author: string;
    voted: number;
    rating: number;
    liked: number;
    viewed: number;
    followed: number;
    commented: number;

    categories?: string[];
    tags?: string[];
    anotherNames?: string[];
}
