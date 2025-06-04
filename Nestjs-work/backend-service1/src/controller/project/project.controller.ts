import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseInterceptors } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateProjectDto } from "src/dto/create-project.dto";
import { UpdateProjectDto } from "src/dto/update-project.dto";
import { LoggingInterceptor } from "src/interceptor/logging.interceptor";
import { ProjectService } from "src/service/project/project.service";

@ApiTags('projects')
@Controller('projects')
@UseInterceptors(LoggingInterceptor)
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new Project'})
    @ApiCreatedResponse({ description: 'Project has been created successfully'})
    async createProject(
        @Res() response: Response,
        @Body() createProjectDto: CreateProjectDto) {
            try{
                const newProject = await this.projectService.createProject(createProjectDto);
                return response.status(HttpStatus.CREATED).json({
                    message: 'Project has been created successfully',
                    newProject,
                });
            } catch (err) {
                return response.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: 400,
                    message: 'Error: Project not created!',
                    error: 'Bad Request'
                });
            }
    }

    @Put('/:id')
    async updateProject(
        @Res() response: Response, 
        @Param('id') projectId: string, 
        @Body() updateProjectDto: UpdateProjectDto) {
            try{
                const existingProject = await this.projectService.updateProject(projectId, updateProjectDto);
                return response.status(HttpStatus.OK).json({
                    message: 'Project has been successfully updated',
                    existingProject,
                });
            } catch (err) {
                return response.status(err.status).json(err.response);
            }
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
            try {
                const existingProject = await this.projectService.getProject(projectId);
                return response.status(HttpStatus.OK).json({
                    message: 'Project found successfully',
                    existingProject,
                });
            } catch (err) {
                return response.status(err.status).json(err.response);
            }
    }

    @Delete('/:id')
    async deleteProject(
        @Res() response: Response,
        @Param('id') projectId: string) {
        try {
            const deletedProject = await this.projectService.deleteProject(projectId);
            return response.status(HttpStatus.OK).json({
                message: 'Project deleted successfully',
                deletedProject,
            });
        } catch (err) {
            
            return response.status(err.status).json(err.response);
        }
    }
}