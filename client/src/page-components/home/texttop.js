import React from "react";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../contexts/navcontext";
import "../../styles/home_styles/texttop.css";

const TextTop = () => {
    const { switching, setSwitching } = useNav();
    const navigate = useNavigate();

    const handleClick = (path) => {
        if (switching) return;
        setSwitching(true);
        setTimeout(() => {
            navigate(path);
        }, 1500);
    };

    return (
        <div className="about-me-section">
            <svg className="svg_projects" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path className="curvy-line not_move3" d="M 0 100 Q 100 1000, 1000 400" />
            </svg>
            <div className="about-me-content">
                <div className="about-me-header">
                    <div className="meet">Meet Ryan.</div>
                    <div className="profile" onClick={() => handleClick("/about")}><img src={process.env.PUBLIC_URL + "/about_me_main/cornwall_wide.jpg"} alt="profile" /></div>
                </div>
                <p>
                    I'm a <span className="highlight blue no_highlight">London-based computer scientist with a strong passion for AI, mathematics,
                        and problem-solving.</span>
                </p>
                <p>
                    I graduated from <span className="highlight orange no_highlight">King’s College London in 2024, specialising
                        in Artificial Intelligence</span>, where I developed a deep appreciation for AI methodologies
                    and the maths that underpins them
                </p>
                <p>
                    Whether it’s <span className="highlight pink no_highlight">working with AI models, refining development workflows, diving into physics simulations or web development</span>, I’m always excited to push my knowledge and develop products/solutions for myself and others
                </p>
            </div>
        </div>
    );
}

export default TextTop;