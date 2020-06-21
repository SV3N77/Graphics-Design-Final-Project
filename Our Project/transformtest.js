
import * as THREE from './libraries/three.module.js'
import { OrbitControls } from './libraries/OrbitControls.js';
import { TransformControls } from './libraries/TransformControls.js';
import { OBJLoader } from './libraries/OBJLoader.js';
import { MTLLoader } from './libraries/MTLLoader.js';



var effectController;     
var floorTexture;
var meshFloor;
var floor1Material, wood4Material, wood5Material, wood6Material, wood7Material, wood8Material, greybrickMaterial, brick1Material, brick2Material; // initialise floor materials
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
var pointLight;

init();


function init() {
scene = new THREE.Scene();

scene.background = new THREE.CubeTextureLoader()

	.load( [
		'./bg/night/px.jpg',
		'./bg/night/nx.jpg',
		'./bg/night/py.jpg',
		'./bg/night/ny.jpg',
		'./bg/night/pz.jpg',
		'./bg/night/nz.jpg'
  ] );
  
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

var light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light ); // add enviroment light -- Christian 

 // TEXTURE LOADER
 var loader = new THREE.TextureLoader();
 loader.crossOrigin = ''; //Allow cross origin loading

 // TEXTURE MAPS
 var floor1Map = loader.load( 'img/floor1.jpg' );
 floor1Map.wrapS = floor1Map.wrapT = THREE.RepeatWrapping;
 floor1Map.repeat = new THREE.Vector2(2,2);

 var wood4Map = loader.load( 'img/wood4.jpg' );
 wood4Map.wrapS = wood4Map.wrapT = THREE.RepeatWrapping;
 wood4Map.repeat = new THREE.Vector2(2,2);

 var wood5Map = loader.load( 'img/wood5.jpg' );
 wood5Map.wrapS = wood5Map.wrapT = THREE.RepeatWrapping;
 wood5Map.repeat = new THREE.Vector2(2,2);

 var wood6Map = loader.load( 'img/wood6.png' );
 wood6Map.wrapS = wood6Map.wrapT = THREE.RepeatWrapping;
 wood6Map.repeat = new THREE.Vector2(2,2);

 var wood7Map = loader.load( 'img/wood7.jpg' );
 wood7Map.wrapS = wood7Map.wrapT = THREE.RepeatWrapping;
 wood7Map.repeat = new THREE.Vector2(2,2);

 var greybrickMap = loader.load( 'img/greybrick.jpg' );
 greybrickMap.wrapS = greybrickMap.wrapT = THREE.RepeatWrapping;
 greybrickMap.repeat = new THREE.Vector2(2,2);

 var brick1Map = loader.load( 'img/brick1.jpg' );
 brick1Map.wrapS = brick1Map.wrapT = THREE.RepeatWrapping;
 brick1Map.repeat = new THREE.Vector2(2,2);

 var brick2Map = loader.load( 'img/brick2.jpg' );
 brick2Map.wrapS = brick2Map.wrapT = THREE.RepeatWrapping;
 brick2Map.repeat = new THREE.Vector2(2,2);

 // MATERIALS
 floor1Material = new THREE.MeshBasicMaterial( { map: floor1Map, side: THREE.DoubleSide } );
 wood4Material = new THREE.MeshBasicMaterial( { map: wood4Map, side: THREE.DoubleSide } );
 wood5Material = new THREE.MeshBasicMaterial( { map: wood5Map, side: THREE.DoubleSide } );
 wood6Material = new THREE.MeshBasicMaterial( { map: wood6Map, side: THREE.DoubleSide } );
 wood7Material = new THREE.MeshBasicMaterial( { map: wood7Map, side: THREE.DoubleSide } );
 wood8Material = new THREE.MeshBasicMaterial( { map: loader.load( 'img/wood8.png' ), side: THREE.DoubleSide } );
 greybrickMaterial = new THREE.MeshBasicMaterial( { map: greybrickMap, side: THREE.DoubleSide } );
 brick1Material = new THREE.MeshBasicMaterial( { map: brick1Map, side: THREE.DoubleSide } );
 brick2Material = new THREE.MeshBasicMaterial( { map: brick2Map, side: THREE.DoubleSide } );
 
 // GUI
 setupGui();

/*var light = new THREE.PointLight( 0xffffff, 1, 100 ); 
light.position.set( 0, 5, 100 ); 
scene.add( light );*/

//setting up the test scene
scene.add(new THREE.GridHelper(10, 10));//wire grid
//random coloured cubes
var geometry = new THREE.BoxGeometry (1,1,1);
for (var i = 0; i <1; i++) {
var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff}));

var randomX = Math.random() * 8-4; 
var randomY = Math.random() * 0-0;
var randomZ = Math.random() * 8-4;

