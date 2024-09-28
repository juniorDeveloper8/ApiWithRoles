import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponse<T> {

  @ApiProperty({
    type: [Object],
    description: 'List of items',
  })
  data: T[];

  @ApiProperty({
    description: 'Metadata for pagination',
    type: Object,
    properties: {
      total: { type: 'number', description: 'Total number of items' },
      page: { type: 'number', description: 'Current page number' },
      lastPage: { type: 'number', description: 'Last page number' },
    },
  })
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}
