
import { useState, type SyntheticEvent } from 'react';
import { Project } from './Project';

interface ProjectFormProps{
    project: Project;
    onSave: (project: Project) => void;
    onCancel: () => void;
}

function ProjectForm({ project: initialProject, onSave, onCancel }: ProjectFormProps){
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name:'',
        description:'',
        budget:'',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    function randomNumberInRange(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            setIsSubmitted(true);
            const newErrors = validate(project);
            setErrors(newErrors);

            if(Object.values(newErrors).some(error => error)) return;

            if(project.isNew){
                project.imageUrl = `/assets/placeimg_500_300_arch${randomNumberInRange(1,12)}.jpg`;
            }
            
            onSave(project);
            
        } catch (error) {
            console.error('Error on submit: ', error);
        }
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;

        if(type === 'number'){
            updatedValue = Number(updatedValue);
        }

        const change = {
            [name] : updatedValue,
        };
        
        let updatedProject: Project = new Project({ ...project, ...change});
        setProject(updatedProject);
        setErrors({ ...errors, ...validate(updatedProject)});
    };

    const validate = (project: Project) => {
        let errors: any = { name:'', description:'', budget:''};
        if(project.name === null || project.name === undefined){
            errors.name = 'Name is required.';
        }
        if(!project.name.trim()){
            errors.name = 'Name could not be empty or whitespace.';
        }
        if(project.name.length > 150){
            errors.name = 'Name needs to be at max 150 characters.';
        }
        if(project.description === null || project.description === undefined){
            errors.description = 'Description is required.';
        }
        if(!project.description.trim()){
            errors.description = 'Description could not be empty or whitespace.';
        }
        if(project.description.length > 2000){
            errors.description = 'Description needs to be at max 2000 characters.';
        }
        if(project.budget <= 0){
            errors.budget = 'Budget must be greater than $0.';
        }
        return errors;
    }
    
    return (
        <form className="input-group vertical" style={{ maxWidth: '500px'}} onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
            {isSubmitted && errors.name.length > 0 && (
                <div  className='card large error'>
                    <p>{errors.name}</p>
                </div>
            )}

            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange}/>
            {errors.description.length > 0 && (
                <div className='card large error'>
                    <p>{errors.description}</p>
                </div>
            )}

            <label htmlFor="budget">Project Bubget</label>
            <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
            {errors.budget.length > 0 && (
                <div className='card large error'>
                    <p>{errors.budget}</p>
                </div>
            )}
            
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>cancel</button>
            </div>
        </form>
    );
}

export default ProjectForm;