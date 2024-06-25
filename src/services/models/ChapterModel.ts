export interface ImagesModel {
  imageId?: number;
  url: string;
  chapterId?: number;
  numbericlOrder: number;
}

export interface MangaModel {
  mangaId: number;
  title: string;
  description: string;
}

export interface ChapterModel {
  chapterId: number;
  title: string;
  chapterNumber: number;
  content: string;
  publishedDate: Date;
  viewed: number;
  imageItems?: ImagesModel[];
  mangaId: number;
}
