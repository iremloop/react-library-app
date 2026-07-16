import type { BookDto } from "./types";
import type { Book } from "../model/types";

export function toBook(dto: BookDto): Book {
  return {
    id: dto.id,
    title: dto.title,
    author: dto.author,
  };
}