import { Project } from './Project';

interface ProjectDetailProps {
    project: Project;
}

export default function ProjectDetail({project}: ProjectDetailProps){
    return (
        <div className='row'>
            <div className='col-sm-6'>
                <div className='card large'>
                    <img className='rounded' src={project.imageUrl} alt={project.name} />
                    <section>
                        <h3 className='seection dark'>
                            <strong>{project.name}</strong>
                        </h3>
                        <p>{project.description}</p>
                        <p>Budget: {project.budget}</p>
                        <p>Signed: {new Date(project.contractSignedOn).toLocaleDateString()}</p>
                        <p>
                            <mark className='active'>
                                {' '}
                                {project.isActive ? "active" : "inactive"}
                            </mark>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}