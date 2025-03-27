import "../../styles/home_styles/scrollReveal.css";
import TextTop from "./texttop";
import TwoPictures from "./picturesslider";

function ScrollReveal() {
  return (
    <div className="contain">
      <div className="rel">
        <TextTop />
      </div>
      <div className="stick" style={{ position: "sticky", top: "0px", height: "100dvh", zIndex: 1 }}>
        <TwoPictures />
      </div>
    </div>
  );
}

export default ScrollReveal;