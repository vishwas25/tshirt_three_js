import * as THREE from './three.js-master/build/three.module.js'
// import './styles.css'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'


const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load('assets/glb_tshirt.glb', function(glb){
    console.log(glb)
    const root = glb.scene;
    root.scale.set(0.03,0.03,0.03)
    root.translateY(-40)
    scene.add(root);
},function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
},function(error){
    console.log("An error occured")
})

const Light = new THREE.PointLight(0xFFFF00, 1, 100)
Light.position.set(10, 10, 10)
Light.intensity = 4
scene.add(Light)

//Boiler plate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height, 0.1, 100)
camera.position.z=70
camera.position.y=0
camera.position.x =0
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.render(scene, camera)


function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()


//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true



