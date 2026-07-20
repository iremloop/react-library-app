import type { BookDto } from "./types";
import type { Book } from "../model/types";

export function toBook(bookDto: BookDto): Book {
  return {
    id: bookDto.id,
    title: bookDto.title,
    author: bookDto.author,
    genre: bookDto.genre,
    coverUrl: bookDto.coverUrl,

    summary: bookDto.summary,
    pageCount: bookDto.pageCount,
    publicationYear: bookDto.publicationYear,
    isbn: bookDto.isbn,
    publisher: bookDto.publisher,
    language: bookDto.language,
  };
}