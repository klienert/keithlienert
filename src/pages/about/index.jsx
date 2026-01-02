import React from "react";
import { Link } from "react-router-dom";

const About = () => {

    const education = [
        {college: 'Madison College', year: 2024, degree: 'Associates of Applied Science - IT Web Software Developer'},
        {college: 'University of Wisconsin', year: 2017, degree: 'DMA - Doctorate of Music'},
        {college: 'Arizona State University', year: 2003, degree: 'MM - Master of Music'},
        {college: 'Northern Illinois University', year: 2000, degree: 'BM - Bachelors of Music'},
        
    ];

    const experience = [
        {name: "Educational Service Center, Region 6", title: "Web Developer", duties: ['Maintain and update the current eduhero.net site and collaborate in the development of a new version of the site using a JavaScript-React-based stack.', 'Recent accomplishments include API integration with third-party vendors, accessibility enhancements, and general updates.'], beg_year: 2023, end_year: null, links: {name: 'Eduhero', url: 'https://www.eduhero.net'}},
        {name: "State of Wisconsin, Division of Enterprise Technology", title: "Mainframe Internship", duties: ['Received training on various software components, developed daily and weekly reports on API data acquired through a version control software on the mainframe.', 'Transferrable skills include Collaboration, Project Management, Troubleshooting, and Effective Communication in a corporate enterprise environment'], beg_year: 2021, end_year: 2021},
        {name: "University of Wisconsin-Platteville", title: "Lecturer", duties: ['Taught courses in Percussion, Music Theory, Music Technology, and Music Appreciation', 'Transferrable skills include Instruction and Mentorship, Project Analysis and Management, Leadership and Delegation, and Public Speaking'], beg_year: 2010, end_year: 2022},        
    ];

    return(
        <div className="page-content">
            <div className="page-section">
                <h1 className="about-title">About Me</h1>
                <div className="about-cols">
                    <section className="about-card">
                        <h2>Education</h2>
                        <ul>                            
                            {education.map((e, i) => (
                                <li key={`${i}_ed`}>
                                    <h3>{e.college} ({e.year})</h3>
                                    <p className="about-meta">{e.degree}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="about-card">
                        <h2>Experience</h2>
                        <ul>
                            {experience.map((e, i) => (
                                <li key={`${i}_exp`}>
                                    <h3>{e.title}</h3>
                                    <p className="about-meta">{e.name} | {e.beg_year} {e.end_year ? `- ${e.end_year}` : ''}</p>
                                    <p className="about-text">{e.duties.map((s) => <>{s} </>)}</p>
                                    {e?.links && 
                                        <Link 
                                            to={e.links.url}
                                            target="_blank"
                                        >
                                            {e.links.name}
                                        </Link>
                                    }
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>        
    );
}

export default About;