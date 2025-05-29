import { useNavigate } from "react-router";
import { Project } from "./Project";
import ProjectForm from "./ProjectForm";
import { projectAPI } from "./ProjectAPI";
import { useState } from "react";

function ProjectNew() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined | null>(undefined);

    const cancelEditing = () => {
        navigate("/");
    }

    const createProject = (project: Project) => {
        projectAPI
            .post(project)
            .then(() => {})
            .catch((e) => {
                if(e instanceof Error){
                    setError(e.message);
                }
            });
    };

    return (
        <>
            <h1>Create new project</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            <ProjectForm project={new Project()} onSave={ createProject } onCancel={ cancelEditing } />
        </>
    );
}

export default ProjectNew;