import React, { useState, useRef, useEffect } from "react";
import { useNav } from "../../contexts/navcontext";
import "../../styles/layout_styles/player.css";

const Player = ({ style }) => {
  const { playMusic } = useNav();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + "/music/jazz_BossaNova_BGM.mp3");

    if (playMusic) {
      setTimeout(() => {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }, 1000);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        const circle_down = document.getElementsByClassName("c_right_play")[0];
        if (circle_down) {
          circle_down.style.transform = "translateY(0%)";
          circle_down.style.transition = "transform 0.4s ease-in-out";
        }
      });

      const circle_down = document.getElementsByClassName("c_right_play")[0];
      if (circle_down) {
        circle_down.style.transform = "translateY(-100%)";
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
        audioRef.current = null;
      }
    };
  }, [playMusic]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      const circle_down = document.getElementsByClassName("c_right_play")[0];
      if (circle_down) {
        circle_down.style.transform = "translateY(0%)";
        circle_down.style.transition = "transform 0.4s ease-in-out";
      }
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
      const circle_down = document.getElementsByClassName("c_right_play")[0];
      if (circle_down) {
        circle_down.style.transform = "translateY(-100%)";
        circle_down.style.transition = "transform 0.4s ease-in-out";
      }
    }
  };


  useEffect(() => {
    if (style === "whitePurple") {
      setImageSrc(
        isPlaying
          ? process.env.PUBLIC_URL + "/music/piano_white.svg"
          : process.env.PUBLIC_URL + "/music/piano_black.svg"
      );
    } else if (style === "transparent") {
      setImageSrc(
        isPlaying
          ? process.env.PUBLIC_URL + "/music/piano_black.svg"
          : process.env.PUBLIC_URL + "/music/piano_white.svg"
      );
    } else if (style === "black") {
      setImageSrc(
        isPlaying
          ? process.env.PUBLIC_URL + "/music/piano_white.svg"
          : process.env.PUBLIC_URL + "/music/piano_black.svg"
      );
    } else if (style === "red") {
      setImageSrc(
        isPlaying
          ? process.env.PUBLIC_URL + "/music/piano_white.svg"
          : process.env.PUBLIC_URL + "/music/piano_black.svg"
      );
    } else if (style === "orange") {
      setImageSrc(
        isPlaying
          ? process.env.PUBLIC_URL + "/music/piano_black.svg"
          : process.env.PUBLIC_URL + "/music/piano_black.svg"
      );
    } else if (style === "blackAbout") {
      setImageSrc(
        isPlaying
          ? process.env.PUBLIC_URL + "/music/piano_white.svg"
          : process.env.PUBLIC_URL + "/music/piano_white.svg"
      );
    } else if (style === "lightpurple") {
      setImageSrc(
        isPlaying
          ? process.env.PUBLIC_URL + "/music/piano_black.svg"
          : process.env.PUBLIC_URL + "/music/piano_black.svg"
      );
    }
  }, [isPlaying, style]);

  return (
    <div className="playerDiv">
      <button onClick={togglePlayPause} className="playerButton">
        <img src={imageSrc} className="pause" alt="Music Icon" />
      </button>
      <div className="c_right_play"></div>
    </div>
  );
};

export default Player;