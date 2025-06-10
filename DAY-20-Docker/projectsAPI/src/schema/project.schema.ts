import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import mongoose from "mongoose";

@Schema()
export class Project {
    @Exclude()
    _id: mongoose.Types.ObjectId;

    id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    imageUrl: string;

    // @Prop()
    // contractTypeId: number;

    @Prop()
    contractSignedOn: Date;

    @Prop()
    budget: number;

    @Prop()
    isActive: boolean;

    constructor(partial: Partial<Project>) {
        partial.id = partial._id?.toString();
        Object.assign(this, partial);
    }
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);