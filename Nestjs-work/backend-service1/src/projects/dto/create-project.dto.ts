export class CreateProjectDto {
    name: string = '';
    description: string = '';
    imageUrl: string = '';
    budget: number = 0;
    isActive: boolean = false;
    test: string;
}