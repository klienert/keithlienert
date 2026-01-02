import React from "react";
import { projectData } from '../../components/projects/projectData';
import PrimaryButton from "../../components/backBtn/PrimaryButton";
import '../../assets/css/pages/projects/projects.css';

const Projects = ({ onNavClick }) => {

    return (
        <div className="page-content">
            <div className="page-section">
                <h1 className="projects-title">Projects/Work Samples</h1>
                <div className="projects-grid">
                    {projectData
                        .filter(p => p.featured)
                        .map((project, idx) => (
                        <article key={idx} className="project-card">
                            <h2>{project.title}</h2>
                            <p className="project-description">{project.description}</p>
                            <ul className="project-tech">
                                {project.tech.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                ))}
                            </ul>
                            <PrimaryButton 
                                clickFn={() => onNavClick('projectView', project.id)}
                                btnClass={'project-button'}
                                btnText={'View Project'}
                            />
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;