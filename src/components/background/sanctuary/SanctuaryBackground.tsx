import { Box, Group } from "@mantine/core";
import "./styles.css";

export const SanctuaryBackground = () => {
	return (
		<div className="SanctuaryBackground scroll-listener">
			<span
				style={{
					marginTop: 50,
					right: "2vw",
					//@ts-ignore
					"--depth": 0.8,
				}}
				className="parallax prophecy"
			>
				A WORLD BASKED IN PUREST LIGHT
			</span>
			<Box className="parallax fade" w="100%" mt={15} style={{ "--depth": 0.7, opacity: 0.7 }}>
				<Group gap={0} align="center" w="100%" wrap="nowrap">
					<Box className="arches fade" flex={1} ml={-50} />
					<Box className="spire fade" />
					<Box className="arches fade" w={100} />
				</Group>
			</Box>
			<Box className="parallax fade" w="100%" mt={120} style={{ "--depth": 0.6, opacity: 0.9 }}>
				<Group gap={0} align="end" w="100%" wrap="nowrap">
					<Box className="arches" w="5vw" />
					<Box className="spire" />
					<Box className="arches" flex={1} />
				</Group>
			</Box>
			<Box className="parallax fade" mt={800} w="100%">
				<Group justify="center" gap={0} align="top" wrap="nowrap">
					<Box className="spire fade" ml={280} />
					<Box className="buttress fade" mt={200} />
				</Group>
			</Box>
			<div
				className="parallax prophecygif"
			/>
			<span
				style={{
					marginTop: 1000,
					left: "20vw",
					//@ts-ignore
					"--depth": 0.8,
				}}
				className="parallax prophecy"
			>
				WITH HOPE CROSSED ON HER HEART
			</span>
		</div>
	)
};

// export const ScrollCamera = () => {
//     const { camera } = useThree();
//     const yRef = useRef(0);
//     useScrollChange(({ y }) => {
//         yRef.current = y;
//     })
//     useFrame(() => {
//         const newY = -yRef.current / 200;
//         camera.position.setY(camera.position.y + ((newY - camera.position.y) * 0.1));
//     })

//     return null;
// }

// export const Prophecy = () => {
//     return (
//         <Box style={{ position: "absolute", zIndex: -2 }} w="100%" h="100%">
//             <Canvas
//                 style={{
//                     position: "fixed",
//                     width: "100lvw",
//                     height: "100lvh",
//                     overflow: "clip",
//                     zIndex: 100,
//                     pointerEvents: "none",
//                 }}
//                 camera={{
//                     position: [0, 0, 10],
//                     fov: 50,
//                     // position: [0, 0, 32],
//                     // zoom: 1,
//                     // near: 0.1,
//                     // far: 64,
//                 }}
//                 orthographic
//                 gl={{
//                     alpha: true,
//                     powerPreference: "low-power",
//                 }}
//             >
//                 <ScrollCamera />
//                 <group position={[0, 0, 0]}>
//                     <ProphecyObject />
//                 </group>

//                 <ambientLight intensity={0.1} />

//                 <mesh>
//                     <boxGeometry args={[2, 2, 2]} />
//                     <meshStandardMaterial />
//                 </mesh>
//             </Canvas>
//         </Box>
//     )
// }

// export const ProphecyObject = () => {
//     const prophecyTexture = useLoader(
//         THREE.TextureLoader,
//         deltarune,
//     );
//     const oceanTexture = useLoader(
//         THREE.TextureLoader,
//         ocean,
//     );
//     const meshRef = useRef<THREE.Mesh>(null);

//     const startY = 0;
//     oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

//     const aspectRatio = useMemo(() => {
//         if (!prophecyTexture.image) return 1;
//         return prophecyTexture.image.width / prophecyTexture.image.height;
//     }, [prophecyTexture.image]);

//     const shaderMaterial = useMemo(() => {
//         return new THREE.ShaderMaterial({
//             uniforms: {
//                 uProphecy: { value: prophecyTexture },
//                 uOcean: { value: oceanTexture },
//                 uOffset: { value: new THREE.Vector2(0, 0) },
//                 uGrayHint: { value: 0 },
//             },
//             vertexShader: `
//                 varying vec2 vUv;
//                 void main() {
//                     vUv = uv;
//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//                 }
//             `,
//             fragmentShader: `
//                 varying vec2 vUv;
//                 uniform sampler2D uProphecy;
//                 uniform sampler2D uOcean;
//                 uniform vec2 uOffset;
//                 uniform float uGrayHint;

//                 void main() {
//                     vec4 prophecyColor = texture2D(uProphecy, vUv);
//                     vec4 oceanColor = texture2D(uOcean, vUv + uOffset);

//                     vec3 blueTint = vec3(0.0, 0.1, 0.6);
//                     vec3 grayHint = vec3(0.1 * uGrayHint);
//                     vec3 finalColor = oceanColor.rgb + blueTint + grayHint;

//                     if (prophecyColor.a < 0.5) {
//                         gl_FragColor = vec4(finalColor, oceanColor.a);
//                     } else {
//                         discard;
//                     }
//                 }
//             `,
//             transparent: true,
//         });
//     }, [prophecyTexture, oceanTexture]);

//     const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
//     const timeRef = useRef(0);
//     const accumRef = useRef(0);
//     const targetDelta = 1 / 30;

//     useFrame((_, delta) => {
//         accumRef.current += delta;

//         if (accumRef.current >= targetDelta) {
//             timeRef.current += targetDelta;

//             shaderMaterial.uniforms.uOffset.value.y -= targetDelta * 0.1;
//             shaderMaterial.uniforms.uOffset.value.x += targetDelta * 0.1;

//             if (meshRef.current) {
//                 const floatAmount = 0.1;
//                 const speed = 4.0;
//                 const newY = startY +
//                     Math.sin(timeRef.current * speed + floatOffset) *
//                     floatAmount;
//                 meshRef.current.position.setY(newY);
//             }

//             accumRef.current = 0;
//         }
//     });

//     const size = 1.2;

//     return (
//         <mesh ref={meshRef}>
//             <planeGeometry args={[aspectRatio * size, size]} />
//             <primitive attach="material" object={shaderMaterial} />
//         </mesh>
//     );
// }
