import * as THREE from 'three';
import Lab from '@faebeee/lab-utils';

const VERT_NOISE = 0;
const AMPLIFIER = 10;


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

Lab.init(WIDTH, HEIGHT);
Lab.camera.position.set(0, 0, 100);
Lab.camera.lookAt(0, 0, 0);
createLights();
const object = createObject();
object.position.set(0, 0, 0);
Lab.scene.add(object);


Leap.loop(function(frame) {
    if (frame.hands && frame.hands.length > 0) {
        const hand = frame.hands.pop();
        console.log(hand.sphereCenter);
        const [x, y, z] = hand.sphereCenter;

        const { grabStrength } = hand;
        const { geometry } = object;
        const { originalVertices } = object.userData;
        let counter = 0;
        const vLength = geometry.vertices.length;
        for (let i = 0; i < vLength; i++) {
            const accelerateX = clamp(originalVertices[counter], -1, 1);
            const accelerateY = clamp(originalVertices[counter + 1], -1, 1);
            const accelerateZ = clamp(originalVertices[counter + 2], -1, 1);

            geometry.vertices[i].x = originalVertices[counter] + Math.random() * grabStrength * AMPLIFIER * accelerateX;
            geometry.vertices[i].y = originalVertices[counter + 1] + Math.random() * grabStrength * AMPLIFIER * accelerateY;
            geometry.vertices[i].z = originalVertices[counter + 2] + Math.random() * grabStrength * AMPLIFIER * accelerateZ;
            counter += 3;
        }

        object.position.set(clamp(x, -50, 50), clamp(y, -50, 50), clamp(z, -50, 50));
        geometry.verticesNeedUpdate = true;
    }
});

Lab.update = () => {
    object.rotation.y += 0.005;
};


function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function createObject() {
    const geometry = new THREE.SphereGeometry(15, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: '#51a9ff', flatShading: true });

    const positions = [];
    for (let i = 0; i < geometry.vertices.length; i++) {
        geometry.vertices[i].x += Math.random() * VERT_NOISE;
        geometry.vertices[i].y += Math.random() * VERT_NOISE;
        geometry.vertices[i].z += Math.random() * VERT_NOISE;
        positions.push(geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
    }
    const planet = new THREE.Mesh(geometry, material);
    planet.userData.originalVertices = positions;
    planet.castShadow = true;
    planet.receiveShadow = true;
    return planet;
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
