import React, { useEffect, useState } from "react";
import { useNav } from "../../contexts/navcontext";
import { useLocation } from "react-router-dom";
import Globe from "./globe";
import ScrollAbout from "./scroll_about";
import MalaysiaAbout from "./malaysia_about";

import "../../styles/about_styles/about.css";
import Footer from "../home/footer";

const About = () => {
  const { setNonHome, setSwitching, switching, path } = useNav();
  const location = useLocation();
  const [sTop, setSTop] = useState(0);
  const [frameSize, setFrameSize] = useState(0);
  const [bottomUni, setBottomUni] = useState(0);

  useEffect(() => {
    let timeoutIDAbout;
    if (location.pathname === path) {
      timeoutIDAbout = setTimeout(() => {
        setSwitching(false);
        setNonHome(true);
      }, 1500);
    }
    return () => clearTimeout(timeoutIDAbout);
  }, [switching]);

  useEffect(() => {
    const header = document.querySelector(".title-about");
    if (!header) return;
    header.style.opacity = 1;
    header.style.transform = "translate(-50%,0)";
  }, []);

  useEffect(() => {
    const frame = document.querySelector(".frame");
    if (!frame) return;
    const handleScroll = () => {
      setSTop(frame.scrollTop);
    };
    frame.addEventListener("scroll", handleScroll);
    return () => frame.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const frame = document.querySelector(".frame");
    if (!frame) return;
    frame.style.width = "90vw";
    frame.style.height = "90vh";
    frame.style.borderTopLeftRadius = "20px";
    frame.style.borderTopRightRadius = "20px";
    if (sTop > 10) {
      frame.style.width = "100vw";
      frame.style.height = "100vh";
      frame.style.borderTopLeftRadius = "0px";
      frame.style.borderTopRightRadius = "0px";
    }
  }, [sTop]);

  useEffect(() => {
    const frame = document.querySelector(".frame");
    if (!frame) return;
    setFrameSize(frame.clientHeight);
  }, [sTop]);



  return (
    //Globe in layout.js to allow Fixed
    <div className="about-page">
      <div className="side-text left">
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
      </div>
      <div className="side-text right">
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
        <p>I Love Noodles</p>
      </div>
      <div className="frame">
        <Globe sTop={sTop} frameSize={frameSize} bottomUni={bottomUni}/>
        <div className="section-about">
          <h1 className="title-about">-ABOUT RYAN-</h1>
        </div>
        <div className="section-about">
          <h1 className="title-about-from-country">Made in Malaysia</h1>
          <p className="about-from-country">Specifically Kuala Lumpur</p>
        </div>
        <div className="section-about">
          <h1 className="title-about-to-country">
            <span>Moved to the</span> <br></br> United Kingdom
          </h1>
        </div>
        <div className="section-about">
          <h1 className="title-about-to-uni">
            <span>To study at </span> <br></br> Kings College London
          </h1>
        </div>
        <div className="section-about">
          <h1 className="title-about-to-globe">
            Operational <br></br> <span>WORLDWIDE</span>
          </h1>
        </div>
        <ScrollAbout setBottomUni={setBottomUni} />
        <div className="section-about">
        </div>
        <div className="section-about">
        </div>
        <div className="section-about">
          <h1 className="title-about-to-home">
            Just a quick 13-hour <br /> <span>FLIGHT</span>
          </h1>
        </div>
        <div className="section-about">
        </div>
        <div className="section-about">
        </div>
        < MalaysiaAbout/>
        <div className="section-about">
        </div>
        <div className="section-about">
        </div>
        <div className="section-about">
        </div>
        <div className="section-about">
        </div>
        < Footer/>
      </div>
    </div>
  );
};

export default About;
