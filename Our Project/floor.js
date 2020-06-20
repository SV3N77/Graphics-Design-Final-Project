
import * as THREE from 'libraries/three.module.js'
import { GUI } from 'libraries/dat.gui.module.js';

var effectController;
        
var floorTexture;

var meshFloor;

var floor1Material, wood4Material, wood5Material, wood6Material, wood7Material, wood8Material, greybrickMaterial, brick1Material, brick2Material; // initialise floor materials

init();
render();

        function init() {

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
        }

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

            var geometry_floor = new THREE.BoxGeometry(30,0.5,30); //Instantiate a geometry to use
            meshFloor = new THREE.Mesh( geometry_floor, 
                                        floorTexture === "floor1" ? floor1Material : (
                                        floorTexture === "wood4" ? wood4Material : (
                                        floorTexture === "wood5" ? wood5Material : (
                                        floorTexture === "wood6" ? wood6Material : (
                                        floorTexture === "wood7" ? wood7Material : (
                                        floorTexture === "wood8" ? wood8Material : (
                                        floorTexture === "greybrick" ? greybrickMaterial : (
                                        floorTexture === "brick1" ? brick1Material : brick2Material )))))))); // Instatiate the mesh with the geometry and material
            meshFloor.position.y-=10;
            scene.add(meshFloor);
        }