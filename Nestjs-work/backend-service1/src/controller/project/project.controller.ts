import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateProjectDto } from "src/dto/create-project.dto";
import { UpdateProjectDto } from "src/dto/update-project.dto";
import { LoggingInterceptor } from "src/common/interceptor/logging.interceptor";
import { ProjectService } from "src/service/project/project.service";
import { ResponseProjectDto } from "src/dto/response-project.dto";
import { ResponseApiListDto } from "src/dto/response-api-list.dto";
import { ResponseApiDto } from "src/dto/response-api.dto";


//@UseGuards(AccessTokenGuard)
@ApiTags('projects')
@Controller('projects')
@UseInterceptors(LoggingInterceptor)
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new Project'})
    @ApiCreatedResponse({ description: 'Project has been created sucessfully', type: [ResponseApiDto] })
    @ApiBadRequestResponse({ description: 'Error: Project not created!' })
    async createProject(@Body() createProjectDto: CreateProjectDto) : Promise<ResponseApiDto> {
        try{
            const newProject = await this.projectService.createProject(createProjectDto);
            return {
                message: 'Project has been created successfully',
                data: newProject
            }
        } catch (error) {
            throw error instanceof HttpException
            ? error : new HttpException('Error: Failed to create a new project', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update project information' })
    @ApiOkResponse({ description: 'Project updated successfully', type: [ResponseApiDto] })
    @ApiNotFoundResponse({ description: 'Project not found'})
    @ApiBody({ type: UpdateProjectDto })
    async updateProject(
        @Param('id') projectId: string, 
        @Body() updateProjectDto: UpdateProjectDto) : Promise<ResponseApiDto> {
            try{
                const project = await this.projectService.updateProject(projectId, updateProjectDto);
                if(!project) throw new NotFoundException('Project not found');

                return {
                    message: 'Project has been successfully updated',
                    data: new ResponseProjectDto(project)
                }
            } catch (error) {
                throw error instanceof HttpException
                ? error : new HttpException('Error: Failed to create a new project', HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @Get()
    @ApiOperation({ summary: 'Get all projects'})
    @ApiOkResponse({ type: [ResponseApiListDto]})
    async getProjects() : Promise<ResponseApiListDto> {
        try {
            const projects = await this.projectService.getAllProjects();
            return {
                message: 'All projects data found successfully',
                data: projects.map(project => new ResponseProjectDto(project))
            }
        } catch (err) {
            throw err instanceof HttpException
            ? err 
            : new HttpException('Error: Failed to get projects', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get project by ID' })
    @ApiOkResponse({ type: [ResponseApiDto] })
    @ApiNotFoundResponse({ description: 'Project not found' })
    async getProject(@Param('id') projectId: string) : Promise<ResponseApiDto> {
        try {
            const project = await this.projectService.getProject(projectId);
            if(!project) throw new NotFoundException('Project not found')

            return {
                message: 'Project data found successfully',
                data: new ResponseProjectDto(project)
            }
        } catch (error) {
            throw error instanceof HttpException
                ? error : new HttpException('Error: Failed to get project', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a project by ID' })
    @ApiOkResponse({ description: 'Project deleted successfully' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    async deleteProject(@Param('id') projectId: string) : Promise<ResponseApiDto> {
        try {
            const deletedProject = await this.projectService.deleteProject(projectId);
            if(!deletedProject) throw new NotFoundException('Project not found');

            return {
                message: 'Project deleted successfully',
                data: new ResponseProjectDto(deletedProject)
            }
        } catch (err) {
            throw err instanceof HttpException
                ? err : new HttpException('Error: Failed to get project', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}