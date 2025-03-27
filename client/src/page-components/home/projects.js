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
                <a href="https://github.com/TomHurford/TeamTeam-BookingApp" className="project">
                    <div className="project-left">
                        <h3>Ticketopia</h3>
                        <p className="year">2023</p>
                    </div>
                    <div className="project-right">
                        <h4>Event Booking App</h4>
                        <p>React, Node, Express, Prisma, Postgres, Git</p>
                    </div>
                </a>
                
                <a href="https://github.com/RyanLim-RL/Finance_Tracker" className="project">
                    <div className="project-left">
                        <h3>Finance Tracker</h3>
                        <p className="year">2024</p>
                    </div>
                    <div className="project-right">
                        <h4>Financial Analysis</h4>
                        <p>Python, Pytorch</p>
                    </div>
                </a>

           

                <a href="https://github.com/A-Gully/one-of-us" className="project">
                    <div className="project-left">
                        <h3>VolleyBall Team App</h3>
                        <p className="year">2025</p>
                    </div>
                    <div className="project-right">
                        <h4>Team creation and management</h4>
                        <p>Flutter, Firebase</p>
                    </div>
                </a>

                <a href="https://github.com/RyanLim-RL/my_personal_portfolio" className="project">
                    <div className="project-left">
                        <h3>Personal-Portfolio</h3>
                        <p className="year">2025</p>
                    </div>
                    <div className="project-right">
                        <h4>Showcase</h4>
                        <p>React, Express, Node</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Projects;
