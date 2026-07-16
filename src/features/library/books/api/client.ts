import { bookDtos } from "../../../../mock/books";
import { toBook } from "./mappers";
import type { Book } from "../model/types";

export function getBooks(): Book[] {
  return bookDtos.map(toBook);
}