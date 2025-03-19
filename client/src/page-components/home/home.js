import Animation from './animation';
import NBodyCanvas from './canvas';
import ScrollReveal from './scrollReveal';
import CV from './cv';
import OnePicture from './one_picture';
import Projects from './projects';
import MySkills from './myskills';
import ScrollRevealBottom from './scrollRevealBottom';

import '../../styles/home_styles/home.css';
import { useNav } from '../../contexts/navcontext';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


function Home() {
  const { setNonHome, animationDone, setSwitching, switching, path, setFooter, setPastPoint } = useNav();
  const location = useLocation();

  useEffect(() => {
    let homeTimeoutID
    if (location.pathname === path) {
      homeTimeoutID = setTimeout(() => {
        setSwitching(false);
        setNonHome(false);
      }, 1500);
    }
    return () => clearTimeout(homeTimeoutID);
  }, [switching]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('footer-pong')) {
          if (entry.isIntersecting) {
            setFooter(true);
          } else {
            setFooter(false);
          }
          return;
        }

        if (entry.isIntersecting) {
          if (entry.target.classList.contains('no_highlight')) {
            entry.target.classList.remove('no_highlight');
            entry.target.classList.add('highlighted');
            return;
          }
          if (entry.target.classList.contains('not_move')) {
            entry.target.classList.remove('not_move');
            entry.target.classList.add('move_left');
            return;
          }
          if (entry.target.classList.contains('not_move2')) {
            entry.target.classList.remove('not_move2');
            entry.target.classList.add('move_left2');
            return;
          }
          if (entry.target.classList.contains('not_move3')) {
            entry.target.classList.remove('not_move3');
            entry.target.classList.add('move_left3');
            return;
          }
          if (entry.target.classList.contains('not_move4')) {
            entry.target.classList.remove('not_move4');
            entry.target.classList.add('move_left4');
            return;
          }
          if (entry.target.classList.contains('hidden_rotated')) {
            entry.target.classList.remove('hidden_rotated');
            entry.target.classList.add('show');
            return;
          }
        }
      });
    }, { threshold: 0.1 });

    const highlightedElements = document.querySelectorAll('.no_highlight');
    const hidden_rotatedElements = document.querySelectorAll('.hidden_rotated');
    const noMoveElements = document.querySelectorAll('.not_move');
    const curveCv = document.querySelectorAll('.not_move2');
    const curvetextTop = document.querySelectorAll('.not_move3');
    const curveFooter = document.querySelectorAll('.not_move4');
    const footerContainer = document.querySelectorAll('.footer-pong');

    [...highlightedElements, ...noMoveElements, ...hidden_rotatedElements, ...curveCv, ...curvetextTop, ...curveFooter, ...footerContainer].forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [animationDone]);

  useEffect(() => {
    const homeWrapper = document.querySelector(".home-wrapper");
    if (!homeWrapper) return;
    const checkScroll = () => {
      const isScrolled =
        homeWrapper.scrollTop >
        window.innerHeight - document.querySelector(".navbar")?.clientHeight;
      setPastPoint(isScrolled);
    };
    homeWrapper.addEventListener("scroll", checkScroll);
    return () => homeWrapper.removeEventListener("scroll", checkScroll);
  }, [animationDone]);

  return (
    <div className="home">
      {
        !animationDone ? (
          <Animation />
        ) : (
          <div className='home-wrapper'>
            <div className='main_page'>
              <NBodyCanvas />
              <ScrollReveal />
              <CV />
              <OnePicture />
              <Projects />
              <MySkills />
              <ScrollRevealBottom />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Home;
