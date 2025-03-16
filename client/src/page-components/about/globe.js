import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadShaders } from "../../utils/globe_utils/loadshader";
import { addPointsToGlobe } from "../../utils/globe_utils/points";
import { latLongToVector3 } from "../../utils/globe_utils/longlatcoords";
import gsap from "gsap";
import "../../styles/about_styles/globe.css";



const Globe = ({ sTop, frameSize, bottomUni }) => {
    const mountRef = useRef(null);
    const animationID = useRef(null);

    const animationIDBot = useRef(null);


    // Store Three.js objects in refs to use in multiple effects
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const groupRef = useRef(null);
    const hasInitializedRef = useRef(false);
    const radius = 6.2;
    const [isScrollBlocked, setIsScrollBlocked] = useState(true);
    const globePos = useRef({ x: 0, y: 0, z: 0 });
    const globeRot = useRef({ x: 0, y: 0, z: 0 });
    const tubeRefMU = useRef({});

    const initializeScene = () => {
        if (mountRef.current) {
            while (mountRef.current.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }
        }
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 13;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        mountRef.current.appendChild(renderer.domElement);

        // Store in refs for access in other functions
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
    };


    const initializeGlobe = async (shaders) => {
        const scene = sceneRef.current;
        if (!scene || !shaders) {
            console.error("🚨 Scene or shaders not available!");
            return;
        }

        const globeGeometry = new THREE.SphereGeometry(radius - 0.01, 50, 50);
        const globeMaterial = new THREE.ShaderMaterial({
            vertexShader: shaders.vertexShader,
            fragmentShader: shaders.fragmentShader,
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);


        const atmosphereGeometry = new THREE.SphereGeometry(5, 50, 50);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            vertexShader: shaders.atmosphereVertexShader,
            fragmentShader: shaders.atmosphereFragmentShader,
            side: THREE.BackSide,
        });
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        atmosphere.scale.set(1.3, 1.3, 1.3);

        const group = new THREE.Group();
        group.add(globe);
        group.add(atmosphere);
        scene.add(group);
        group.position.y = window.innerHeight / 20;

        groupRef.current = group;
    };

    const initializePoints = async () => {
        const scene = sceneRef.current;
        const group = groupRef.current;
        if (!scene || !group) return;

        const positions = [];
        const points = await addPointsToGlobe();
        points.forEach(({ lat, lon }) => {
            const pos = latLongToVector3(lat, lon, radius);
            positions.push(pos.x, pos.y, pos.z);
        });

        const pointsGeometry = new THREE.BufferGeometry();
        pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const pointsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
        const globePoints = new THREE.Points(pointsGeometry, pointsMaterial);
        group.add(globePoints);
    };

    const addLocationMarkers = () => {
        const group = groupRef.current;
        if (!group) return;

        const locations = [
            { lat: 51.5074, lon: -0.1278, name: "London" },
            { lat: 3.1319, lon: 101.684, name: "Kuala Lumpur" },
        ];

        const pointGeometry = new THREE.SphereGeometry(0.1, 10, 10);
        const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        locations.forEach(({ lat, lon }) => {
            const position = latLongToVector3(lat, lon, radius);
            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            point.position.set(position.x, position.y, position.z);
            group.add(point);
        });
    };

    const startAnimation = () => {
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        const group = groupRef.current;

        if (!scene || !camera || !renderer || !group) {
            console.error("🚨 Scene, camera, renderer, or group not found!");
            return;
        }
        const animate = () => {
            renderer.render(scene, camera);
            animationID.current = requestAnimationFrame(animate);
        };
        animate();
    };

    const animateDown = () => {
        const group = groupRef.current;
        gsap.to(group.position, {
            y: -window.innerHeight / 200,
            duration: 3,
            ease: "power2.out",
            onUpdate: () => {
                globePos.current.x = groupRef.current.position.x;
                globePos.current.y = groupRef.current.position.y;
                globePos.current.z = groupRef.current.position.z;
            },
        });

        gsap.to(groupRef.current.rotation, {
            y: `+=${Math.PI * 2}`, // 6.28319 = 2 * Math.PI (one full rotation)
            duration: 3, // Time for one full rotation
            ease: "none",
            onUpdate: () => {
                globeRot.current.y = groupRef.current.rotation.y;
            },

        });

        setTimeout(() => {
            setIsScrollBlocked(false);
        }, 3000);

    };

    const createCurve = (start, end, radius, heightFactor = 1.3) => {
        const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        midPoint.normalize().multiplyScalar(radius * heightFactor);

        return new THREE.CatmullRomCurve3([start, midPoint, end]);
    };

    const createAnimatedCurve = () => {
        const radius = 6.2;
        const klPos = latLongToVector3(3.1390, 101.6869, radius); // KL
        const londonPos = latLongToVector3(51.5074, -0.1278, radius); // London
        const NYPos = latLongToVector3(40.7128, -74.0060, radius); // New York
        const SAfPos = latLongToVector3(-26.2041, 28.0473, radius); // South Africa
        const rioPos = latLongToVector3(-22.9068, -43.1729, radius); // Rio de Janeiro
        const tokPos = latLongToVector3(35.6895, 139.6917, radius); // Tokyo

        const curveKLLon = createCurve(klPos, londonPos, radius);

        const tubeGeometry = new THREE.TubeGeometry(curveKLLon, 64, 0.05, 8, false);
        const tubeMesh = new THREE.Mesh(tubeGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMesh);
        tubeRefMU.current.tubeKLLondon = tubeGeometry;
        tubeRefMU.current.tubeKLLondon.setDrawRange(0, 0);

        const curveLonNY = createCurve(londonPos, NYPos, radius);
        const tubeGeometryLonNY = new THREE.TubeGeometry(curveLonNY, 64, 0.05, 8, false);
        const tubeMeshLonNY = new THREE.Mesh(tubeGeometryLonNY, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshLonNY);
        tubeRefMU.current.tubeLonNY = tubeGeometryLonNY;
        tubeRefMU.current.tubeLonNY.setDrawRange(0, 0);

        const curveLonSAf = createCurve(londonPos, SAfPos, radius);
        const tubeGeometryLonSAf = new THREE.TubeGeometry(curveLonSAf, 64, 0.05, 8, false);
        const tubeMeshLonSAf = new THREE.Mesh(tubeGeometryLonSAf, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshLonSAf);
        tubeRefMU.current.tubeLonSAf = tubeGeometryLonSAf;
        tubeRefMU.current.tubeLonSAf.setDrawRange(0, 0);

        const curveLonRio = createCurve(londonPos, rioPos, radius);
        const tubeGeometryLonRio = new THREE.TubeGeometry(curveLonRio, 64, 0.05, 8, false);
        const tubeMeshLonRio = new THREE.Mesh(tubeGeometryLonRio, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshLonRio);
        tubeRefMU.current.tubeLonRio = tubeGeometryLonRio;
        tubeRefMU.current.tubeLonRio.setDrawRange(0, 0);

        const curveLonTokyo = createCurve(londonPos, tokPos, radius);
        const tubeGeometryLonTokyo = new THREE.TubeGeometry(curveLonTokyo, 64, 0.05, 8, false);
        const tubeMeshLonTokyo = new THREE.Mesh(tubeGeometryLonTokyo, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshLonTokyo);
        tubeRefMU.current.tubeLonTokyo = tubeGeometryLonTokyo;
        tubeRefMU.current.tubeLonTokyo.setDrawRange(0, 0);
    };

    const createAnimatedCurveBack = () => {
        const radius = 6.2;
        const londonPos = latLongToVector3(51.5074, -0.1278, radius); // London
        const NYPos = latLongToVector3(40.7128, -74.0060, radius); // New York
        const SAfPos = latLongToVector3(-26.2041, 28.0473, radius); // South Africa
        const rioPos = latLongToVector3(-22.9068, -43.1729, radius); // Rio de Janeiro
        const tokPos = latLongToVector3(35.6895, 139.6917, radius); // Tokyo

        const curveNYLon = createCurve(NYPos,londonPos, radius);
        const tubeGeometryNYLon = new THREE.TubeGeometry(curveNYLon, 64, 0.05, 8, false);
        const tubeMeshNYLon = new THREE.Mesh(tubeGeometryNYLon, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshNYLon);
        tubeRefMU.current.tubeNYLon = tubeGeometryNYLon;
        tubeRefMU.current.tubeNYLon.setDrawRange(0, 0);

        const curveSAfLon = createCurve(SAfPos,londonPos, radius);
        const tubeGeometrySAfLon = new THREE.TubeGeometry(curveSAfLon, 64, 0.05, 8, false);
        const tubeMeshSafLon = new THREE.Mesh(tubeGeometrySAfLon, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshSafLon);
        tubeRefMU.current.tubeSAfLon = tubeGeometrySAfLon;
        tubeRefMU.current.tubeSAfLon.setDrawRange(0, 0);

        const curveRioLon = createCurve(rioPos,londonPos, radius);
        const tubeGeometryRioLon = new THREE.TubeGeometry(curveRioLon, 64, 0.05, 8, false);
        const tubeMeshRioLon = new THREE.Mesh(tubeGeometryRioLon, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshRioLon);
        tubeRefMU.current.tubeRioLon = tubeGeometryRioLon;
        tubeRefMU.current.tubeRioLon.setDrawRange(0, 0);

        const curveTokyoLon = createCurve(tokPos,londonPos, radius);
        const tubeGeometryTokyoLon = new THREE.TubeGeometry(curveTokyoLon, 64, 0.05, 8, false);
        const tubeMeshTokyoLon = new THREE.Mesh(tubeGeometryTokyoLon, new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
        groupRef.current.add(tubeMeshTokyoLon);
        tubeRefMU.current.tubeTokyoLon = tubeGeometryTokyoLon;
        tubeRefMU.current.tubeTokyoLon.setDrawRange(0, 0);
    };



    useEffect(() => {
        const disableScrolling = (e) => {
            if (!isScrollBlocked) return;
            e.preventDefault();
            e.stopPropagation();
        };
        window.addEventListener("wheel", disableScrolling, { passive: false, capture: true });
        return () => window.removeEventListener("wheel", disableScrolling, { passive: false, capture: true });
    }, [isScrollBlocked]);


    useEffect(() => {
        const setup = async () => {
            if (hasInitializedRef.current) return;

            initializeScene();

            const shaders = await loadShaders();
            await initializeGlobe(shaders);

            while (!groupRef.current) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            await initializePoints();
            addLocationMarkers();
            startAnimation();
            animateDown();
            createAnimatedCurve();
            createAnimatedCurveBack();
        };

        setup();
        return () => {
            if (animationID.current) {
                cancelAnimationFrame(animationID.current);
            }
            if (groupRef.current) {
                groupRef.current.children.forEach((child) => {
                    groupRef.current.remove(child);
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach((mat) => mat.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                });
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const camera = cameraRef.current;
            const renderer = rendererRef.current;

            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(window.devicePixelRatio);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            if (sceneRef.current) {
                sceneRef.current.children.forEach((child) => {
                    sceneRef.current.remove(child);
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach((mat) => mat.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                });
            }

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            cancelAnimationFrame(animationID.current);
            window.removeEventListener("resize", handleResize);
        }
    }, []);



    const rotationTween = useRef(null);

    useEffect(() => {
        if (!groupRef.current) return;

        if (sTop === 0) {
            rotationTween.current = gsap.to(groupRef.current.rotation, {
                y: `+=${Math.PI * 2}`, // One full rotation
                duration: 10,
                ease: "none",
                repeat: -1, // Infinite loop
            });
        } else {
            if (rotationTween.current) {
                rotationTween.current.kill(); // Stop GSAP animation
            }
        }
    }, [sTop, isScrollBlocked]);


    const rotationTween2 = useRef(null);

    useEffect(() => {
        if (!groupRef.current) return;
        const divTop = sTop;
        const screenHeight = frameSize;

        const screenWidth = window.innerWidth;
        const xScaleFactor = screenWidth / 1920;
        const yScaleFactor = screenHeight / 1080;
        const zScaleFactor = (screenWidth + screenHeight) / 3000;
        const kualaLumpurRotation = { xRotation: -Math.PI / 20, yRotation: Math.PI / 1.0525 };

        if (sTop === 0 && rotationTween2.current) {
            rotationTween2.current.kill();
            rotationTween2.current = null;

        } else if (screenHeight * 3 < divTop && divTop <= screenHeight * 4) {
            if (!tubeRefMU.current) return;
            const progress = Math.min((sTop - frameSize * 3) / frameSize, 1);
            const totalSegmentsA = tubeRefMU.current.tubeLonNY.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeLonNY.setDrawRange(0, Math.floor(progress * totalSegmentsA) * 50);

            const totalSegmentsB = tubeRefMU.current.tubeLonSAf.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeLonSAf.setDrawRange(0, Math.floor(progress * totalSegmentsB) * 50);

            const totalSegmentsC = tubeRefMU.current.tubeLonRio.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeLonRio.setDrawRange(0, Math.floor(progress * totalSegmentsC) * 50);

            const totalSegmentsD = tubeRefMU.current.tubeLonTokyo.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeLonTokyo.setDrawRange(0, Math.floor(progress * totalSegmentsD) * 50);
            gsap.to(groupRef.current.position, {

                z: (5 * zScaleFactor) + (1.7 * zScaleFactor) - Math.min(((divTop - screenHeight * 3) / screenHeight), 1) * (5 * zScaleFactor),
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globePos.current.x = groupRef.current.position.x;
                    globePos.current.y = groupRef.current.position.y;
                    globePos.current.z = groupRef.current.position.z;
                },
            });

            tubeRefMU.current.tubeNYLon.setDrawRange(0, 0);
            tubeRefMU.current.tubeSAfLon.setDrawRange(0, 0);
            tubeRefMU.current.tubeRioLon.setDrawRange(0, 0);
            tubeRefMU.current.tubeTokyoLon.setDrawRange(0, 0);
        } else if (screenHeight * 2 < divTop && divTop <= screenHeight * 3) {

            gsap.to(groupRef.current.position, {
                y: -screenHeight / 200 + (5 * yScaleFactor) - Math.min(((divTop - screenHeight * 2) / screenHeight), 1) * (1.5 * yScaleFactor),
                z: Math.min(((divTop - screenHeight * 2) / screenHeight), 1) * (5 * zScaleFactor) + (1.7 * zScaleFactor),
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globePos.current.x = groupRef.current.position.x;
                    globePos.current.y = groupRef.current.position.y;
                    globePos.current.z = groupRef.current.position.z;
                },
            });

            gsap.to(groupRef.current.rotation, {
                x: kualaLumpurRotation.xRotation + Math.PI / 3.5,
                y: kualaLumpurRotation.yRotation + Math.PI / 1.7525,
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globeRot.current.y = groupRef.current.rotation.y;
                },
            });

            const totalSegments = tubeRefMU.current.tubeKLLondon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeKLLondon.setDrawRange(0, totalSegments * 50);
            tubeRefMU.current.tubeLonNY.setDrawRange(0, 0);
            tubeRefMU.current.tubeLonSAf.setDrawRange(0, 0);
            tubeRefMU.current.tubeLonRio.setDrawRange(0, 0);
            tubeRefMU.current.tubeLonTokyo.setDrawRange(0, 0);


        } else if (screenHeight < divTop && divTop <= screenHeight * 2) {
            if (!tubeRefMU.current) return;

            const progress = Math.min((sTop - frameSize) / frameSize, 1);
            const totalSegments = tubeRefMU.current.tubeKLLondon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeKLLondon.setDrawRange(0, Math.floor(progress * totalSegments) * 50);
            gsap.to(groupRef.current.rotation, {
                x: kualaLumpurRotation.xRotation + Math.min(((divTop - screenHeight) / screenHeight), 1) * Math.PI / 3.5,
                y: kualaLumpurRotation.yRotation + Math.min(((divTop - screenHeight) / screenHeight), 1) * Math.PI / 1.7525,
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globeRot.current.y = groupRef.current.rotation.y;
                },
            });


        } else if (divTop <= screenHeight) {
            tubeRefMU.current.tubeKLLondon.setDrawRange(0, 0);
            gsap.to(groupRef.current.position, {
                y: -screenHeight / 200 + (divTop / screenHeight) * (5 * yScaleFactor),
                z: Math.min((divTop / screenHeight), 1) * (1.7 * zScaleFactor),
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globePos.current.x = groupRef.current.position.x;
                    globePos.current.y = groupRef.current.position.y;
                    globePos.current.z = groupRef.current.position.z;
                },
            });



            // 🚀 Ensure previous animation is stopped before starting a new one
            if (rotationTween2.current) {
                rotationTween2.current.kill();
            }

            rotationTween2.current = gsap.to(groupRef.current.rotation, {
                x: Math.min((divTop / screenHeight), 1) * kualaLumpurRotation.xRotation,
                y: Math.min((divTop / screenHeight), 1) * kualaLumpurRotation.yRotation,
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globeRot.current.y = groupRef.current.rotation.y;
                },
            });


        }
    }, [sTop, frameSize]);

    useEffect(() => {
        if (!groupRef.current) return;
        const bottomUniPos = bottomUni;
        const screenWidth = window.innerWidth;
        const screenHeight = frameSize;
        const xScaleFactor = screenWidth / 1920;
        const yScaleFactor = screenHeight / 1080;
        const zScaleFactor = (screenWidth + screenHeight) / 3000;
        const kualaLumpurRotation = { xRotation: -Math.PI / 20, yRotation: Math.PI / 1.0525 };
        if(bottomUniPos > screenHeight && bottomUniPos <= screenHeight * 2){
            gsap.to(groupRef.current.position, {
                y: -screenHeight / 200 + (5 * yScaleFactor) - (1.5 * yScaleFactor),
                z: (5 * zScaleFactor) + (1.7 * zScaleFactor) - (5 * zScaleFactor),
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globePos.current.x = groupRef.current.position.x;
                    globePos.current.y = groupRef.current.position.y;
                    globePos.current.z = groupRef.current.position.z;
                },
            });
            gsap.to(groupRef.current.rotation, {
                x: kualaLumpurRotation.xRotation + Math.PI / 3.5,
                y: kualaLumpurRotation.yRotation + Math.PI / 1.7525,
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globeRot.current.y = groupRef.current.rotation.y;
                },
            });
            
            tubeRefMU.current.tubeLonNY.setDrawRange(0, 0);
            tubeRefMU.current.tubeLonSAf.setDrawRange(0,  0);
            tubeRefMU.current.tubeLonRio.setDrawRange(0, 0);
            tubeRefMU.current.tubeLonTokyo.setDrawRange(0, 0);

            const totalSegmentsA = tubeRefMU.current.tubeNYLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeNYLon.setDrawRange(0, totalSegmentsA * 50);

            const totalSegmentsB = tubeRefMU.current.tubeSAfLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeSAfLon.setDrawRange(0, totalSegmentsB * 50);

            const totalSegmentsC = tubeRefMU.current.tubeRioLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeRioLon.setDrawRange(0, totalSegmentsC * 50);

            const totalSegmentsD = tubeRefMU.current.tubeTokyoLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeTokyoLon.setDrawRange(0, totalSegmentsD * 50);

            

        }else if (bottomUniPos > 0 && bottomUniPos <= screenHeight) {
            gsap.to(groupRef.current.rotation, {
                x: kualaLumpurRotation.xRotation + Math.PI / 3.5,
                y: kualaLumpurRotation.yRotation + Math.PI / 1.7525 + Math.PI * bottomUniPos / screenHeight,
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globeRot.current.y = groupRef.current.rotation.y;
                },
            });

            gsap.to(groupRef.current.position, {
                y: -screenHeight / 200 + (5 * yScaleFactor) - (1.5 * yScaleFactor),
                z: (5 * zScaleFactor) + (1.7 * zScaleFactor) - (5 * zScaleFactor),
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globePos.current.x = groupRef.current.position.x;
                    globePos.current.y = groupRef.current.position.y;
                    globePos.current.z = groupRef.current.position.z;
                },
            });
           
        } else if (bottomUniPos <= 0 && bottomUniPos >= -screenHeight) {
            gsap.to(groupRef.current.rotation, {
                x: kualaLumpurRotation.xRotation + Math.PI / 3.5 + Math.PI*2.3 * bottomUniPos / screenHeight,
                y: kualaLumpurRotation.yRotation + Math.PI / 1.7525 + Math.PI * 0.58 *bottomUniPos / screenHeight,
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globeRot.current.y = groupRef.current.rotation.y;
                },
            });
            let progress = 1-Math.min(-bottomUniPos / screenHeight, 1);
            
            const totalSegments = tubeRefMU.current.tubeKLLondon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeKLLondon.setDrawRange(0, Math.floor(progress * totalSegments) * 50);

            const totalSegmentsA = tubeRefMU.current.tubeNYLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeNYLon.setDrawRange(0, Math.floor(progress * totalSegmentsA) * 50);

            const totalSegmentsB = tubeRefMU.current.tubeSAfLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeSAfLon.setDrawRange(0, Math.floor(progress * totalSegmentsB) * 50);

            const totalSegmentsC = tubeRefMU.current.tubeRioLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeRioLon.setDrawRange(0, Math.floor(progress * totalSegmentsC) * 50);

            const totalSegmentsD = tubeRefMU.current.tubeTokyoLon.parameters.path.getPoints(64).length;
            tubeRefMU.current.tubeTokyoLon.setDrawRange(0, Math.floor(progress * totalSegmentsD) * 50);
        }else if (bottomUniPos < -screenHeight && bottomUniPos >= -screenHeight * 2) {
            gsap.to(groupRef.current.rotation, {
                x: kualaLumpurRotation.xRotation + Math.PI / 3.5 - Math.PI*2.3,
                y: kualaLumpurRotation.yRotation + Math.PI / 1.7525 - Math.PI * 0.58,
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globeRot.current.y = groupRef.current.rotation.y;
                },
            });

            gsap.to(groupRef.current.position, {
                y: -screenHeight / 200 + (5 * yScaleFactor) - (1.5 * yScaleFactor),
                z: (5 * zScaleFactor) + (1.7 * zScaleFactor) - (5 * zScaleFactor) - Math.min(((bottomUniPos + screenHeight) / screenHeight), 1) * (6 * zScaleFactor),
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globePos.current.x = groupRef.current.position.x;
                    globePos.current.y = groupRef.current.position.y;
                    globePos.current.z = groupRef.current.position.z;
                },
            });

            tubeRefMU.current.tubeKLLondon.setDrawRange(0, 0);
            tubeRefMU.current.tubeNYLon.setDrawRange(0, 0);
            tubeRefMU.current.tubeSAfLon.setDrawRange(0,  0);
            tubeRefMU.current.tubeRioLon.setDrawRange(0, 0);
            tubeRefMU.current.tubeTokyoLon.setDrawRange(0, 0);

        }else if( bottomUniPos < -screenHeight * 2 && bottomUniPos >= -screenHeight * 3){
            gsap.to(groupRef.current.position, {
                y: -screenHeight / 200 + (5 * yScaleFactor) - (1.5 * yScaleFactor),
                z: (5 * zScaleFactor) + (1.7 * zScaleFactor) - (5 * zScaleFactor) + (6* zScaleFactor) + Math.min(((bottomUniPos + screenHeight * 2) / screenHeight), 1) * (20 * zScaleFactor),
                duration: 0,
                ease: "power2.out",
                onUpdate: () => {
                    globePos.current.x = groupRef.current.position.x;
                    globePos.current.y = groupRef.current.position.y;
                    globePos.current.z = groupRef.current.position.z;
                },
            });
            if(animationIDBot.current){
                cancelAnimationFrame(animationIDBot.current);
                animationIDBot.current = null;
            }
        }else if( bottomUniPos < -screenHeight * 3){
            groupRef.current.position.y = 0;
            groupRef.current.position.z = 0;

            const animate = () => {
                groupRef.current.rotation.y += 0.01;
                animationIDBot.current = requestAnimationFrame(animate);
            }
            if (!animationIDBot.current) {
                animate();
            }
        }
    }, [bottomUni, frameSize]);



    return <div className="globe-container" ref={mountRef} />;
};

export default Globe;