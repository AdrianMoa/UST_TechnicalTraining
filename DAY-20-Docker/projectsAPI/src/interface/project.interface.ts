export interface IProject {
    id: string,
    name: string;
    description: string;
    imageUrl: string;
    //readonly contractTypeId: number | undefined;
    contractSignedOn: Date;
    budget: number;
    isActive: boolean;
}