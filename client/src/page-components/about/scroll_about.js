import React from 'react';
import { useEffect, useState } from 'react';
import { useNav } from '../../contexts/navcontext';
import '../../styles/about_styles/scroll_about.css';
import { modules } from './modules';


const ScrollAbout = ({ setBottomUni }) => {
    const [focusedModule, setFocusedModule] = useState(0);
    const { setAboutNavStyle } = useNav();

    useEffect(() => {
        const frame = document.querySelector(".frame");
        if (!frame) return;

        const handleScrollAbout = () => {

            const stickySection = document.querySelector(".stickySection");
            if (!stickySection) return;

            const sectionTop = stickySection.getBoundingClientRect().top;

            const topSection = document.querySelector('.top-about-edu');
            const bottomSection = document.querySelector('.bottom-about-edu');
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

    useEffect(() => {
        const frame = document.querySelector(".frame");
        if (!frame) return;
        const handleScrollNav = () => {
            const scrollAbout = document.querySelector(".scroll-about");
            if (!scrollAbout) return;

            const scrollAboutTop = scrollAbout.getBoundingClientRect().top;
            setAboutNavStyle(scrollAboutTop < 0 ? "blackAbout" : "lightBlue");
        };

        frame.addEventListener("scroll", handleScrollNav);
        return () => frame.removeEventListener("scroll", handleScrollNav);
    }, []);

    useEffect(() => {
        const frame = document.querySelector(".frame");
        if (!frame) return;
        const handleScroll = () => {
            const relativeModuleStick = document.querySelector(".sticky-section-modules-relative");
            if (!relativeModuleStick) return;

            const modulesBot = relativeModuleStick.getBoundingClientRect().bottom;
            setBottomUni(modulesBot);
        };

        frame.addEventListener("scroll", handleScroll);
        return () => frame.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const frame = document.querySelector(".frame");
        if (!frame) return;
        const moduleScroll = () => {
            const relativeModuleStick = document.querySelector(".sticky-section-modules-relative");
            const totalHeight = relativeModuleStick.getBoundingClientRect().bottom - window.innerHeight - relativeModuleStick.getBoundingClientRect().top
            const relativeTop = relativeModuleStick.getBoundingClientRect().top;
            const percentage = -relativeTop / totalHeight;

            const moduleList = document.querySelector(".module-list");
            const translateY = -percentage * 100;
            moduleList.style.transform = `translateY(${translateY}%)`;

            const moduleTitle = document.querySelector(".module-title");

            const midpointModuletitle = moduleTitle.getBoundingClientRect().top + moduleTitle.getBoundingClientRect().height / 2;
            const listItems = document.querySelectorAll(".module-item");

            listItems.forEach((item, index) => {
                const midpointItem = item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2;
                const distance = Math.abs(midpointItem - midpointModuletitle);
                const scale = Math.max(0.30, 1 - distance / 300);
                item.style.transform = `scale(${scale})`;
                item.style.opacity = scale;

                const topItem = item.getBoundingClientRect().top;
                const bottomItem = item.getBoundingClientRect().bottom;
                if (midpointModuletitle > topItem && midpointModuletitle < bottomItem) {
                    item.style.fontWeight = "bold";
                    setFocusedModule(index);
                } else {
                    item.style.fontWeight = "normal";
                }
            });
        }
        frame.addEventListener("scroll", moduleScroll);
        return () => frame.removeEventListener("scroll", moduleScroll);
    }, []);

    useEffect(() => {
        const moduleTitleExplanation = document.querySelector(".module-title-explanation");
        const moduleTitle = document.querySelector(".module-title");
        if (!moduleTitleExplanation) return;

        if (modules[focusedModule].level === "Level 4") {
            moduleTitleExplanation.style.backgroundColor = "#FFC300";
            moduleTitle.style.backgroundColor = "#FFC300";
        } else if (modules[focusedModule].level === "Level 5") {
            moduleTitleExplanation.style.backgroundColor = "#FF5733";
            moduleTitle.style.backgroundColor = "#FF5733";
        } else if (modules[focusedModule].level === "Level 6") {
            moduleTitleExplanation.style.backgroundColor = "#C70039";
            moduleTitle.style.backgroundColor = "#C70039";
        } else {
            moduleTitleExplanation.style.backgroundColor = "#900C3F";
            moduleTitle.style.backgroundColor = "#900C3F";
        }

    }, [focusedModule]);

    return (
        <div className="section-experience">
            <div>.</div>
            <h1 className="title-experience">Education</h1>
            <div className="stickySection">
                <div className="sticked-item">
                    <div className="text-wrapper-education">
                        <div className="education-item-header">
                            <div>
                                <h2>King's College London</h2>
                            </div>
                            <p className="education-duration">Sep 2021 – May 2024</p>
                        </div>
                        <div className='top-about-edu'>
                            <div className="education-uni-details">
                                "Internationally renowned university delivering exceptional education and world-leading research."
                                <br />
                                Part of the Russell Group, a collection of leading UK research universities, it consistently ranks among the top universities in the world.
                            </div>
                            <div className="uniImg">
                                <img
                                    src={process.env.PUBLIC_URL + "/education/maug.jpg"}
                                    alt="strand"
                                    className='edu-uni-img'
                                />
                                <img
                                    src={process.env.PUBLIC_URL + "/education/strand.jpeg"}
                                    alt="strand"
                                    className='edu-uni-img'
                                />
                            </div>
                        </div>
                        <div className='bottom-about-edu'>
                            <p className="education-degree">
                                <strong>Bachelor of Science in Computer Science </strong> <br />
                                specialised in <strong> Artificial Intelligence </strong>
                                <br />
                                <span className="honors">
                                <strong>Graduated with Upper Second Class Honours (2:1)</strong>
                                </span>
                            </p>

                            <p className="my-kcl-experience">
                                Studying at King’s College London has been a transformative experience, both academically and personally.
                                I honed my skills and tackled technical projects that strengthened my problem-solving and teamwork.
                                <br />
                                <br />
                                Beyond academics, I embraced new challenges—climbing a V10, sailing across the British channel, and forming meaningful connections. King’s was a journey of growth, discovery, and unforgettable experiences.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sticky-section-modules-absolute">
                    <div className="sticky-section-modules-relative">
                        <div className='sticky-section-modules-sticked'>
                            <h2>Modules Undertaken</h2>
                            <div className='module-wrapper'>
                                <div className='module-title'>
                                    <ul className="module-list">
                                        {modules.map((mod, index) => (
                                            <li key={index} className="module-item">
                                                {mod.name}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className='module-title-explanation'>
                                    <div className='module-title-explanation-inner'>
                                        <p>{modules[focusedModule].description}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="module-title-key-color">
                                    <p>
                                        <span className='level-4-key'>Level 4</span> - Foundation | <span className='level-5-key'>Level 5</span> - Intermediate
                                        | <span className='level-6-key'>Level 6</span> - Specialization | <span className='level-7-key'>Level 7</span> - Masters*
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ScrollAbout;
