import { useRef, useEffect, useState } from "react";
import "../../styles/home_styles/myskills.css";
import Simulation from "../../utils/naive-particle-sim/simulation.js";


const images = [
  ["/tech_stack/css.svg", "CSS"],
  ["/tech_stack/html.svg", "HTML"],
  ["/tech_stack/js.svg", "Javascript"],
  ["/tech_stack/docker.svg", "Docker"],
  ["/tech_stack/typescript.svg", "Typescript"],
  ["/tech_stack/git.svg", "Git"],
  ["/tech_stack/mongo.svg", "MongoDB"],
  ["/tech_stack/postgresql.svg", "PostgreSQL"],
  ["/tech_stack/prisma.svg", "Prisma"],
  ["/tech_stack/java.svg", "Java"],
  ["/tech_stack/nodejs.svg", "Nodejs"],
  ["/tech_stack/numpy.svg", "NumPy"],
  ["/tech_stack/pandas.svg", "Pandas"],
  ["/tech_stack/python.svg", "Python"],
  ["/tech_stack/pytorch.svg", "Pytorch"],
  ["/tech_stack/react.svg", "React"],
  ["/tech_stack/express.svg", "Express"],
];

const MySkills = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const simulation = useRef(null);
  const particleView = useRef(true);
  const animationRef = useRef(null);
  const skillsRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const changeView = () => {
    particleView.current = !particleView.current;
    const skills = document.getElementsByClassName("skills-list")[0];
    const title = document.getElementsByClassName("skills-title")[0];
    if (!skills || !title) return;

    skills.style.opacity = particleView.current ? "0" : "1";
    skills.style.transition = "opacity 1s";
    const skillsHeight = skills.offsetHeight;
    if (particleView.current) {
      title.style.transform = "translate(-50%, -50%)";
    } else {
      title.style.transform = `translate(-50%, calc(-50% - ${skillsHeight * 1.1}px))`; // Move up dynamically
    }
    title.style.transition = "transform 1s";
  };
  useEffect(() => {
    if (!skillsRef.current) return
    setDimensions({
      width: skillsRef.current.offsetWidth,
      height: skillsRef.current.offsetHeight * 0.8
    });
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      cancelAnimationFrame(animationRef.current);
      const skills = document.getElementsByClassName("myskills")[0];
      if (!skills) return;
      setDimensions({ width: skills.offsetWidth, height: skills.offsetHeight * 0.8 });
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    simulation.current = new Simulation(dimensions, images, particleView.current);
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    function animate() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      simulation.current.update();
      simulation.current.balls.getBalls().forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(234, 234, 234)";
        ctx.globalAlpha = ball.alpha;
        ctx.fill();
        ctx.closePath();

        const imgSize = ball.radius * 1.5;
        ctx.drawImage(ball.image, ball.pos.x - imgSize / 2, ball.pos.y - imgSize / 2, imgSize, imgSize);
      });

      if (!particleView.current) {
        simulation.current.fadeOut();
      } else {
        simulation.current.fadeIn();
      }
      animationRef.current = requestAnimationFrame(animate);
    }


    animate();

    window.addEventListener("mousedown", (event) => {
      simulation.current.click(event.clientX, event.clientY);
    });

    window.addEventListener("mousemove", (event) => {
      simulation.current.drag(event.clientX, event.clientY);
    });

    window.addEventListener("mouseup", () => {
      simulation.current.lift();
    });
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousedown", (event) => {
        simulation.current.click(event.clientX, event.clientY);
      });

      window.removeEventListener("mousemove", (event) => {
        simulation.current.drag(event.clientX, event.clientY);
      });

      window.removeEventListener("mouseup", () => {
        simulation.current.lift();
      });
    }
  }, [dimensions]);
  const lerp = (start, end, factor) => start * (1 - factor) + end * factor;


  useEffect(() => {
    const homeWrapper = document.querySelector(".home-wrapper");
    if (!homeWrapper) return;
    const onScroll = () => {
      if (!skillsRef.current) return;

      const howFar = skillsRef.current.getBoundingClientRect();
      const ratio = Math.min((window.innerHeight - howFar.top) / (howFar.height + window.innerHeight) * 10, 1);

      const dist = (Math.max((window.innerHeight - howFar.top) / (howFar.height + window.innerHeight) - 0.7, 0)) / 0.3;

      const above_0 = Math.max(ratio, 0);

      const curve = document.getElementsByClassName("curve")[0]
      curve.style.transform = `scale3d(1,${above_0},1)`

      const curvebottom = document.getElementsByClassName("curve-bottom")[0]
      curvebottom.style.transform = `scale3d(1.1,${dist},1)`

    };

    homeWrapper.addEventListener("scroll", onScroll);
    return () => homeWrapper.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="myskills" ref={skillsRef}>
      <div className="curve">
        <svg viewBox="0 0 1440 320">
          <path fill="rgb(255, 255, 255)" d={`M 0 0 Q 720 200  1440 0`}></path>
        </svg>
      </div>
      <div className="skills-title">
        <h1>My Skills</h1>
        <p>
          I have experience in the following technologies
        </p>
        <div className="better-view" onClick={changeView}>
          <p>Clearer View</p>
        </div>
      </div>
      <canvas ref={canvasRef} className="skills-canvas"></canvas>
      <ul className="skills-list">
        {images.map((image, index) => (
          <li
            key={index}
            className="skill"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={image[0]} alt={image[1]} />
            {hoveredIndex === index && <span className="hover-text-skill">{image[1]}</span>}
          </li>
        ))}
      </ul>
      <div className="curve-bottom">
        <svg viewBox="0 0 1440 320">
          <path fill="rgb(255, 255, 255)" d="M 0 320 Q 720 100  1440 320"></path>
        </svg>
      </div>
    </div>
  );
}

export default MySkills;
