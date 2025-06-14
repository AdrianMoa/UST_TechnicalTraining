import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps{
    projects: Project[];
    onSave: (project: Project) => void;
    onDelete: (id: string) => void;
}

function ProjectList({projects, onSave, onDelete}: ProjectListProps){
    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    };

    const cancelEditing = () => {
        setProjectBeingEdited({});
    }

    const items = projects.map(project => (
        <div key={project.id} className='cols-sm'>
            {project === projectBeingEdited ? 
                (<ProjectForm project={project} onCancel={cancelEditing} onSave={onSave} />) : 
                (<ProjectCard project={project} onEdit={handleEdit} onDelete={onDelete} />)}
        </div>
    ));

    return <div className="row">{items}</div>
}

export default ProjectList;