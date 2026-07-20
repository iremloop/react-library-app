import type { BookDto } from "../features/library/books/api/types";

import cover1984 from "../assets/covers/1984.jpg";
import animalFarmCover from "../assets/covers/hayvanciftligi.jpeg";
import kurkMantoluMadonnaCover from "../assets/covers/kurkmantolumadonna.jpeg";
import chessCover from "../assets/covers/satranc.jpeg";
import lesMiserablesCover from "../assets/covers/sefiller.png";
import alchemistCover from "../assets/covers/simyaci.jpeg";
import crimeAndPunishmentCover from "../assets/covers/sucveceza.jpeg";

export const bookDtos: BookDto[] = [
  {
    id: 1,
    title: "Suç ve Ceza",
    author: "Dostoyevski",
    genre: "novel",
    coverUrl: crimeAndPunishmentCover,
    summary:"crimeAndPunishmentSummary",
    pageCount: 704,
    publicationYear: 1866,
    isbn: "9789750719387",
    publisher: "isBankasi",
    language: "turkish",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "dystopia",
    coverUrl: cover1984,
    summary: "nineteenEightyFourSummary",
    pageCount: 352,
    publicationYear: 1949,
    isbn: "9789750718533",
    publisher: "can",
    language: "turkish",
  },
  {
    id: 3,
    title: "Simyacı",
    author: "Paulo Coelho",
    genre: "novel",
    coverUrl: alchemistCover,
    summary: "alchemistSummary",
    pageCount: 184,
    publicationYear: 1988,
    isbn: "9789750726439",
    publisher: "can",
    language: "turkish",
  },
  {
    id: 4,
    title: "Hayvan Çiftliği",
    author: "George Orwell",
    genre: "dystopia",
    coverUrl: animalFarmCover,
    summary: "animalFarmSummary" ,
    pageCount: 152,
    publicationYear: 1945,
    isbn: "9789750719370",
    publisher: "can",
    language: "turkish",
  },
  {
    id: 5,
    title: "Kürk Mantolu Madonna",
    author: "Sabahattin Ali",
    genre: "novel",
    coverUrl: kurkMantoluMadonnaCover,
    summary:"madonnaInAFurCoatSummary" ,
    pageCount: 160,
    publicationYear: 1943,
    isbn: "9789753638029",
    publisher: "yapiKredi",
    language: "turkish",
  },
  {
    id: 6,
    title: "Sefiller",
    author: "Victor Hugo",
    genre: "novel",
    coverUrl: lesMiserablesCover,
    summary: "lesMiserablesSummary",
    pageCount: 1728,
    publicationYear: 1862,
    isbn: "9789754589023",
    publisher: "isBankasi",
    language: "turkish",
  },

  {
    id: 7,
    title: "Satranç",
    author: "Stefan Zweig",
    genre: "psychology" ,
    coverUrl: chessCover,
    summary: "chessSummary",
    pageCount: 96,
    publicationYear: 1942,
    isbn: "9789750738609",
    publisher: "isBankasi",
    language: "turkish",
  },
];