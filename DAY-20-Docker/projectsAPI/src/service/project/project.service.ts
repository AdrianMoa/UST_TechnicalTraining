import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDto } from "src/dto/create-project.dto";
import { UpdateProjectDto } from "src/dto/update-project.dto";
import { IProject } from "src/interface/project.interface";
import { ProjectDocument } from "src/schema/project.schema";

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private projectModel: Model<ProjectDocument>){}

    async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
        const newProject = new this.projectModel(createProjectDto);
        const saved = await newProject.save();
        return this.toIProject(saved.toObject());
    }

    async updateProject(projectId: string, updateProjectDto: UpdateProjectDto) : Promise<IProject | null> {
        const project = await this.projectModel
            .findByIdAndUpdate(projectId, updateProjectDto, { new: true }).lean();

        return project ? this.toIProject(project) : null;
    }

    async getAllProjects(): Promise<IProject[]> {
        const projectData = await this.projectModel.find().lean();
        return projectData.map(p => this.toIProject(p));
    }

    async getProject(projectId: string): Promise<IProject | null> {
        const project = await this.projectModel.findById(projectId).lean();
        return project ? this.toIProject(project) : null;
    }

    async deleteProject(projectId: string): Promise<IProject | null> {
        const deletedProject = await this.projectModel.findByIdAndDelete(projectId);
        return deletedProject ? this.toIProject(deletedProject) : null;
    }

    private toIProject(data: any) : IProject {
        return {
            id: data._id.toString(),
            name: data.name,
            description: data.description,
            imageUrl:  data.imageUrl,
            contractSignedOn: data.contractSignedOn,
            budget: data.budget,
            isActive: data.isActive
        }
    }
}