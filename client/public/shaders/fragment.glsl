varying vec3 vertexNormal;

void main() {
    float gradient = (vertexNormal.x + 1.0) / 2.0; // Normalize -1 to 1 → 0 to 1

    vec3 colorTop = vec3(0.6, 0.2, 0.3);
    vec3 colorBottom = vec3(0.0, 0.0, 0.2); // Dark blue (bottom)

    vec3 gradientColor = mix(colorBottom, colorTop, gradient);

    // ✅ Fix: Convert vec3 to vec4 by adding an alpha channel (opacity = 1.0)
    gl_FragColor = vec4(gradientColor, 1.0);
}