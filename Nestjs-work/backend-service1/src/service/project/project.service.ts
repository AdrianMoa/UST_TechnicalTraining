import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDto } from "src/dto/create-project.dto";
import { UpdateProjectDto } from "src/dto/update-project.dto";
import { IProject } from "src/interface/project.interface";

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private projectModel: Model<IProject>){}

    async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
        const newProject = await new this.projectModel(createProjectDto);
        return newProject.save();
    }

    async updateProject(projectId: string, updateProjectDto: UpdateProjectDto) : Promise<IProject> {
        const existingProject = await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto, { new: true });
        if(!existingProject) {
            throw new NotFoundException(`Project #${projectId} not found`);
        }
        return existingProject;
    }

    async getAllProjects(): Promise<IProject[]> {
        const projectData = await this.projectModel.find();
        if(!projectData || projectData.length == 0) {
            throw new NotFoundException('Projects data not found!');
        }
        return projectData;
    }

    async getProject(projectId: string): Promise<IProject> {
        const existingProject = await  this.projectModel.findById(projectId).exec();
        if(!existingProject) {
            throw new NotFoundException(`Project #${projectId} not found`);
        }
        return existingProject;
    }

    async deleteProject(projectId: string): Promise<IProject> {
        const deletedProject = await this.projectModel.findByIdAndDelete(projectId);
        if(!deletedProject) {
            throw new NotFoundException(`Project #${projectId} not found`);
        }
        return deletedProject;
    }
}