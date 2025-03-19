import "../../styles/home_styles/pictureslider.css";
import React, { useEffect } from "react";

const PictureSlider = () => {
    useEffect(() => {
        const homeWrapper = document.querySelector(".home-wrapper");
        if (!homeWrapper) return;
        const scrollHandler = () => {
            const twoPictures = document.getElementsByClassName("two_pictures")[0];
            const left = document.getElementsByClassName("left_img")[0];
            const right = document.getElementsByClassName("right_img")[0];
            const text = document.getElementsByClassName("twopicture_title")[0];
            const leftDiv = document.getElementsByClassName("left")[0];
            const rightDiv = document.getElementsByClassName("right")[0];


            if (!twoPictures || !left || !right || !text) return;
            const relativeBase = homeWrapper.scrollTop / window.innerHeight;
            
            if (relativeBase > 1 && relativeBase < 2) {
                left.style.transform = `translateY(${(relativeBase) * 100}px)`;
                right.style.transform = `translateY(${(relativeBase) * 100}px)`;
                leftDiv.style.transform = `translateX(0px)`;
                rightDiv.style.transform = `translateX(0px)`;
                text.style.transform = `translateY(0%)`;

            }
            else if (relativeBase > 2 && relativeBase < 2.4) {
                leftDiv.style.transform = `translateX(0px)`;
                rightDiv.style.transform = `translateX(0px)`;
                leftDiv.style.borderRadius = "0px";
                rightDiv.style.borderRadius = "0px";
                text.style.transform = `translateY(${(relativeBase - 2) * 300}%)`;

            } else if (relativeBase > 2.4 && relativeBase < 2.5) {
                rightDiv.style.transform = `translateX(0px)`;
                leftDiv.style.transform = `translateX(0px)`;
                text.style.transform = "translateY(150%)";
                leftDiv.style.borderRadius = "0px";
                rightDiv.style.borderRadius = "0px";


            }
            else if (relativeBase > 2.5) {
                left.style.transform = `translateY(200px)`;
                right.style.transform = `translateY(200px)`;
                leftDiv.style.transform = `translateX(-${(relativeBase - 2.5) * 500}px)`;
                rightDiv.style.transform = `translateX(${(relativeBase - 2.5) * 500}px)`;
                leftDiv.style.borderRadius = `${(relativeBase - 2.5) * 500}px`;
                rightDiv.style.borderRadius = `${(relativeBase - 2.5) * 500}px`;
                text.style.transform = "translateY(150%)";
            }
        }
        homeWrapper.addEventListener("scroll", scrollHandler);
        return () => homeWrapper.removeEventListener("scroll", scrollHandler);
    }, []);
    return (
        <div className="pictures">
            <div className="outline">
                <div className="two_pictures">
                    <div className="twopicture_title">
                        <p className="small">I'm based in</p>
                        <p className="london">LONDON</p>
                    </div>
                    <div className="left">
                        <img src={process.env.PUBLIC_URL + "/about_me_main/drippy_left.png"} alt="1" className="left_img" />
                    </div>
                    <div className="right">
                        <img src={process.env.PUBLIC_URL + "/about_me_main/drippy.jpg"} alt="2" className="right_img" />
                    </div>

                </div>
                <div className="behind_picture">
                    <div className="main_picture_title">
                        <p className="main_picture_text">Globally Driven.</p>
                    </div>
                    <div className='main_picture'>
                        <img
                            src={process.env.PUBLIC_URL + "/about_me_main/grad.JPG"}
                            alt="grad"
                            className='gradImage2'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PictureSlider;