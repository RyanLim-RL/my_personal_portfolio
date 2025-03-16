export const addPointsToGlobe = async () => {
    return new Promise((resolve, reject) => {

        const worldMap = new Image();
        worldMap.src = "/globe/earthspec1k.jpg";
        worldMap.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = worldMap.width;
            canvas.height = worldMap.height;
            ctx.drawImage(worldMap, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let points = [];

            for (let y = 0; y < canvas.height; y += 3) {
                for (let x = 0; x < canvas.width; x += 3) {
                    const i = (y * canvas.width + x) * 4;
                    const brightness = data[i] + data[i + 1] + data[i + 2];
                    if (brightness < 200) {
                        const lon = (x / canvas.width) * 360 - 180;
                        const lat = 90 - (y / canvas.height) * 180;
                        points.push({ lat, lon });
                    }
                }
            }
            resolve(points);
        };

        worldMap.onerror = (err) => reject(err);
    });
};

