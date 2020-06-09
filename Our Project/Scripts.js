
var controls,renderer,scene,camera;

 //Create the scene 
  scene = new THREE.Scene( );
  ratio = window.innerWidth/window.innerHeight;
  
  //Create the perspective camera
  camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
  camera.position.set(100,15,100); //set camera position
  camera.lookAt(0,0,0); //set camera direction
  
  renderer = new THREE.WebGLRenderer( ); //Create the WebGL renderer
  renderer.setSize(window.innerWidth,window.innerHeight); //Set the size of the rendering window
  document.body.appendChild(renderer.domElement ); //Add the renderer to the current document
  //Instantiate a texture loader

  //-------------------------------------------------------------------------------------------
  
//---------------------------------------------------------------------------------------------------


//Global variables
  
 

//Global variables
var loader = new THREE.TextureLoader();
//Allow cross origin loading
loader.crossOrigin = '';

//The floor textures to use
var arr = [
  'img/floor1.jpg',
  'img/wood4.jpg',
  'img/wood5.jpg',
  'img/wood6.png',
  'img/wood7.jpg',
  'img/wood8.png',
  'img/greybrick.jpg',
  'img/brick1.jpg',
  'img/brick2.jpg'
];
var textureToShowFloor = 0;

//The wall textures to use
var arr2 = [
  'img/wall1.jpg',
  'img/floor1.jpg',
  'img/wood1.jpg',
  'img/wood2.jpg',
  'img/wood3.jpg',
  'img/wood4.jpg',
  'img/wood5.jpg',
  'img/wood6.png',
  'img/wood8.png',
  'img/greybrick.jpg',
  'img/brick1.jpg',
  'img/brick2.jpg',
  'img/redbg.png'
];
var textureToShowWall = 0;

//Instantiate the material we will be using
var material_floor = new THREE.MeshBasicMaterial();
//Instantiate a geometry to use
var geometry_floor = new THREE.BoxGeometry(200,0.5,200);
// Instatiate the mesh with the geometry and material
var meshFloor = new THREE.Mesh( geometry_floor, material_floor );
meshFloor.position.y-=10;


// Then load the texture
loader.load(arr[textureToShowFloor], function(texFloor) {
//Repeat the texture
texFloor.wrapS = texFloor.wrapT = THREE.RepeatWrapping;
texFloor.repeat = new THREE.Vector2(3,3);
// Once the texture has loaded
// Asign it to the material
material_floor.map = texFloor;
// Update the next texture to show
textureToShowFloor++;
// Add the mesh into the scene
scene.add( meshFloor );
});

//Instantiate the material we will be using
var material_wall = new THREE.MeshBasicMaterial();
//Instantiate a geometry to use
var geometry_wall = new THREE.BoxGeometry(0.5,30,200);
// Instatiate the mesh with the geometry and material
var meshWall = new THREE.Mesh( geometry_wall, material_wall );
meshWall.position.y+=2.25;
meshWall.position.x-=100;

var material_wall2 = new THREE.MeshBasicMaterial();
//Instantiate a geometry to use
var geometry_wall2 = new THREE.BoxGeometry(200,30,0.5);
// Instatiate the mesh with the geometry and material
var meshWall2 = new THREE.Mesh( geometry_wall2, material_wall2 );
meshWall2.position.y+=2.25;
meshWall2.position.z-=100;

// Then load the texture
loader.load(arr2[textureToShowWall], function(texWall) {
//Repeat the texture
texWall.wrapS = texWall.wrapT = THREE.RepeatWrapping;
texWall.repeat = new THREE.Vector2(3,3);
// Once the texture has loaded
// Asign it to the material
material_wall.map = texWall;
material_wall2.map = texWall;
// Update the next texture to show
textureToShowWall++;
// Add the mesh into the scene
scene.add( meshWall );
scene.add( meshWall2 );
});
  //Light for test purposes
var cameralight = new THREE.PointLight( new THREE.Color(1,1,1), 1 );
camera.add( cameralight );
scene.add(camera);




function handleKeyDown(event) {
  if (event.keyCode === 49) //49 == When '1' is pressed
  {
    loader.load(arr[textureToShowFloor], function(texFloor) {
      //Repeat the texture
      texFloor.wrapS = texFloor.wrapT = THREE.RepeatWrapping;
      texFloor.repeat = new THREE.Vector2(3,3);
      // Once the texture has loaded
      // Asign it to the material
      material_floor.map = texFloor;
      // Update the next texture to show
      textureToShowFloor++;
      // Have we got to the end of the textures array
      if(textureToShowFloor > arr.length-1) {
        textureToShowFloor = 0;
      }
    });
  }
  if (event.keyCode === 50) //50 == When '2' is pressed
  {
    loader.load(arr2[textureToShowWall], function(texWall) {
      //Repeat the texture
      texWall.wrapS = texWall.wrapT = THREE.RepeatWrapping;
      texWall.repeat = new THREE.Vector2(3,3);
      // Once the texture has loaded
      // Asign it to the material
      material_wall.map = texWall;
      material_wall2.map = texWall;
      // Update the next texture to show
      textureToShowWall++;
      // Have we got to the end of the textures array
      if(textureToShowWall > arr2.length-1) {
        textureToShowWall = 0;
      }
    });
  }
}


//Add keyboard listener
window.addEventListener('keydown', handleKeyDown, false);

controls = new THREE.OrbitControls( camera, renderer.domElement );

var loader = new THREE.OBJLoader ();

var mtlLoader = new THREE.MTLLoader(); // OBJ + MTL loader here ------------------------------------

mtlLoader.load('models/chair.mtl', function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/chair.obj', function(object) {
    object.position.y += -5;
    object.position.x += 0;
    object.position.z += 40;
    object.scale.set(10,10,10)
    scene.add(object);
  });
});



mtlLoader.load('models/3d-model.mtl', function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/3d-model.obj', function(object) {
    object.position.y -=10;
    object.position.x -=10;
    object.scale.set(0.01,0.01,0.01)
    scene.add(object);
  });
});

mtlLoader.load('models/Artichoke.mtl', function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('models/Artichoke.obj', function(object) {
    object.position.y += -5;
    object.position.x += 100;
    object.position.z += -50;
    object.scale.set(0.1, 0.1, 0.1)
    scene.add(object);
  });
});



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
