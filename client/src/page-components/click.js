export const playClick = (playMusic) => {
    if (!playMusic) return;
    
    const audio = new Audio("/music/click.mp3");
    audio.play().catch(error => console.error("Playback failed:", error));
};