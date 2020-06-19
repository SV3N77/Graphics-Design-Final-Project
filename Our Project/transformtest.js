
import * as THREE from './libraries/three.module.js'
import { OrbitControls } from './libraries/OrbitControls.js';
import { OBJLoader } from './libraries/OBJLoader.js';
import { MTLLoader } from './libraries/MTLLoader.js';


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(3, 5, 8);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);
var objects = [];

scene.add(new THREE.GridHelper(10, 10));

// tetrahedron
var h = 1.3333333432674408;
var pyramidGeom = new THREE.ConeBufferGeometry(Math.sqrt(2/3), h, 3);
pyramidGeom.translate(0, h * 0.5, 0);

var pyramidMat = new THREE.MeshBasicMaterial({color: "red"});

var pyramid = new THREE.Mesh(pyramidGeom, pyramidMat);
scene.add(pyramid);

// edges
var pyramidEdges = new THREE.EdgesGeometry(pyramidGeom);
var edges = new THREE.LineSegments(pyramidEdges, new THREE.LineBasicMaterial({color: "orange"}));
pyramid.add(edges);
objects.push(pyramid);




// scene.add(object);
// objects.push(object);
// 


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var plane = new THREE.Plane();
var pNormal = new THREE.Vector3(0, 1, 0); // plane's normal
var planeIntersect = new THREE.Vector3(); // point of intersection with the plane
var pIntersect = new THREE.Vector3(); // point of intersection with an object (plane's point)
var shift = new THREE.Vector3(); // distance between position of an object and points of intersection with the object
var isDragging = false;
var dragObject;

// events
document.addEventListener("mousemove", event => {

  	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
		
    if (isDragging) {
    	raycaster.ray.intersectPlane(plane, planeIntersect);
      dragObject.position.addVectors(planeIntersect, shift);
    }
});

document.addEventListener("mousedown", () => {
		var intersects = raycaster.intersectObjects([objects]);
    if (intersects.length > 0) {
    	controls.enabled = false;
    	pIntersect.copy(intersects[0].point);
      plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
      shift.subVectors(intersects[0].object.position, intersects[0].point);
      isDragging = true;
      dragObject = intersects[0].object;
      
    }
} );

document.addEventListener("mouseup", () => {
	isDragging = false;
  dragObject = null;
  controls.enabled = true;
} );

document.body.addEventListener('keydown', keyPressed);
function keyPressed(e){
  switch(e.key) {
    case 'ArrowLeft':
        pyramid.rotateY(-0.1);
        controls.enabled = false;
        break;
    case 'ArrowRight':
        pyramid.rotateY(0.1);
        controls.enabled = false;
        break;
  }
  e.preventDefault();
 render();
}


var MyUpdateLoop = function ( )
{
//call the render with the scene and the camera
renderer.render(scene,camera);

//finally perform a recoursive call to update again
//this must be called because the mouse change the camera position
requestAnimationFrame(MyUpdateLoop);

};

MyUpdateLoop();

//this function is called when the window is resized
var MyResize = function ( )
{
var width = window.innerWidth;
var height = window.innerHeight;
renderer.setSize(width,height);
camera.aspect = width/height;
camera.updateProjectionMatrix();
renderer.render(scene,camera);
};

//link the resize of the window to the update of the camera
window.addEventListener( 'resize', MyResize);

