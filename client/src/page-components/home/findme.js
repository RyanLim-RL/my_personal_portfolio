import "../../styles/home_styles/findme.css";
const FindMe = () => {
    const email = "ryanlim.ryml@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                const confirm = document.getElementsByClassName("copied-confirm")[0];
                confirm.style.opacity = 1;
                if(window.innerWidth < 600) confirm.style.transform = "translateY(-100%)";
                else confirm.style.transform = "translateX(75.5%)";
                setTimeout(() => {
                    confirm.style.opacity = 0;
                    confirm.style.transform = "translateX(0%)";
                }, 2000);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };
    let timeout;
    const mousePosstion = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const findMe = document.getElementsByClassName("findme")[0];
            if (!findMe) return
            const findMeRect = findMe.getBoundingClientRect();
            const relativeX = (e.clientX - findMeRect.left) / findMeRect.width;
            const icons = document.getElementsByClassName("iconwrap");
            for (let i = 0; i < icons.length; i++) {
                const iconRect = icons[i].getBoundingClientRect();
                const mid_icon = ((iconRect.left + (iconRect.right - iconRect.left) / 2) - findMeRect.left) / findMeRect.width;
                const diff = 0.4 - Math.abs(relativeX - mid_icon);
                if (diff > 0) {
                    icons[i].style.transform = `translateY(${-diff * 30}px)`;
                    icons[i].style.border = `${diff * 20}px solid rgba(80, 70, 181, 0.8)`;

                }
            }
        }, 10);
    }
    const reset = () => {
        const icons = document.getElementsByClassName("iconwrap");
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.transform = `translateY(0px)`;
            icons[i].style.border = `0px solid rgba(105,105,105,0.2)`;
        }
    }


    return (
        <div className="findme-wrapper" onMouseMove={mousePosstion} onMouseLeave={reset}>
            <div className="findme">
                <div className="iconwrap">
                    <a href="https://github.com/RyanLim-RL">
                        <img id="github" src={process.env.PUBLIC_URL + "/find_me_icons/github.svg"} alt="github">
                        </img>
                    </a>
                </div>
                <div className="iconwrap">
                    <a href="https://www.linkedin.com/in/ryan-lim-26baa7295/">
                        <img id="linkedin" src={process.env.PUBLIC_URL + "/find_me_icons/linkedin.svg"} alt="linkedin">
                        </img>
                    </a>
                </div>
                <div className="iconwrap">
                    <a href="https://leetcode.com/u/Ryan_Lim/">
                        <img id="leetcode" src={process.env.PUBLIC_URL + "/find_me_icons/leetcode.svg"} alt="leetcode">
                        </img>
                    </a>
                </div>
                <div className="iconwrap">
                    <a href="https://medium.com/@ryanlim.ryml">
                        <img id="medium" src={process.env.PUBLIC_URL + "/find_me_icons/medium.svg"} alt="medium">
                        </img>
                    </a>
                </div>
                <div className="iconwrap">
                    <a href="https://discordapp.com/users/314766465477640193">
                        <img id="discord" src={process.env.PUBLIC_URL + "/find_me_icons/discord.svg"} alt="discord">
                        </img>
                    </a>
                </div>
                <div className="line"></div>
                <div className="iconwrap" onClick={copyToClipboard}>
                    <img id="mail" src={process.env.PUBLIC_URL + "/find_me_icons/email.svg"} alt="mail">
                    </img>

                </div>
            </div>
            <div className="copied-confirm">
                <p>Email Copied!</p>
            </div>
        </div>
    );
};
export default FindMe;