import { Expose } from "class-transformer";
import { ResponseProjectDto } from "./response-project.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseApiListDto {

    @ApiProperty({ example: 'All projects data found successfully', description: 'Message related to the operation result.' })
    @Expose()
    message: string;

    @ApiProperty({ type: ResponseProjectDto, description: 'Project list' })
    @Expose()
    data: ResponseProjectDto[]

    constructor(partial: Partial<ResponseApiListDto>) {
        Object.assign(this, partial);
    }
}