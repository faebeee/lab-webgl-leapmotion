import * as THREE from 'three';
import Microphone, { updateSensitivity } from '@faebeee/lab-utils/libs/microphone';
import Lab from '@faebeee/lab-utils';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const SENSITIVITY = 0.05;
const analyser = Microphone();
const frequencyArray = new Float32Array(analyser.frequencyBinCount);

Lab.init(WIDTH, HEIGHT);
Lab.camera.position.set(0, 0, 100);
Lab.camera.lookAt(0, 0, 0);
createLights();
const sphere = createObject();
sphere.position.set(0, 0, 0);
Lab.scene.add(sphere);

Lab.update = () => {
    analyser.getFloatTimeDomainData(frequencyArray);
    const noise = updateSensitivity(frequencyArray, SENSITIVITY);
    sphere.rotation.y += 0.005;
};


function createObject() {
    const geometry = new THREE.BoxGeometry(15, 15, 15);
    const material = new THREE.MeshPhongMaterial({ color: '#51a9ff' });
    return new THREE.Mesh(geometry, material);
}

function createLights() {
    let light = new THREE.PointLight('#fffff0', 1, 150);
    light.castShadow = true;
    light.position.set(-50, 100, 50);
    Lab.scene.add(light);

    let light2 = new THREE.PointLight('#fffff0', 1, 150);
    light2.castShadow = true;
    light2.position.set(50, 100, 50);
    Lab.scene.add(light2);

    let light3 = new THREE.PointLight('#ff0000', 1, 150);
    light3.castShadow = true;
    light3.position.set(0, -50, 50);
    Lab.scene.add(light3);
}


function update() {
    Lab.render();
    requestAnimationFrame(update);
}

update();
