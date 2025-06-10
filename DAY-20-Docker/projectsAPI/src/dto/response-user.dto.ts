import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
    @ApiProperty({ example: '64ff2e15e1f4f4a10c36d123' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Adrian Moa' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'test@example.com' })
    @Expose()
    email: string;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}