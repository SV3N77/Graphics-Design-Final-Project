
import * as THREE from './libraries/three.module.js'
import { DragControls } from './libraries/DragControls.js';
import { OrbitControls } from './libraries/OrbitControls.js';
import { TransformControls } from './libraries/TransformControls.js';
import { OBJLoader } from './libraries/OBJLoader.js';
import { MTLLoader } from './libraries/MTLLoader.js';


var control,orbit,renderer,scene,camera;

//Create the scene
var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;

//Create the perspective camera
var camera = new THREE.PerspectiveCamera(45, ratio, 0.1,1500);
camera.position.set(100, 50, 100); //set camera position
camera.lookAt(0, 0, 0); //set camera direction

var renderer = new THREE.WebGLRenderer(); //Create the WebGL renderer
renderer.setSize(window.innerWidth, window.innerHeight); //Set the size of the rendering window
document.body.appendChild(renderer.domElement); //Add the renderer to the current document

// //create orbit controls
// controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled= false;

//array for storing objects to move
var objects = [];

// //DRAG CONTROLS
// dragcontrol = new DragControls (objects,camera,renderer.domElement); 
// dragcontrol.enabled=false;

// //TRANSFORMCONTROLS
// transform = new TransformControls (objects, camera, renderer.domElement);
// transform.enabled = false;

orbit = new OrbitControls( camera, renderer.domElement );
				orbit.update();
				orbit.addEventListener( 'change', renderer );

				control = new TransformControls( objects, camera, renderer.domElement );
				control.addEventListener( 'change', renderer );

				control.addEventListener( 'dragging-changed', function ( event ) {

					orbit.enabled = ! event.value;

				} );
				

				//control.attach( objects);
				scene.add( control );

//Instantiate a texture loader
var loader = new THREE.TextureLoader();
//Allow cross origin loading
loader.crossOrigin = '';

//The floor textures to use
var arr = [
  'img/floor1.jpg',
  'img/wood4.jpg',
  'img/wood5.jpg',
  'img/concretewall.jpg',
  'img/brickwall1.jpg',
  'img/brickwall2.jpg',
  'img/carpet.jpg'
];
var textureToShowFloor = 0;

//The wall textures to use
var arr2 = [
  'img/wall1.jpg',
  'img/woodwall1.jpg',
  'img/floor1.jpg',
  'img/wood1.jpg',
  'img/wood2.jpg',
  'img/wood3.jpg',
  'img/wood4.jpg',
  'img/concretewall.jpg',
  'img/brickwall1.jpg',
  'img/brickwall2.jpg',
  'img/redbg.png'
];
var textureToShowWall = 0;

//Instantiate a geometry to use
var sky_geometry = new THREE.SphereGeometry(1000,64,64);
//Instantiate a texture to use
var sky_texture = new THREE.TextureLoader().load('img/sky.jpg');
sky_texture.wrapS = sky_texture.wrapT = THREE.RepeatWrapping;
sky_texture.repeat.set(4,4);
//Instantiate the material we will be using
var sky_material = new THREE.MeshBasicMaterial({map: sky_texture, side: THREE.BackSide});
// Instatiate the mesh with the geometry and material
var sky_mesh = new THREE.Mesh( sky_geometry, sky_material );
scene.add( sky_mesh );

//Instantiate the material we will be using
var material_floor = new THREE.MeshPhongMaterial();

material_floor.shininess = 10;
//Instantiate a geometry to use
var geometry_floor = new THREE.BoxGeometry(200,5,200);
// Instatiate the mesh with the geometry and material
var meshFloor = new THREE.Mesh( geometry_floor, material_floor );
meshFloor.position.y-=10;



//Instantiate the material we will be using
var material_wall = new THREE.MeshBasicMaterial();
//Instantiate a geometry to use
var geometry_wall = new THREE.BoxGeometry(5, 60, 20);
// Instatiate the mesh with the geometry and material
var meshWall = new THREE.Mesh(geometry_wall, material_wall);
meshWall.position.y += 17.5;
meshWall.position.x -= 100;

var material_wall2 = new THREE.MeshBasicMaterial();
//Instantiate a geometry to use
var geometry_wall2 = new THREE.BoxGeometry(30, 25, 0.5);
// Instatiate the mesh with the geometry and material
var meshWall2 = new THREE.Mesh(geometry_wall2, material_wall2);
meshWall2.position.y += 17.5;
meshWall2.position.z -= 100;


// Then load the texture
loader.load(arr[textureToShowFloor], function (texFloor) {
    //Repeat the texture
    texFloor.wrapS = texFloor.wrapT = THREE.RepeatWrapping;
    texFloor.repeat = new THREE.Vector2(3, 3);
    // Once the texture has loaded
    // Asign it to the material
    material_floor.map = texFloor;
    // Update the next texture to show
    textureToShowFloor++;
    // Add the mesh into the scene
    scene.add(meshFloor);
  });

// Then load the texture
loader.load(arr2[textureToShowWall], function (texWall) {
  //Repeat the texture
  texWall.wrapS = texWall.wrapT = THREE.RepeatWrapping;
  texWall.repeat = new THREE.Vector2(3, 3);
  // Once the texture has loaded
  // Asign it to the material
  material_wall.map = texWall;
  material_wall2.map = texWall;
  // Update the next texture to show
  textureToShowWall++;
  // Add the mesh into the scene
  scene.add(meshWall);
  scene.add(meshWall2);
});
//Light for test purposes
var cameralight = new THREE.PointLight( new THREE.Color(1,1,1), 0 );
camera.add( cameralight );
scene.add(camera);
//ambient light
var ambientlight = new THREE.AmbientLight(new THREE.Color(1,1,1),0.8);
  scene.add(ambientlight);



 

