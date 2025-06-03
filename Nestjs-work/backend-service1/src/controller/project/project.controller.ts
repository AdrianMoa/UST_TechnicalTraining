import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, BadRequestException} from "@nestjs/common";
import { Response } from "express";
import { CreateProjectDto } from "src/dto/create-project.dto";
import { UpdateProjectDto } from "src/dto/update-project.dto";
import { ProjectService } from "src/service/project/project.service";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async createProject(
        @Res() response: Response,
        @Body() createProjectDto: CreateProjectDto) {
            throw new BadRequestException();
    }

    @Put('/:id')
    async updateProject(
        @Res() response: Response, 
        @Param('id') projectId: string, 
        @Body() updateProjectDto: UpdateProjectDto) {
            throw new BadRequestException();
    }

    @Get()
    async getProjects(@Res() response: Response) {
        try {
            const projectsData = await this.projectService.getAllProjects();
            return response.status(HttpStatus.OK).json({
                message: 'All projects data found successfully',
                projectsData,
            });
        } catch (err) {
            return (response as any).status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getProject(
        @Res() response: Response,
        @Param('id') projectId: string) {
            throw new BadRequestException();
    }

    @Delete('/:id')
    async deleteProject(
        @Res() response: Response,
        @Param('id') projectId: string) {
        throw new BadRequestException();
    }
}