object.position.x = randomX;
object.position.y = randomY;
object.position.z = randomZ;

 // Random light with object --Christian
pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set( randomX, randomY, randomZ ); 
scene.add( pointLight );

object.castShadow=true;
object.receiveShadow=true;

scene.add(object);//add cubes to scene
furniture.push(object);//add cubes to furniture array

}

}
var loadingManager = null;
loadingManager = new THREE.LoadingManager();



// OBJ + MTL loader here ------------------------------------
//white chair
function addFurnitures() {

  var mtlLoader = new MTLLoader();
  mtlLoader.load('models/chair.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/chair.obj', function(object) {
      object.castShadow=true;
      object.receiveShadow=true;
  
      object.position.x = Math.random() * 8-4;
      object.position.y = Math.random() * 0-0;
      object.position.z = Math.random() * 8-4;
      object.scale.set(1,1,1)
      scene.add(object);
      furniture.push(object);
  

    });
  });

  mtlLoader.load('models/Artichoke.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/Artichoke.obj', function(object) {
      
      object.position.x = Math.random() * 8-4;
      object.position.y = Math.random() * 0-0;
      object.position.z = Math.random() * 8-4;
      object.scale.set(0.01,0.01,0.01)
      scene.add(object);
      furniture.push(object);

    });
    
  
  });

  mtlLoader.load('models/house_empty.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/house_empty.obj', function(object) {
      
      object.position.x = 33;
      object.position.y = -0.5;
      object.position.z = -7;
      object.scale.set(0.5,0.5,0.5)
      scene.add(object);


    });
  
  });

  mtlLoader.load('models/cybertruck.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/cybertruck.obj', function(object) {
      
      object.position.x = 13;
      object.position.y = -0.1;
      object.position.z = 0;
      object.scale.set(1,1,1)
      scene.add(object);
      furniture.push(object);

    });
  
  });




  var textureloader = new THREE.TextureLoader();
  textureloader.load('models/grass_texture/grass.jpg',function(tx){
  mtlLoader.load('models/grass.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/grass.obj', function(object) {
      
      object.position.x = 11.5;
      object.position.y = -0.5;
      object.position.z = 2.8;

      object.rotation.x = 1.55
      object.rotation.y = 3.15
      object.scale.set(0.02,0.02,0.02)
      scene.add(object);
   

    });
  
  });
});
  
/*var textureloader = new THREE.TextureLoader();
  textureloader.load('models/lamp_street_texture/lamp_street_old.png',function(tx){
  mtlLoader.load('models/lamp_street.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/lamp_street.obj', function(object) {
      
      object.position.x = 11.5;
      object.position.y = 5;
      object.position.z = 2.8;

      object.rotation.x = 1.55
      object.rotation.y = 3.15
      object.scale.set(10,10,10)
      scene.add(object);
      furniture.push(object);

    });
  
  });
});*/






}

addFurnitures();

function setupGui() {
            
  effectController = {
      newFloor: "floor1",
  };

  var h;

  var gui = new dat.GUI();

  // ATTRIBUTES

  h = gui.addFolder( "Textures" );

  h.add ( effectController, "newFloor", [ "floor1", "wood4", "wood5", "wood6", "wood7", "wood8", "greybrick", "brick1", "brick2" ] ).name( "Floor" ).onChange( render );
}

function render() {
  
  if ( effectController.newFloor !== floorTexture ) {
          
          floorTexture = effectController.newFloor;

          createNewRoom();
       };
  
  renderer.render(scene,camera);
}

function createNewRoom() {
  
  if ( meshFloor !== undefined ) {

      meshFloor.geometry.dispose();
      scene.remove ( meshFloor );
  }

  var geometry_floor = new THREE.BoxGeometry(22,0.5,20); //Instantiate a geometry to use
  meshFloor = new THREE.Mesh( geometry_floor, 
                              floorTexture === "floor1" ? floor1Material : (
                              floorTexture === "wood4" ? wood4Material : (
                              floorTexture === "wood5" ? wood5Material : (
                              floorTexture === "wood6" ? wood6Material : (
                              floorTexture === "wood7" ? wood7Material : (
                              floorTexture === "wood8" ? wood8Material : (
                              floorTexture === "greybrick" ? greybrickMaterial : (
                              floorTexture === "brick1" ? brick1Material : brick2Material )))))))); // Instatiate the mesh with the geometry and material
  meshFloor.position.y-=0.7;
  scene.add(meshFloor);
}


document.addEventListener("mousedown", () => {
  
  var intersects = raycaster.intersectObjects(furniture, true);
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

//alert(furniture)

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
      pointLight.position.x = dragObject.position.x;
      pointLight.position.y = dragObject.position.z;
      pointLight.position.z = dragObject.position.z;
    
    }
});



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




