import React from "react";
import "../../styles/home_styles/cv.css";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";

const CV = () => {
    return (
        <section className="cv-section">
            <svg className="svg-cv" width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path className="curvy-line2 not_move2" d="M 1000 250 T 700 200, 0 250" />
            </svg>
            <div className="container-cv">
                <h2>Here's My <span>CV</span></h2>
                <p>Take a look at my professional background and experience.</p>

                <div className="cv-buttons">
                    {/* Download CV Button */}
                    <a href="/cv/Ryan_Lim_CV.pdf" className="cv-btn download-btn" download>
                        <FaDownload className="cv-icon" /> Download
                    </a>

                    {/* View Online Button */}
                    <a href="https://docs.google.com/document/d/1qiyGkdLTSCAg8v0reRO7VlNLYfAa144QrRaE825w_ro/edit?usp=sharing" className="cv-btn view-btn" target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt className="cv-icon" /> View
                    </a>
                </div>
            </div>

        </section>
    );
};

export default CV;