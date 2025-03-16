import { useState, useRef, useEffect } from 'react';
import '../../styles/home_styles/projects.css';

const Projects = () => {
    return (
        <div className="projects">
            <svg className="svg_projects" viewBox="0 0 1000 300" preserveAspectRatio="none">
                <path className="curvy-line not_move"
                    d="M 0 150 Q 50 -100, 150 100 T 300 200, 1000 150" />
            </svg>
            <div className="description">I love to create new things and bring them to life.</div>
            <div className="project-list">
                <div className="rotated-title hidden_rotated">PROJECTS</div>
                <div className="project">
                    <div className="project-left">
                        <h3>Formy-AI</h3>
                        <p className="year">2024</p>
                    </div>
                    <div className="project-right">
                        <h4>UI/UX Design & Development</h4>
                        <p>Next.js, PostgreSQL, Clerk, Gemini API...</p>
                    </div>
                </div>

                <div className="project">
                    <div className="project-left">
                        <h3>FileFlex</h3>
                        <p className="year">2024</p>
                    </div>
                    <div className="project-right">
                        <h4>UI/UX Design & Development</h4>
                        <p>Next.js, TypeScript, FFmpeg</p>
                    </div>
                </div>

                <div className="project">
                    <div className="project-left">
                        <h3>Next Dines</h3>
                        <p className="year">2023</p>
                    </div>
                    <div className="project-right">
                        <h4>UI/UX Design</h4>
                        <p>Figma, Notion</p>
                    </div>
                </div>

                <div className="project">
                    <div className="project-left">
                        <h3>Algo-Visualizer</h3>
                        <p className="year">2023</p>
                    </div>
                    <div className="project-right">
                        <h4>Development</h4>
                        <p>React.js, Git</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
