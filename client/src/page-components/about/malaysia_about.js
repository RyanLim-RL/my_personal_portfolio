import React, { useEffect } from "react";
import "../../styles/about_styles/malaysia.css";

const MalaysiaAbout = () => {
     useEffect(() => {
            const frame = document.querySelector(".frame");
            if (!frame) return;
    
            const handleScrollAbout = () => {
    
                const stickySection = document.querySelector(".sticky-section-mal");
                if (!stickySection) return;
    
                const sectionTop = stickySection.getBoundingClientRect().top;
    
                const topSection = document.querySelector('.top-about-edu-mal');
                const bottomSection = document.querySelector('.bottom-about-edu-mal');
                if (sectionTop < -10 - window.innerHeight * 2) {
                } else if (sectionTop < -10 - window.innerHeight) {
                    topSection.style.display = "none";
                    bottomSection.style.display = "block";
                    bottomSection.style.opacity = Math.max(0, -(sectionTop + 10 + window.innerHeight) / (window.innerHeight));
                } else if (sectionTop < -10) {
                    topSection.style.display = "block";
                    bottomSection.style.display = "none";
                    topSection.style.opacity = Math.max(0, 1 + (sectionTop + 10) / (window.innerHeight));
                } else {
                    topSection.style.display = "block";
                    bottomSection.style.display = "none";
                    topSection.style.opacity = 1;
                }
            };
    
            frame.addEventListener("scroll", handleScrollAbout);
            return () => frame.removeEventListener("scroll", handleScrollAbout);
        }, []);

    return (
        <div className="section-malaysia">
            <h1 className="title-experience-mal">Education Continued</h1>
            <div className="sticky-section-mal">
                <div className="sticked-item-mal">
                    <div className="text-wrapper-education">
                        <div className="education-item-header-mal">
                            <p className="education-duration-mal">Sep 2019 – Jun 2021</p>
                            <div>
                                <h2>Kolej Yayasan UEM</h2>
                            </div>
                        </div>
                        <div className='top-about-edu-mal'>
                            <div className="education-mal-details">
                                <div>
                                KYUEM is a premier boarding school in Malaysia, renowned for its rigorous Cambridge A-Level program. The school’s academic culture emphasizes critical thinking, independence, and excellence, preparing students for success in competitive global institutions.
                                </div>
                            </div>
                            <div className="ky-img">
                                <img
                                    src={process.env.PUBLIC_URL + "/education/ky-be.jpg"}
                                    alt="strand"
                                    className='edu-ky-img'
                                />
                                <img
                                    src={process.env.PUBLIC_URL + "/education/outside-cafe.png"}
                                    alt="strand"
                                    className='edu-ky-img'
                                />
                            </div>
                        </div>
                        <div className='bottom-about-edu-mal'>
                            <p className="education-alevels-mal">
                                <strong>Cambridge International AS & A Levels and IELTS</strong>                                 
                                <br />
                                <span className="alevels-mal-details">
                                <strong>3 A*s </strong>in Mathematics, Further Mathematics & Physics and an <strong>A</strong> in Chemistry
                                    <br/>
                                    Overall Band Score: <strong>7.5</strong> (Listening: 8.5, Reading: 8.0, Speaking: 8.0, Writing: 6.0)
                                </span>

                            </p>

                            <p className="my-ky-experience">
                            During my time at Kolej Yayasan UEM, living in the middle of the jungle fostered a unique campus culture—one where tight-knit friendships formed over late-night study sessions and spontaneous adventures. Serving as the Sports Executive in the Student Council taught me leadership and teamwork, while the relentless academic rigor pushed me to burn the midnight oil, preparing for the next big step.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="kdu-section-mal">
                <div className="text-wrapper-education">
                        <div className="education-item-header-mal-kdu">
                            <div>
                                <h2>SRI KDU International School</h2>
                            </div>
                            <p className="education-duration-mal">Sep 2016 – Jun 2019</p>
                        </div>
                        
                        <p className="education-kdu-mal">
                            <strong>International General Certificate of Secondary Education(IGCSE)</strong>                                 
                            <br />
                            <span className="kdu-mal-details">
                            <strong>5 A*s & 4 As </strong>   (A*s in Mathematics, Additional Mathematics & Sciences and an A in Computer Science)
                                <br/>
                                
                            </span>

                        </p>

                        <p className="my-kdu-experience">
                        At Sri KDU International School, I immersed myself in academics while discovering a passion for climbing. Participating in the Duke of Edinburgh’s Award honed my leadership and resilience, while the school’s environment nurtured my love for math and science.
                        <br/>
                        <br/>
                        All this without a worry in the world.
                        </p>
                        
                    </div>
                </div>
            </div>
           

        </div>
    );
}

/*
   <div className="education-item">
              **IGCSEs:** 5 A*s & 4 As (including A*s in Mathematics, Additional
              Mathematics, and Sciences) <br />
            </p>
          </div>
          */


export default MalaysiaAbout;