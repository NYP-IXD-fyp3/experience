import * as THREE from './three.js'

//canvas setup
const threejsCanvas = document.querySelector('#threejs-canvas')
let width = threejsCanvas.offsetWidth
let height = threejsCanvas.offsetHeight

import { ARButton } from 'https://unpkg.com/three@0.168.0/examples/jsm/webxr/ARButton.js'

//camera setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 )
camera.position.set(10,10,10)
camera.lookAt(0,0,0)

//renderer
const renderer = new THREE.WebGLRenderer({ 
	antialias: true,
	alpha: true,
});
renderer.setSize( width, height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.xr.enabled = true
threejsCanvas.appendChild(renderer.domElement)

//3d box
const geometry = new THREE.IcosahedronGeometry(5,4)
const material = new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true})
const obj = new THREE.Mesh(geometry, material)
scene.add(obj)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000)
scene.add(hemiLight)

update()

window.addEventListener('resize', onResize)

function update() {
	obj.rotation.z += 0.01
	obj.rotation.x += 0.01

	renderer.render( scene, camera );
	window.requestAnimationFrame(update)
}

function onResize() {
	width = threejsCanvas.offsetWidth
	height = threejsCanvas.offsetHeight

	renderer.setSize(width, height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

	camera.aspect = width / height
	camera.updateProjectionMatrix()
}

const button = ARButton.createButton(renderer)
document.body.appendChild(button)