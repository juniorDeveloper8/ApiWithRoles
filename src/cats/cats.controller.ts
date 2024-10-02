import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PaginatedResponse, PaginationDto, Role } from '../common';
import { Cat } from './entities';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListCatDto } from './dto';
import { Auth } from 'src/auth/decorators';

@ApiTags('cats')
@Auth(Role.USER)
@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  @ApiResponse({ status: 201, description: 'The cat has been successfully created.', type: Cat })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    try {
      return await this.catsService.create(createCatDto);
    } catch (error) {
      throw new BadRequestException('Failed to create cat', error);
    }
  }


  @Get()
  @ApiOperation({ summary: 'Get a list of cats with pagination' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of cats with pagination.',
    type: PaginatedResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<ListCatDto>> {
    try {
      return await this.catsService.findAll(paginationDto);
    } catch (error) {
      throw new BadRequestException('Failed to fetch cats', error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'ID of the cat to retrieve' })
  @ApiResponse({ status: 200, description: 'The cat has been successfully retrieved.', type: Cat })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ListCatDto> {
    try {

      const cat = await this.catsService.findOne(id);
      if (!cat) {
        throw new NotFoundException('Cat not found');
      }
      return cat;

    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('Something bad happened', { cause: error, description: 'Some error description' });
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'ID of the cat to update' })
  @ApiResponse({ status: 200, description: 'The cat has been successfully updated.', type: Cat })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    try {
      const updatedCat = await this.catsService.update(id, updateCatDto);
      if (!updatedCat) {
        throw new NotFoundException('Cat not found');
      }
      return updatedCat;
    } catch (error) {
      throw new BadRequestException('Failed to update cat', error);
    }
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Remove a cat by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'ID of the cat to remove' })
  @ApiResponse({ status: 204, description: 'The cat has been successfully removed.' })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.catsService.remove(id);
    } catch (error) {
      throw new BadRequestException('Failed to remove cat', error);
    }
  }

}
