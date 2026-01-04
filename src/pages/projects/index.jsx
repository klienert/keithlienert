import React from "react";
import { FaGithub } from "react-icons/fa";
import { projectData } from '../../components/projects/projectData';
import PrimaryButton from "../../components/backBtn/PrimaryButton";
import '../../assets/css/pages/projects/projects.css';

const Projects = ({ onNavClick }) => {

    const gitHubLink = () => {
        window.open('https://github.com/klienert', '_blank');
    }

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
                            <div className="project-button-row">
                                <PrimaryButton 
                                    clickFn={() => onNavClick('projectView', project.id)}
                                    btnClass={'project-button'}
                                    btnText={'View Project'}
                                />
                                <PrimaryButton
                                    clickFn={gitHubLink}
                                    btnClass={'github-button'}
                                    btnText={<FaGithub size="2em"/>}
                                />
                            </div>
                            
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;