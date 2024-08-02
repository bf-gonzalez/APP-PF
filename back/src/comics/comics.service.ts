import { Injectable } from '@nestjs/common';
import { Comic } from './interfaces/comic.interface';
import { ComicsRepository } from './comics.repository';
import { Comics } from './comics.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class ComicsService {
  constructor(private readonly comicsRepository: ComicsRepository) {}

  addComics(id: string) {
    return this.comicsRepository.addComics(id);
  }

  getAllComics(page: number, limit: number) {
    return this.comicsRepository.getAllComics(page, limit);
  }

  getComicById(id: string) {
    return this.comicsRepository.getComicById(id);
  }

  getComicByTitle(title: string) {
    return this.comicsRepository.getComicByTitle(title);
  }

  createComic(id: string, comic: Partial<Comics>) {
    return this.comicsRepository.createComic(id, comic);
  }

  updatedComic(id: string, comic: Comics) {
    return this.comicsRepository.updateComic(id, comic);
  }

  deleteComic(id: string) {
    return this.comicsRepository.deleteComic(id);
  }
}