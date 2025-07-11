import React, { useEffect, useRef, useCallback } from 'react';
import AnimatedElement from './AnimatedElement';
import AnimatedBrain from "./AnimatedBrain";


function Hero({ scrollToSection }) {
  const canvasRef = useRef(null);
  const heroSubtextRef = useRef(null);
  const textToType = "Stealth-grade AI infrastructure for the enterprise.";

  // --- Three.js Global Variables (moved inside component scope) ---
  // These variables need to be declared outside initThreeJs but within the component's scope
  // to be accessible by other functions like animate and event handlers.
  let scene, camera, renderer, particles, lines, backgroundStars, gridHelper, backgroundStructure;
  let mouseX = 0, mouseY = 0; // Keeping mouseX/Y for potential future use or if camera drag needs it
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  // Camera control variables (keeping these for interactive camera orbit)
  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  let cameraTargetRotationX = 0;
  let cameraTargetRotationY = 0;
  const cameraRotationSpeed = 0.005; // Speed for manual camera rotation

  // Data flow particles
  const dataParticleCount = 100;
  const dataParticles = [];
  const dataParticleSpeed = 0.05; // Speed of data flow
  const dataParticleSize = 0.01;
  const dataParticleLifetime = 50; // Frames
  let dataParticleSpawnCounter = 0;
  const dataParticleSpawnRate = 5; // Spawn every X frames

  // Animation parameters
  const particleCount = 300; // Number of main network nodes
  const starCount = 1000; // Number of background stars
  const baseMaxConnectionDistance = 1.5; // Base max distance for lines to form
  const connectionDistancePulseAmplitude = 0.3; // How much the connection distance pulses
  const particleSpeed = 0.01; // Increased: Speed of main particle movement
  // Removed mouse-specific influence parameters as they are no longer used for breaking/spreading
  // const mouseInfluenceRadius = 3.5;
  // const mouseRepulsionStrength = 0.08;
  const cameraOrbitSpeed = 0.00015; // Increased: Speed of camera's subtle orbit


  // --- Three.js AI Network Animation ---
  const initThreeJs = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn("Canvas element not found for Three.js initialization.");
      return;
    }

    // Ensure Three.js is loaded globally
    const THREE = window.THREE;
    if (!THREE) {
      console.error("Three.js (THREE) global object not found. Ensure three.min.js is loaded in public/index.html before your React app script.");
      return;
    }

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.05); // Subtle fog for depth

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // Initial camera distance

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true, // Smooth edges
      alpha: true // Transparent background for CSS background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // For sharp rendering on high-DPI screens

    // 4. Create Main Particles (Nodes)
    particles = [];
    const geometries = [
      new THREE.BoxGeometry(0.03, 0.03, 0.03),
      new THREE.SphereGeometry(0.03, 8, 8),
      new THREE.OctahedronGeometry(0.03)
    ];
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000, // Red color for nodes
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < particleCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const particle = new THREE.Mesh(geometry, particleMaterial.clone());
      particle.position.x = (Math.random() - 0.5) * 10;
      particle.position.y = (Math.random() - 0.5) * 10;
      particle.position.z = (Math.random() - 0.5) * 10;

      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * particleSpeed,
        (Math.random() - 0.5) * particleSpeed,
        (Math.random() - 0.5) * particleSpeed
      );
      particles.push(particle);
      scene.add(particle);
    }

    // 5. Line Material for Connections
    lines = [];
    const lineGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * particleCount * 3 * 2);
    const colors = new Float32Array(particleCount * particleCount * 4 * 2); // R, G, B, Alpha
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 4).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);
    lines.push(lineMesh);

    // 6. Create Background Stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    backgroundStars = new THREE.Points(starGeometry, starMaterial);
    scene.add(backgroundStars);

    // 7. Add Background Grid Helper
    const gridSize = 30;
    const divisions = 30;
    const gridColor = 0x333333;
    gridHelper = new THREE.GridHelper(gridSize, divisions, gridColor, gridColor);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    // 8. Add Abstract Background Structure (Icosahedron)
    const structureGeometry = new THREE.IcosahedronGeometry(15, 1); // Large, low-poly icosahedron
    const structureMaterial = new THREE.MeshBasicMaterial({
      color: 0x555555, // Dark grey
      wireframe: true,
      transparent: true,
      opacity: 0.05, // Very subtle
      side: THREE.DoubleSide
    });
    backgroundStructure = new THREE.Mesh(structureGeometry, structureMaterial);
    scene.add(backgroundStructure);

    // 9. Initialize Data Flow Particles
    const dataParticleGeometry = new THREE.SphereGeometry(dataParticleSize, 4, 4); // Very small spheres
    const dataParticleMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff, // Cyan for data flow
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    for (let i = 0; i < dataParticleCount; i++) {
      const dp = new THREE.Mesh(dataParticleGeometry, dataParticleMaterial.clone());
      dp.visible = false; // Start invisible
      dp.lifetime = 0;
      dp.startNode = null;
      dp.endNode = null;
      dataParticles.push(dp);
      scene.add(dp);
    }


    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now(); // Get current time for animations

      updateParticles(time);
      updateConnections(time);
      updateCamera(time);
      updateBackgroundStructure(); // Update background structure rotation
      updateDataParticles(); // Update data flow particles

      renderer.render(scene, camera);
    };

    // --- Update Particles Logic ---
    const updateParticles = (time) => {
      // Mouse position is still updated for camera drag, but not used for particle interaction
      // const mouse3D = new THREE.Vector3(
      //     (mouseX / window.innerWidth) * 10 - 5,
      //     -(mouseY / window.innerHeight) * 10 + 5,
      //     0
      // );

      particles.forEach(p => {
        // Apply subtle random movement
        p.position.x += p.velocity.x;
        p.position.y += p.velocity.y;
        p.position.z += p.velocity.z;

        // Simple boundary check: reverse velocity if outside a certain cube
        const bounds = 5;
        if (p.position.x > bounds || p.position.x < -bounds) p.velocity.x *= -1;
        if (p.position.y > bounds || p.position.y < -bounds) p.velocity.y *= -1;
        if (p.position.z > bounds || p.position.z < -bounds) p.velocity.z *= -1;

        // Removed mouse repulsion/attraction and related scaling/opacity/glow
        p.material.opacity = 0.8; // Reset to default opacity
        p.scale.setScalar(1);     // Reset to default scale
        p.material.color.setHSL(0.0, 1, 0.5 + Math.sin(p.position.x * 0.5 + time * 0.0001) * 0.1); // Keep subtle breathing pulse

        // Particle Rotation
        p.rotation.x += 0.01;
        p.rotation.y += 0.01;
        p.rotation.z += 0.005;
      });
    };

    // --- Update Connections Logic ---
    const updateConnections = (time) => {
      let linePositions = lines[0].geometry.attributes.position.array;
      let lineColors = lines[0].geometry.attributes.color.array; // Get the color array
      let lineIndex = 0;
      let colorIndex = 0;

      // Dynamic pulsing of connection distance
      const currentMaxConnectionDistance = baseMaxConnectionDistance + Math.sin(time * 0.0005) * connectionDistancePulseAmplitude;

      // Mouse position is no longer used for line fading/intensity
      // const mouse3D = new THREE.Vector3(
      //     (mouseX / window.innerWidth) * 10 - 5,
      //     -(mouseY / window.innerHeight) * 10 + 5,
      //     0
      // );

      const baseLineColor = new THREE.Color(0xcc0000); // Base red color for lines
      // const tempColor = new THREE.Color(); // Reusable color object - not needed if using baseLineColor directly

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distance = p1.position.distanceTo(p2.position);

          if (distance < currentMaxConnectionDistance) {
            // Add vertex positions for the line segment
            linePositions[lineIndex++] = p1.position.x;
            linePositions[lineIndex++] = p1.position.y;
            linePositions[lineIndex++] = p1.position.z;

            linePositions[lineIndex++] = p2.position.x;
            linePositions[lineIndex++] = p2.position.y;
            linePositions[lineIndex++] = p2.position.z;

            // Removed mouse-based opacity and brightness logic
            let lineOpacity = 0.15; // Fixed base line opacity
            let lineBrightnessFactor = 1.0; // Fixed base brightness

            // Apply brightness factor to color
            const finalColor = baseLineColor.clone().multiplyScalar(lineBrightnessFactor);

            // Set colors for the line vertices (including alpha)
            lineColors[colorIndex++] = finalColor.r;
            lineColors[colorIndex++] = finalColor.g;
            lineColors[colorIndex++] = finalColor.b;
            lineColors[colorIndex++] = lineOpacity; // Alpha for first vertex

            lineColors[colorIndex++] = finalColor.r;
            lineColors[colorIndex++] = finalColor.g;
            lineColors[colorIndex++] = finalColor.b;
            lineColors[colorIndex++] = lineOpacity; // Alpha for second vertex
          }
        }
      }

      // Set the draw range to only render the active lines
      lines[0].geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex), 3));
      lines[0].geometry.setAttribute('color', new THREE.BufferAttribute(lineColors.slice(0, colorIndex), 4));
      lines[0].geometry.setDrawRange(0, lineIndex / 3);
      lines[0].geometry.attributes.position.needsUpdate = true;
      lines[0].geometry.attributes.color.needsUpdate = true;
    };

    // --- Update Camera Logic ---
    const updateCamera = (time) => {
      // Automatic subtle orbiting camera
      if (!isDragging) {
        cameraTargetRotationY += cameraOrbitSpeed; // Continuous orbit
      }

      // Apply rotation with easing
      camera.rotation.y += (cameraTargetRotationY - camera.rotation.y) * 0.1;
      camera.rotation.x += (cameraTargetRotationX - camera.rotation.x) * 0.1;

      // Keep camera looking at the center (0,0,0) after rotation
      const offset = new THREE.Vector3(0, 0, 5); // Distance from center
      offset.applyQuaternion(camera.quaternion);
      camera.position.copy(offset);
      camera.lookAt(scene.position);
    };

    // --- Update Background Structure Rotation ---
    const updateBackgroundStructure = () => {
      if (backgroundStructure) {
        backgroundStructure.rotation.x += 0.0005;
        backgroundStructure.rotation.y += 0.0003;
      }
    };

    // --- Update Data Flow Particles ---
    const updateDataParticles = () => {
      dataParticleSpawnCounter++;
      if (dataParticleSpawnCounter % dataParticleSpawnRate === 0) {
        spawnDataParticle();
      }

      dataParticles.forEach(dp => {
        if (dp.visible) {
          dp.lifetime++;
          if (dp.lifetime > dataParticleLifetime) {
            dp.visible = false;
          } else {
            // Move particle along the line
            const progress = dp.lifetime / dataParticleLifetime;
            dp.position.lerpVectors(dp.startNode.position, dp.endNode.position, progress);
            // Fade out towards end of life
            dp.material.opacity = 0.7 * (1 - progress);
          }
        }
      });
    };

    // --- Spawn Data Particle ---
    const spawnDataParticle = () => {
      // Find an inactive data particle
      const dp = dataParticles.find(p => !p.visible);
      if (!dp) return;

      // Find two connected main particles
      let p1, p2;
      let attempts = 0;
      const maxAttempts = 100;

      while (attempts < maxAttempts) {
        const i = Math.floor(Math.random() * particleCount);
        const j = Math.floor(Math.random() * particleCount);
        if (i === j) { attempts++; continue; }

        p1 = particles[i];
        p2 = particles[j];

        // Check if they are currently connected
        const distance = p1.position.distanceTo(p2.position);
        const currentMaxConnectionDistance = baseMaxConnectionDistance + Math.sin(Date.now() * 0.0005) * connectionDistancePulseAmplitude;

        if (distance < currentMaxConnectionDistance) {
          dp.startNode = p1;
          dp.endNode = p2;
          dp.position.copy(p1.position); // Start at p1
          dp.visible = true;
          dp.lifetime = 0;
          return;
        }
        attempts++;
      }
    };

    // --- Event Handlers ---
    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onDocumentMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;

        cameraTargetRotationY -= deltaX * cameraRotationSpeed;
        cameraTargetRotationX -= deltaY * cameraRotationSpeed;

        // Clamp vertical rotation to prevent flipping
        cameraTargetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraTargetRotationX));

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
      }
    };

    const onDocumentTouchMove = (event) => {
      if (event.touches.length > 0) {
        event.preventDefault(); // Prevent scrolling
        const touch = event.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;

        if (isDragging) {
          const deltaX = touch.clientX - previousMouseX;
          const deltaY = touch.clientY - previousMouseY;

          cameraTargetRotationY -= deltaX * cameraRotationSpeed * 2; // Increased sensitivity for touch
          cameraTargetRotationX -= deltaY * cameraRotationSpeed * 2;

          cameraTargetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraTargetRotationX));

          previousMouseX = touch.clientX;
          previousMouseY = touch.clientY;
        }
      }
    };

    const onMouseDown = (event) => {
      isDragging = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
      canvas.classList.add('grabbing');
    };

    const onMouseUp = () => {
      isDragging = false;
      canvas.classList.remove('grabbing');
    };

    const onTouchStart = (event) => {
      if (event.touches.length > 0) {
        event.preventDefault();
        isDragging = true;
        previousMouseX = event.touches[0].clientX;
        previousMouseY = event.touches[0].clientY;
        canvas.classList.add('grabbing');
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      canvas.classList.remove('grabbing');
    };


    // Add event listeners to the canvas element
    window.addEventListener('resize', onWindowResize); // Global resize listener
    canvas.addEventListener('mousemove', onDocumentMouseMove);
    canvas.addEventListener('touchmove', onDocumentTouchMove, { passive: false });
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp); // End drag if mouse leaves canvas
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', onTouchEnd, { passive: false });


    // Start the animation
    animate();

    // Cleanup function for useEffect
    return () => {
      window.removeEventListener('resize', onWindowResize);
      // Remove all event listeners from the canvas
      canvas.removeEventListener('mousemove', onDocumentMouseMove);
      canvas.removeEventListener('touchmove', onDocumentTouchMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('touchcancel', onTouchEnd);

      // Dispose Three.js resources
      renderer.dispose();
      scene.children.forEach(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
        scene.remove(child);
      });
      // Clear arrays
      particles.length = 0;
      lines.length = 0;
      dataParticles.length = 0;
    };
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Dynamically load Three.js if not already present (e.g., in public/index.html)
    // This is a fallback. Ideally, Three.js is loaded as a script in public/index.html
    // before your React app's bundle.
    if (!window.THREE) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = initThreeJs;
      document.head.appendChild(script);
    } else {
      initThreeJs();
    }
  }, [initThreeJs]);


  // Removed numFloatingDots constant as it's no longer used.

  const handleRequestAccessClick = (e) => {
    e.preventDefault();
    alert('Request Access functionality would lead to a contact form or email trigger.');
  };

  const handleDownloadOnePagerClick = (e) => {
    e.preventDefault();
    alert('Download One-Pager functionality would trigger a PDF download.');
  };

  return (
    <section id="home" className="hero-section">

      <div className="hero-content">
        <AnimatedElement animation="fade-up">
          {/* Main Hero Title - static subtle glow now */}
          <h1 className="hero-title-glowing">THE BRIDGE BETWEEN<br />INTELLIGENCE AND TRUTH.</h1>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={200}>
          <p ref={heroSubtextRef} className="hero-subtext">
            {textToType}
          </p>
        </AnimatedElement>
        <div className="hero-ctas">
          <AnimatedElement animation="fade-in" delay={400}>
            <button
              className="red-btn"
              onClick={handleRequestAccessClick}
              aria-label="Request Access to Shadewire"
            >
              REQUEST ACCESS
            </button>
          </AnimatedElement>
          <AnimatedElement animation="fade-in" delay={500}>
            <button
              className="black-outline-btn pulse-on-hover"
              onClick={handleDownloadOnePagerClick}
              aria-label="Download Shadewire One-Pager"
            >
              DOWNLOAD ONE-PAGER
            </button>
          </AnimatedElement>
        </div>
      </div>
      <div className="hero-right">
        <AnimatedBrain />
      </div>
      <div className="hero-animation-placeholder">
        {/* Changed canvas ID to network-canvas */}
        <canvas ref={canvasRef} id="network-canvas"></canvas>
      </div>
    </section>
  );
}

export default Hero;
