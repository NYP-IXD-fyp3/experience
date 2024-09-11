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
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshBasicMaterial({color: 0xffffff})
const box = new THREE.Mesh(geometry, material)
scene.add(box)

update()

function update() {
	renderer.render( scene, camera );
	window.requestAnimationFrame(update)
}

const button = ARButton.createButton(renderer)
document.body.appendChild(button)