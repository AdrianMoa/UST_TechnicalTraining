import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ResponseProjectDto {

    @ApiProperty({ example: '64ff2e15e1f4f4a10c36d123' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Project name' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'Project Description'})
    @Expose()
    description: string;

    @ApiProperty({ example: '/path/image.jpg'})
    @Expose()
    imageUrl: string;

    @ApiProperty({ example: '2025-06-06T01:39:52.317Z' })
    @Expose()
    contractSignedOn: Date;

    @ApiProperty({ example: 15.99 })
    @Expose()
    budget: number;

    @ApiProperty({ example: true })
    @Expose()
    isActive: boolean;

    constructor(partial: Partial<ResponseProjectDto>){
        Object.assign(this, partial);
    }
}