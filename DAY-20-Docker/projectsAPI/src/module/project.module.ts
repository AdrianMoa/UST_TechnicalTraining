import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectController } from "src/controller/project/project.controller";
import { ProjectSchema } from "src/schema/project.schema";
import { ProjectService } from "src/service/project/project.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema}])],
  controllers: [ProjectController],
  providers: [ProjectService]
})

export class ProjectModule {}