// src/types/BookDetail.ts

export enum BookStatusEnum {
    Ongoing = 'Ongoing',
    Dropped = 'Dropped',
    Deleted = 'Deleted',
    Completed = 'Completed',
    Hiatus = 'Hiatus',
    OnHold = 'OnHold',
}

export interface BookDetail {
    bookId: number;
    name: string;
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
