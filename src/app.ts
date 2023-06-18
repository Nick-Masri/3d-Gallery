import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, UniversalCamera, Vector3, ArcRotateCamera, Color3, Mesh, HemisphericLight, MeshBuilder, StandardMaterial, SceneLoader, Texture } from "@babylonjs/core";
import { CharacterController } from "babylonjs-charactercontroller";

class App {
    constructor() {
        const canvas = document.createElement("canvas");
        canvas.style.width = "80%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);

        const camera = new UniversalCamera("camera", new Vector3(0, 1.2, 0), scene);
        camera.attachControl(canvas, true);

        const gallery = SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Nick-Masri/3d-gallery-file/main/", "vr_gallery_house_baked.glb", scene, function(newMeshes) {
            console.log(newMeshes);
        });

        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new App();
});

