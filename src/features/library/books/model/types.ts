export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  coverUrl?: string;

  summary: string;
  pageCount: number;
  publicationYear: number;
  isbn: string;
  publisher: string;
  language: string;
};