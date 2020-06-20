
import * as THREE from './libraries/three.module.js'
import { OrbitControls } from './libraries/OrbitControls.js';
import { TransformControls } from './libraries/TransformControls.js';
import { OBJLoader } from './libraries/OBJLoader.js';
import { MTLLoader } from './libraries/MTLLoader.js';


var scene, camera, renderer, controls, transformCtrls;
var furniture = [];
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var selectedObject;
var plane = new THREE.Plane();
var pNormal = new THREE.Vector3(0, 1, 0); // plane's normal
var planeIntersect = new THREE.Vector3(); // point of intersection with the plane
var pIntersect = new THREE.Vector3(); // point of intersection with an object (plane's point)
var shift = new THREE.Vector3(); // distance between position of an object and points of intersection with the object
var isDragging = false;
var dragObject;


init();

function init() {
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(3, 5, 8);
camera.lookAt(scene.position);
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);
transformCtrls = new TransformControls(camera, renderer.domElement);
transformCtrls.showX = ! transformCtrls.showX;
transformCtrls.showZ = ! transformCtrls.showZ;

//setting up the test scene
scene.add(new THREE.GridHelper(10, 10));//wire grid
//random coloured cubes
var geometry = new THREE.BoxGeometry (1,1,1);
for (var i = 0; i <10; i++) {
var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff}));

object.position.x = Math.random() * 8-4;
object.position.y = Math.random() * 0-0;
object.position.z = Math.random() * 8-4;

object.castShadow=true;
object.receiveShadow=true;

scene.add(object);//add cubes to scene
furniture.push(object);//add cubes to furniture array

}
}


// events
/* renderer.domElement.addEventListener("click", onclick, true);

var raycaster = new THREE.Raycaster();
function onclick(event) {
alert("onclick")
raycaster.setFromCamera(mouse, camera);
var intersects = raycaster.intersectObjects(furniture, true); //array
if (intersects.length > 0) {

alert(selectedObject);
 } */

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
		var intersects = raycaster.intersectObjects(furniture);
    if (intersects.length > 0) {
    	controls.enabled = false;
    	pIntersect.copy(intersects[0].point);
      plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
      shift.subVectors(intersects[0].object.position, intersects[0].point);
      isDragging = true;
      dragObject = intersects[0].object;
      
      transformCtrls.enabled = true;
      transformCtrls.attach(intersects[0].object);
      scene.add(transformCtrls);
      transformCtrls.setMode('rotate');
    }
    
} );

document.addEventListener("mouseup", () => {
	isDragging = false;
  dragObject = null;
  // controls.enabled = false;
  // transformCtrls.enabled = true;
} );

document.body.addEventListener('keydown', keyPressed);
function keyPressed(e){

  switch(e.key) {
    case 'q': //Q to enable orbit controls
        controls.enabled = true;
        transformCtrls.enabled = false;
        break;
        case 'w': //W to enable orbit controls
        controls.enabled = false;
        transformCtrls.enabled = true;
        break;
        
  }
     
  e.preventDefault();
}

/* function detectCollision() {
	var vector = new THREE.Vector3( 1, camera.position.y, 1 );
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize());
	var intersects = ray.intersectObjects( collisionList );
	// Stop movement if less than 5 units away from collidable object
	if ( intersects.length > 0 && intersects[0].distance < 5) {
		// Disable all movement except backwards
		controls.moveForward = false;
		controls.moveRight = false;
		controls.moveLeft = false;
	}

} */

var MyUpdateLoop = function ( )
{

  renderer.render( scene, camera );
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


// OBJ + MTL loader here ------------------------------------
//white chair

var loadingManager = null;
loadingManager = new THREE.LoadingManager();
var mtlLoader = new THREE.MTLLoader();