// function init(){
// // var geometry = new THREE.BoxGeometry (8,8,8);
// // for (var i = 0; i <10; i++) {
// // var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {color: Math.random() * 0xffffff}));

// // object.position.x = Math.random() * 80-40;
// // object.position.y = Math.random() * 0-0;
// // object.position.z = Math.random() * 80-10;

// // object.castShadow=true;
// // object.receiveShadow=true;

// // scene.add(object);
// // objects.push(object);

// }
// }


function handleKeyDown(event) {
  if (event.keyCode === 49) //49 == When '1' is pressed
  {
    loader.load(arr[textureToShowFloor], function (texFloor) {
      //Repeat the texture
      texFloor.wrapS = texFloor.wrapT = THREE.RepeatWrapping;
      texFloor.repeat = new THREE.Vector2(3, 3);
      // Once the texture has loaded
      // Asign it to the material
      material_floor.map = texFloor;
      // Update the next texture to show
      textureToShowFloor++;
      // Have we got to the end of the textures array
      if (textureToShowFloor > arr.length - 1) {
        textureToShowFloor = 0;
      }
    });
  }
  if (event.keyCode === 50) //50 == When '2' is pressed
  {
    loader.load(arr2[textureToShowWall], function (texWall) {
      //Repeat the texture
      texWall.wrapS = texWall.wrapT = THREE.RepeatWrapping;
      texWall.repeat = new THREE.Vector2(3, 3);
      // Once the texture has loaded
      // Asign it to the material
      material_wall.map = texWall;
      material_wall2.map = texWall;
      // Update the next texture to show
      textureToShowWall++;
      // Have we got to the end of the textures array
      if (textureToShowWall > arr2.length - 1) {
        textureToShowWall = 0;
      }
    });

    if (event.keyCode === 81) //81 == When 'Q' is pressed
    {
      control.setMode( "translate" );
        // controls.enabled = false;
        // transform.enabled = false;
        // dragcontrol.enabled = true;
}
if (event.keyCode === 87) //87 == When 'W' is pressed
{
  control.setMode( "rotate" );
    // controls.enabled = true;
    // transform.enabled = false;
    // dragcontrol.enabled = false;
}
  }
  if (event.keyCode === 69) //69 == When 'E' is pressed
{
    controls.enabled = false;
    transform.enabled = true;
    dragcontrol.enabled = false;
}
}
  


//Add keyboard listener
window.addEventListener('keydown', handleKeyDown, false);

function animate() {
    requestAnimationFrame(animate)
}

init();
animate(); 





// //Light for test purposes
// var cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
// camera.add(cameralight);
// scene.add(camera);
function init(){
var objLoader = new OBJLoader ();

var mtlLoader = new MTLLoader();
// OBJ + MTL loader here ------------------------------------
//chair
mtlLoader.load('models/newchair.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/newchair.obj', function(object) {
    object.position.y += 7;
    object.position.x += 50;
    object.position.z += 10;
    object.rotation.set(0,110,0);
    object.scale.set(35, 35, 35)
    scene.add(object);
    objects.push(object)
  });
});

mtlLoader.load('models/newchair.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/newchair.obj', function(object) {
    object.position.y += 7;
    object.position.x += 20;
    object.position.z += 50;
    object.rotation.set(0,190,0);
    object.scale.set(35, 35, 35)
    scene.add(object);
    objects.push(object)
  });
});

mtlLoader.load('models/newchair.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/newchair.obj', function(object) {
    object.position.y += 7;
    object.position.x += 15;
    object.position.z += -45;
    object.rotation.set(0,200,0);
    object.scale.set (35, 35, 35)
    scene.add(object);
    objects.push(object)
  });
});



//flower pots
mtlLoader.load('models/flower-vase.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/flower-vase.obj', function(object) {
    object.position.y += 18.5;
    object.position.x += 20;
    object.position.z += 0;
    object.scale.set(5, 5, 5)
    scene.add(object);
    objects.push(object)
  });
});

mtlLoader.load('models/flower-vase.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/flower-vase.obj', function(object) {
    object.position.y -= 4;
    object.position.x += 40;
    object.position.z += -90;
    object.scale.set(5, 5, 5)
    scene.add(object);
    objects.push(object)
  });
});

mtlLoader.load('models/flower-vase.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/flower-vase.obj', function(object) {
    object.position.y -= 4;
    object.position.x += -90;
    object.position.z += 90;
    object.scale.set(5, 5, 5)
    scene.add(object);
    objects.push(object)
  });
});
// table
mtlLoader.load('models/table.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/table.obj', function(desk) {
    desk.position.y -= 8;
    desk.position.x += 20;
    desk.position.z += 0;
    desk.scale.set(6, 8, 6);
    scene.add(desk);
    objects.push(desk)
  });
});

}
//final update loop
var MyUpdateLoop = function ( )
{
//call the render with the scene and the camera
renderer.render(scene,camera);

controls.update();

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
