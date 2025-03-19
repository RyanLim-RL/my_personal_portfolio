import { Routes, Route, Navigate } from "react-router-dom";
import { NavProvider } from "../contexts/navcontext.js";

import Home from "./home/home.js";
import About from "./about/about.js";
import Contact from "./contact/contactme.js";
import Projects from "./projects/projects.js";
import Layout from "./layout/layout.js";
import ProjectDetail from "./projects/project_detail.js";

import "../styles/App.css";
function App() {
  return (
    <NavProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />}/>
          <Route path="/project/:projectID" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </NavProvider>
  );
}

export default App;
