import { safeRequest } from '../utils/safeRequest';
import { Project } from './../projects/Project';
import axiosInstance from './axiosInstance';
const baseUrl = 'http://localhost:3000'; //this is the port configured from NestJS API. NOT USED DUE TO AXIOS INSTANCE
const url = `${baseUrl}/projects`;

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

function checkStatus(response: any){
    if(response.ok){
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response){
    return response.json();
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
        try {
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
        } catch (error) {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error retrieving the projects. Please try again.'
            );
        }
    },

    async put(project: Project) {
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error updating the project. Please try again.'
                );
            });
    },

    async find(id: string) {
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(res => {
                return convertToProjectModel(res.data);
            });
    },
    
    async post(project: Project) {
        return fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error creating the new project. Please try again.'
            )
        });
    },

    async delete(id: string){
        return fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error deleting the project. Please try again.'
            )
        })
    }
};

export { projectAPI };