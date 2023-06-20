import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {
	Engine,
	Scene,
	UniversalCamera,
	Vector3,
	MeshBuilder,
	SceneLoader,
	Matrix,
} from "@babylonjs/core";

class App {
	constructor() {
		
		const canvas = document.createElement("canvas");
		canvas.style.width = "100%";
		canvas.style.height = "100%";

		canvas.id = "gameCanvas";
		document.body.appendChild(canvas);

		const engine = new Engine(canvas, true);
		const scene = new Scene(engine);

		// Setup scene
		const framesPerSecond = 60;
		const gravity = -9.81;
		scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);

		const camera = new UniversalCamera("camera", new Vector3(0, 0.8, 0), scene);
		camera.attachControl(canvas, true);

		// Camera speed
		camera.speed = 0.2;
		camera.angularSensibility = 8000;

		// View distance
		camera.minZ = 0.4;

		// WASD Controls
		// Keyboard mapping
		camera.keysUp.push(87);
		camera.keysLeft.push(65);
		camera.keysDown.push(83);
		camera.keysRight.push(68);

		// Collision and gravity
		camera.applyGravity = true;
		camera.checkCollisions = true;

		// Enable Collisions
		scene.collisionsEnabled = true;

		// Load my model
		SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/Nick-Masri/3d-gallery-file/main/", "vr_gallery_house_baked.glb").then(function (result) {
			console.log("My base Mesh is called: ");
			console.log(result.meshes[0]);
			let rootMesh = result.meshes[0];
			rootMesh.name = "baseModelMesh";
			result.meshes.forEach(mesh => {
				mesh.checkCollisions = true;
			});
			scene.onPointerDown = function castRay() {
				const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera);

				const hit = scene.pickWithRay(ray);
				if (hit.pickedMesh) {
					if (hit.pickedMesh.name == 'Object_15') {
						window.alert(hit.pickedMesh.name);
						console.log(hit.pickedMesh)
					}
				}
			}
		});

		engine.runRenderLoop(() => {
			scene.render();
		});
	}
}

window.addEventListener("DOMContentLoaded", () => {
	new App();
});
