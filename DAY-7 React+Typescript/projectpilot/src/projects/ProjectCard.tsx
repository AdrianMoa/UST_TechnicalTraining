import type React from "react";
import { Project } from "./Project";
import { Link } from "react-router";
import { useState } from "react";

function formatDescription(description: string): string {
    return description.substring(0,60) + '...';
}

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}

function ProjectCard({project, onEdit, onDelete}: ProjectCardProps){
    const [showModal, setShowModal] = useState(false);

    const ConfirmModal: React.FC<{ onConfirm: () => void; onCancel: () => void}> = ({ onConfirm, onCancel}) => {
        return (
            <div style={{ position: "fixed", top: "50%", left: "50%", 
            transform: "translate(-50%,-50%)", padding: "20px", 
            background: "white", border: "1px solid black", zIndex: 1000}}>
                <p>{`Do you want to delete project '${project.name}'`}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        );
    }

    const handleDelete = (id: string) => {
        setShowModal(false);
        onDelete(id);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <Link to={'/projects/' + project._id}>
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                    <p>{formatDescription(project.description)}</p>
                    <p>Budget : {project.budget.toLocaleString()}</p>
                </Link>
                <button className="bordered" onClick={() => { onEdit(project); }}>
                    <span className="icon-edit"></span>
                    Edit
                </button>
                <button className="bordered" onClick={ () => setShowModal(true)}>
                    <span className="icon-alert"></span>
                    Delete
                </button>
                {showModal && <ConfirmModal onConfirm={ () => handleDelete(project._id ?? '') } onCancel={handleCancel} />}
            </section>
        </div>
    );
}

export default ProjectCard;