import React from "react";
import keithdrums2 from '../../assets/images/K_Drumset.jpg';

const Home = () => {

    return (
        <div className="page-content">
            <div className="page-section">
                <header className="home-header">
                    <img src={keithdrums2} alt="Keith playing the drums" />
                </header>                
                <div className="home-text">
                    <p>With over twelve years experience as a lecturer in higher education, I have always been interested in working with technology and helping others. Learning to code was the next natural step in my development.</p>
                    <p>With a background in music performance, I have developed an ideal skill set for a programming career: project management, troubleshooting, time management, and attention to detail.</p>
                    <p>Additionally, my work history as an educator has provided me with excellent skills in communication, public speaking, and leadership.</p>
                    <p>Please reach out to me if you have questions or would like to connect!</p>
                </div>
            </div>
        </div>
    )
}

export default Home;