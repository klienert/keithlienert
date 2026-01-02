import WeatherFetch from '../../components/projects/weather/weatherFetch';
import Wordle from '../../components/projects/wordle';
import Trivia from '../../components/projects/trivia';

const ProjectView = ({ projectId, onNavClick }) => {

    const projectComp = {
        'trivia-app' : Trivia,
        'weather-app' : WeatherFetch,
        'wordle-game' : Wordle
    };

    const ProjectComponent = projectComp[projectId];

    if (!ProjectComponent)  {
        return (
            <div className="page-content">
                <h1 className="page-title">Project not found</h1>
            </div>
        )
    }
    
    return (
        <div className="page-content">
            <ProjectComponent onNavClick={onNavClick} />
        </div>
    )
}

export default ProjectView;