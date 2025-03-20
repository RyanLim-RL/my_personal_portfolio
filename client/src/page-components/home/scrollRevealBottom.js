import react from 'react';
import WorkTogether from './worktogether';
import Footer from './footer';
import '../../styles/home_styles/scrollrevealbottom.css';


const ScrollRevealBottom = () => {
    return (
        <div className="contain-bottom">
            <div className="stick-bottom" style={{ position: "sticky", top: "0px", height: "100dvh", zIndex: -1 }}>
                <WorkTogether />
            </div>
            <div className="stay-botton">
                <Footer />
            </div>
        </div>
    );
}

export default ScrollRevealBottom;