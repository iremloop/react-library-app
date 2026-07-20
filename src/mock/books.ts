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
    genre: "Roman",
    coverUrl: crimeAndPunishmentCover,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Distopya",
    coverUrl: cover1984,
  },
  {
    id: 3,
    title: "Simyacı",
    author: "Paulo Coelho",
    genre: "Roman",
    coverUrl: alchemistCover,
  },
  {
    id: 4,
    title: "Hayvan Çiftliği",
    author: "George Orwell",
    genre: "Distopya",
    coverUrl: animalFarmCover,
  },
  {
    id: 5,
    title: "Kürk Mantolu Madonna",
    author: "Sabahattin Ali",
    genre: "Roman",
    coverUrl: kurkMantoluMadonnaCover,
  },
  {
    id: 6,
    title: "Sefiller",
    author: "Victor Hugo",
    genre: "Roman",
    coverUrl: lesMiserablesCover,
  },
  {
    id: 7,
    title: "Satranç",
    author: "Stefan Zweig",
    genre: "Psikolojik",
    coverUrl: chessCover,
  },
];