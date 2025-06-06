import { Expose } from "class-transformer";
import { ResponseProjectDto } from "./response-project.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseApiDto {

    @ApiProperty({ example: 'Project found successfully', description: 'Message related to the operation result.' })
    @Expose()
    message: string;

    @ApiProperty({ type: ResponseProjectDto, description: 'Project' })
    @Expose()
    data: ResponseProjectDto;

    constructor(partial: Partial<ResponseApiDto>) {
        Object.assign(this, partial);
    }
}