// import React from "react";
import '../../assets/css/pages/sidebar/sidebar.css'
import keithPic from '../../assets/images/KeithLienert_biopic.jpg'
import { CiMenuBurger } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';

const Sidebar = ({
    currentPage, 
    onNavClick,
    mobileMenuOpen,
    setMobileMenuOpen
}) => {

    const copyright = () => {
        const currYear = new Date().getFullYear();
        return `@ Copyright ${currYear} | All rights reserved`;
    }

    return (<>
        {/* mobile button */}
        <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle Menu'
        >
            {mobileMenuOpen ? <IoMdClose size={28} /> : <CiMenuBurger size={28} /> }
        </button>
        <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <img src={keithPic} alt="Keith Lienert Photo" />
                <h1 className="sidebar-title">Keith Lienert</h1>
                <p className="sidebar-head-text">Full Stack Developer</p>
            </div>
            <nav className="sidebar-nav">
                <div className="navbar">
                    <button
                        onClick={() => onNavClick('home')}
                        className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => onNavClick('about')}
                        className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => onNavClick('projects')}
                        className={`nav-link ${currentPage === 'projects' ? 'active' : ''}`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => onNavClick('contact')}
                        className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                    >
                        Contact
                    </button>
                </div>
            </nav>
            <div className="sidebar-footer">
                <p>{copyright()}</p>                
            </div>
        </aside>
        {/* Mobile Overlay */}
    {mobileMenuOpen && (
    <div 
        className="mobile-overlay" 
        onClick={() => setMobileMenuOpen(false)}
    />
    )}
    </>)

}

export default Sidebar;