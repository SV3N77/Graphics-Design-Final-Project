
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
var pointLight;
var isMovableLight = false;
var isNight = true;
var light;
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

light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light ); // add enviroment light -- Christian 
light.visible = false;


/*var light = new THREE.PointLight( 0xffffff, 1, 100 ); 
light.position.set( 0, 5, 100 ); 
scene.add( light );*/

//setting up the test scene
scene.add(new THREE.GridHelper(100, 100));//wire grid
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
 

  mtlLoader.load('models/table1.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/table1.obj', function(object) {
      
      object.position.x = Math.random() * 8-4;
      object.position.y = -1;
      object.position.z = Math.random() * 8-4;
      object.scale.set(0.8,0.8,0.8)
      scene.add(object);
      furniture.push(object);

    });
    
  
  });

  mtlLoader.load('models/bed2.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/bed2.obj', function(object) {
      
      object.position.x = Math.random() * 8-4;
      object.position.y = Math.random() * 0-0;
      object.position.z = Math.random() * 8-4;
      object.scale.set(1,1,1)
      scene.add(object);
      furniture.push(object);

    });
    
  
  });

  mtlLoader.load('models/house_empty.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/house_empty.obj', function(object) {
      
      object.position.x = 100;
      object.position.y = -0.5;
      object.position.z = -20;
      object.scale.set(1.5,1.5,1.5)
      scene.add(object);


    });
  
  });

  


  /*mtlLoader.load('models/house2.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/house2.obj', function(object) {
      
      object.position.x = 5;
      object.position.y = -0.5;
      object.position.z = 5;

      object.rotation.y = 1.55
      object.scale.set(0.1,0.1,0.1)

      var pointLight = new THREE.PointLight( 0xffffff, 1, 10 );
      pointLight.position.set( 11.5, 2, 2.8 ); 
      scene.add(pointLight);
      scene.add(object);


    });
  
  });*/

  mtlLoader.load('models/cybertruck.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/cybertruck.obj', function(object) {
      
      object.position.x = 40;
      object.position.y = -0.1;
      object.position.z = 0;
      object.scale.set(3,3,3)
      scene.add(object);
      furniture.push(object);

    });
  
  });

  mtlLoader.load('models/lamp_street_2.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/lamp_street_2.obj', function(object) {
      
      var x = 35;
      var y = -0.5;
      var z = 15;
      object.position.x = x;
      object.position.y = y;
      object.position.z = z;

      //object.rotation.x = 1.55
      object.rotation.y = -1.5;
      object.scale.set(0.5, 0.5, 0.5)

      var pointLight = new THREE.PointLight( 0xFFFF00, 1, 10 );
      pointLight.position.set( x + 1, y + 10, z + 4 ); 
      scene.add(pointLight);
      scene.add(object);
  

    });
  
  });

  mtlLoader.load('models/table.mtl', function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/table.obj', function(object) {
      
      object.position.x = Math.random() * 8-4;
      object.position.y = Math.random() * 0-0;
      object.position.z = Math.random() * 8-4;

      //object.rotation.x = 1.55
      //object.rotation.y = 3.15
      object.scale.set(1,1,1)
      scene.add(object);
      furniture.push(object)
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
      object.position.y = -6;
      object.position.z = 2.8;

      object.rotation.x = 1.55
      object.rotation.y = 3.15
      object.scale.set(0.5,0.5,0.5)
      scene.add(object);
   

    });
  });
});

var textureloader = new THREE.TextureLoader();
textureloader.load('models/bed2_texture/bed2_white.jpg',function(tx){
mtlLoader.load('models/bed2.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/bed2.obj', function(object) {
    
    object.position.x = 11.5;
    object.position.y = -6;
    object.position.z = 2.8;

    object.rotation.x = 1.55
    object.rotation.y = 3.15
    object.scale.set(1,1,1)
    scene.add(object);
 

  });
});
});

var textureloader = new THREE.TextureLoader();
textureloader.load('models/study_chair_cm.jpg',function(tx){

mtlLoader.load('models/chair1.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/chair1.obj', function(object) {
    
    object.position.x = 11.5;
    object.position.y = 2;
    object.position.z = 2.8;
    object.scale.set(7,7,7)
    scene.add(object);
    furniture.push(object);

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


document.addEventListener("mousedown", () => {
  
  var intersects = raycaster.intersectObjects(furniture, true);
  if (intersects.length > 0) {
    controls.enabled = false;
    pIntersect.copy(intersects[0].point);
    plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
    shift.subVectors(intersects[0].object.position, intersects[0].point);
    isDragging = true;
    dragObject = intersects[0].object;
    //alert(intersects[0].position);
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
     
      if (dragObject.name == "")
      {
        pointLight.position.x = dragObject.position.x;
        pointLight.position.y = dragObject.position.z;
        pointLight.position.z = dragObject.position.z;
      }
    
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

        case 'c':
        var newObject = dragObject.clone();
        newObject.position.x = dragObject.position.x + 10;
        newObject.position.y = dragObject.position.y;
        newObject.position.z = dragObject.position.z;
        
        newObject.scale.set(dragObject.scale.x, dragObject.scale.y, dragObject.scale.z);
        scene.add(newObject);
        furniture.push(newObject);
        break;

        case ' ':
          if (isNight == true){
          scene.background = new THREE.CubeTextureLoader()
          .load( [
            './bg/noon/px.jpg',
            './bg/noon/nx.jpg',
            './bg/noon/py.jpg',
            './bg/noon/ny.jpg',
            './bg/noon/pz.jpg',
            './bg/noon/nz.jpg'
          ] );

          isNight = false;
          light.visible = true;
        }
          else{
            scene.background = new THREE.CubeTextureLoader()
          .load( [
            './bg/night/px.jpg',
            './bg/night/nx.jpg',
            './bg/night/py.jpg',
            './bg/night/ny.jpg',
            './bg/night/pz.jpg',
            './bg/night/nz.jpg'
          ] );
          isNight = true;
          light.visible = false;
          }
       
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




