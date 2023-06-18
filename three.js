import * as THREE from 'three';

//Setup
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog( 0xcccccc, 16, 25);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.setZ(40)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

// Mesh - Torus
const torusGeo = new THREE.TorusGeometry(10, 3, 20, 20)
const torusMat = new THREE.MeshStandardMaterial({
    color: 0x009999,
    wireframe: true
})
const torusMesh = new THREE.Mesh(torusGeo, torusMat)
scene.add(torusMesh)

// Animation Torus
function animate() {
    requestAnimationFrame(animate)

    torusMesh.rotation.x += 0.005
    torusMesh.rotation.y += 0.0025
    torusMesh.rotation.z += 0.005

    camera.rotateZ(0.0005)

    renderer.render(scene, camera)
}
animate()

// Spawn Stars
function addStar() {
    const starGeo = new THREE.SphereGeometry(0.25, 24, 24)
    const starMat = new THREE.MeshStandardMaterial({
        color: 0x999333
    })
    const starMesh = new THREE.Mesh(starGeo, starMat)

    const [x, y, z] = Array(3).fill().map(() =>
        THREE.MathUtils.randFloatSpread(100)
    )
    starMesh.position.set(x,y,z)
    scene.add(starMesh)
}
Array(200).fill().forEach(addStar)

//Finalize
renderer.render(scene, camera)

// Responsive - Mouse Scrolling
function moveCamera() {
    const top = document.body.getBoundingClientRect().top

    torusMesh.rotateX(0.05)
    torusMesh.rotateY(0.02)
    torusMesh.rotateZ(0.02)

    camera.position.z = 40 + top * -0.01
    camera.position.x = top * +0.02
    camera.position.y = top * +0.02

}
document.body.onscroll = moveCamera

// Responsive - Window Resizing
window.scrollTo(0, 0)
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, this.window.innerHeight)
})