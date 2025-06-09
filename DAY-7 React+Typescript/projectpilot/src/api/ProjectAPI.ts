import { safeRequest } from '../utils/safeRequest';
import { Project } from './../projects/Project';
import axiosInstance from './axiosInstance';

function translateStatusToErrorMessage(status: number){
    switch (status){
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the project(s).';
        default:
            return 'There was an error retrieving the project(s). Please try again.';
    }
}

function convertToProjectModels(data: any[]): Project[] {
    let projects: Project[] = data.map(convertToProjectModel);
    return projects;
}

function convertToProjectModel(item: any): Project{
    return new Project(item);
}

const projectAPI = {
    async get(page = 1, limit = 20) {
        const responseData = await safeRequest<Project[], Project[]>(
            () => axiosInstance.get('/projects', {
                params: {
                    page: page,
                    _limit: limit,
                    sort: 'name'
                }
            }), convertToProjectModels
        );
        return responseData.data;
    },

    async put(project: Project) {
        const responseData = await safeRequest<Project, Project>(
            () => axiosInstance.put(`/projects/${project.id}`, project), convertToProjectModel
        );
        console.log(responseData);
        return responseData.data;
    },

    async find(id: string) {
        const responseData = await safeRequest<Project, Project>(
            () => axiosInstance.get(`/projects/${id}`), convertToProjectModel
        );
        return responseData.data;
    },
    
    async post(project: Project) {
        const responseData = await safeRequest<Project, Project>(
            () => axiosInstance.post('/projects', project), convertToProjectModel
        );
        return responseData.data;
    },

    async delete(id: string){
        const responseData = await safeRequest<Project, Project>(
            () => axiosInstance.delete(`/projects/${id}`), convertToProjectModel
        );
        return responseData.data;
    }
};

export { projectAPI };