import React, { useEffect } from "react";
import "../../styles/contact_styles/links.css";
const FindMe = () => {
    const email = "ryanlim.ryml@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                const confirm = document.getElementsByClassName("copied-confirm-links")[0];
                confirm.style.opacity = 1;
                confirm.style.transform = "translateX(-25%)";
                setTimeout(() => {
                    confirm.style.opacity = 0;
                    confirm.style.transform = "translateX(0%)";
                }, 2000);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };


    return (
        <div className="links-wrapper">
            <div className="links">
                <div className="iconwrap-links">
                    <a href="https://github.com/RyanLim-RL">
                        <img id="github" src={process.env.PUBLIC_URL + "/find_me_icons/github.svg"} alt="github">
                        </img>
                    </a>
                </div>
                <div className="iconwrap-links">
                    <a href="https://www.linkedin.com/in/ryan-lim-26baa7295/">
                        <img id="linkedin" src={process.env.PUBLIC_URL + "/find_me_icons/linkedin.svg"} alt="linkedin">
                        </img>
                    </a>
                </div>
                <div className="iconwrap-links">
                    <a href="https://leetcode.com/u/Ryan_Lim/">
                        <img id="leetcode" src={process.env.PUBLIC_URL + "/find_me_icons/leetcode.svg"} alt="leetcode">
                        </img>
                    </a>
                </div>
                <div className="iconwrap-links">
                    <a href="https://medium.com/@ryanlim.ryml">
                        <img id="medium" src={process.env.PUBLIC_URL + "/find_me_icons/medium.svg"} alt="medium">
                        </img>
                    </a>
                </div>
                <div className="iconwrap-links">
                    <a href="https://discordapp.com/users/314766465477640193">
                        <img id="discord" src={process.env.PUBLIC_URL + "/find_me_icons/discord.svg"} alt="discord">
                        </img>
                    </a>
                </div>
                <div className="line-links"></div>
                <div className="iconwrap-links" onClick={copyToClipboard}>
                    <img id="mail" src={process.env.PUBLIC_URL + "/find_me_icons/email.svg"} alt="mail">
                    </img>

                </div>
            </div>
            <div className="copied-confirm-links">
                <p>Email Copied!</p>
            </div>
        </div>
    );
};
export default FindMe;