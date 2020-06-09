let scene, camera, renderer;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(-900,-200,-900);
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', renderer);
  controls.minDistance = 500;
  controls.maxDistance = 1500;
  
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load( 'bg/ft.jpg');
  let texture_bk = new THREE.TextureLoader().load( 'bg/bk.jpg');
  let texture_up = new THREE.TextureLoader().load( 'bg/up.jpg');
  let texture_dn = new THREE.TextureLoader().load( 'bg/dn.jpg');
  let texture_rt = new THREE.TextureLoader().load( 'bg/rt.jpg');
  let texture_lf = new THREE.TextureLoader().load( 'bg/lf.jpg');
    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  scene.add( skybox );  
  animate();
}

function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
init();
    
//Create the scene
    var scene = new THREE.Scene( );
    var ratio = window.innerWidth/window.innerHeight;

    //Create the perspective camera
    var camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
    camera.position.set(30,15,30); //set camera position
	  camera.lookAt(0,0,0); //set camera direction

    var renderer = new THREE.WebGLRenderer( ); //Create the WebGL renderer
    renderer.setSize(window.innerWidth,window.innerHeight); //Set the size of the rendering window
    document.body.appendChild(renderer.domElement ); //Add the renderer to the current document

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

    //Instantiate the material we will be using
    var material_floor = new THREE.MeshBasicMaterial();
    //Instantiate a geometry to use
    var geometry_floor = new THREE.BoxGeometry(30,0.5,30);
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
    var geometry_wall = new THREE.BoxGeometry(0.5,25,30);
    // Instatiate the mesh with the geometry and material
    var meshWall = new THREE.Mesh( geometry_wall, material_wall );
    meshWall.position.y+=2.25;
    meshWall.position.x-=15.25;

    var material_wall2 = new THREE.MeshBasicMaterial();
    //Instantiate a geometry to use
    var geometry_wall2 = new THREE.BoxGeometry(30,25,0.5);
    // Instatiate the mesh with the geometry and material
    var meshWall2 = new THREE.Mesh( geometry_wall2, material_wall2 );
    meshWall2.position.y+=2.25;
    meshWall2.position.z-=15.25;

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

    //Light for test purposes
    var cameralight = new THREE.PointLight( new THREE.Color(1,1,1), 1 );
    camera.add( cameralight );
    scene.add(camera);

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