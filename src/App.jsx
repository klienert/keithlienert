import React, {useEffect, useState} from 'react';
import './App.css';
import PrimaryButton from './components/backBtn/PrimaryButton';
import Home from './pages/home/index';
import Sidebar from './pages/sidebar';
import About from './pages/about';
import Projects from './pages/projects';
import Contact from './pages/contact';
import ProjectView from './pages/projects/projectView';

function App() {

    // Get initial page from URL hash
    const getPageFromHash = () => {
        const hash = window.location.hash.slice(1) || '/';
        if (hash.startsWith('/projects/')) {
            return { page: 'projectView', projectId: hash.split('/')[2] };
        }

        const page = hash === '/' ? 'home' : hash.slice(1);
        return {page, projectId: null};
    };

    // States
    const [currentPage, setCurrentPage] = useState(getPageFromHash());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // nav click handler
    const handleNavClick = (page, projectId = null) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
    
        // Update URL
        let path = page === 'home' ? '/' : `/${page}`;
        if (projectId) {
            path = `/projects/${projectId}`;
        }
        window.location.hash = path;
    };


    // Listen for browser back/forward buttons
    useEffect(() => {
        const handleHashChange = () => { setCurrentPage(getPageFromHash()) };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // useEffect(() => {
    //     console.log('currPage: ', currentPage.page);
    // }, [currentPage.page]);


    return (
        <div className="app">
            <div className="container">
                <Sidebar 
                    currentPage={currentPage.page}
                    onNavClick={handleNavClick}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                <main className="main">
                    {currentPage.page === 'home' && <Home />}
                    {currentPage.page === 'about' && <About />}
                    {currentPage.page === 'projects' && <Projects onNavClick={handleNavClick}/> }
                    {currentPage.page === 'projectView' && (<>
                        <ProjectView projectId={currentPage.projectId} onNavClick={handleNavClick} />
                        <PrimaryButton 
                            clickFn={() => handleNavClick('projects')}
                            btnClass={'btn btn-secondary'}
                            btnText={'Back to Projects'}
                        />
                    </>)
                    }
                    {currentPage.page === 'skills' && <Skills />}
                    {currentPage.page === 'contact' && <Contact />}
                </main>
            </div>
        </div>
    )
}

export default App
