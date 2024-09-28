import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponse, PaginationDto } from 'src/common';
import { STATUS_CODES } from 'http';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private catRepo: Repository<Cat>,
  ) { }

  async create(createCatDto: CreateCatDto): Promise<Cat> {

    const cat = this.catRepo.create(createCatDto);

    return await this.catRepo.save(cat);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Cat>> {
    const { page, limit } = paginationDto;

    const totalPage = await this.catRepo.count();
    const lastPage = Math.ceil(totalPage / limit);

    return {
      data: await this.catRepo.find({
        skip: (page - 1) * limit,
        take: limit
      }),
      meta: {
        total: totalPage,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  findOne(id: string): Promise<Cat | null> {
    return this.catRepo.findOneBy({ id });
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {

    const { id: _, ...data } = updateCatDto;

    const existingCat = await this.catRepo.findOneBy({ id });
    if (!existingCat) {
      throw new Error('Cat not found');
    }
    await this.catRepo.update(id, data);

    return this.catRepo.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {

    const result = await this.catRepo.delete(id);
    if (result.affected === 0) {
      throw new Error('Cat not found');
    }
  }
}
