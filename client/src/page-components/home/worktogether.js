//lets work together
import React from 'react';
import '../../styles/home_styles/worktogether.css';

const WorkTogether = () => {
    return (
        <div className='footer'>
            <svg width="100%" className="svg-footer" viewBox="0 0 1000 520" preserveAspectRatio="none">
                <path className="curvy-line4 not_move4" d="M 0 250 
                        C 200 500, 500 500, 700 400 
                        S 600 0, 300 100
                        S 300 500, 600 500
                        S 800 400, 1000 150"
                    stroke="red" fill="none" strokeWidth="5" />
            </svg>
            <div className='footer_text'>
                <h1>Let's work
                    <br />
                    <span>TOGETHER</span></h1>
            </div>
        </div>
    );
}

export default WorkTogether;