async function loadShader(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load shader: ${url}`);
    }
    return await response.text();
}

export const loadShaders = async () => {
    try {
        return {
            vertexShader: await loadShader('/shaders/vertex.glsl'),
            fragmentShader: await loadShader('/shaders/fragment.glsl'),
            atmosphereVertexShader: await loadShader('/shaders/atmosphere-vertex.glsl'),
            atmosphereFragmentShader: await loadShader('/shaders/atmosphere-fragment.glsl'),
        };
    } catch (error) {
        console.error("🚨 Error loading shaders:", error);
        return null;
    }
};
