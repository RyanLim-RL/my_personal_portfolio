import { useEffect } from 'react';
import { useNav } from "../../contexts/navcontext";
import Slime from './slime.js';
import Form from './form.js';
import Links from './links.js'
import { useLocation } from 'react-router-dom';
import "../../styles/contact_styles/contact.css";

const Contact = () => {

  const { setNonHome, setSwitching, switching, path, setPath } = useNav();
  const location = useLocation();
  useEffect(() => {
    let timeoutID
    if (location.pathname === path) {
      timeoutID = setTimeout(() => {
        setSwitching(false);
        setNonHome(true);
      }, 1500);
    }
    return () => clearTimeout(timeoutID);
  }, [switching]);

  return (
    <div>
      <Slime />
      <div className='contact-container'>
        <Links />
        <Form />
      </div>
    </div>
  );
}

export default Contact;