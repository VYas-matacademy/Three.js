var scene = (function(){
    "use strict";

   var scene = new THREE.Scene();

   var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ alpha: true }) : new THREE.CanvasRenderer();

   var camera;
   var sphere;
   var itemsToRotate = [];
   var material;
   var controls;


   function initScene() {

       renderer.setSize(window.innerWidth, window.innerHeight);

       document.getElementById('item').appendChild(renderer.domElement);

       camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.01, 1000);
       camera.position.x = 0;
       camera.position.z = 0;
       camera.position.z = 15;



       var loader = new THREE.TextureLoader();
     
       loader.load('earth.jpg', function (image) {
           material = new THREE.MeshBasicMaterial({ map: image });
      
       sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), material);    
   
       itemsToRotate.push(sphere);
       
       var stars = createStars();

       scene.add(camera);
       scene.add(sphere);
       scene.add(stars);
 
       controls = new THREE.TrackballControls(camera);

       render();
       });
   }

   function render() {
       controls.update();
       sphere.rotation.x += 0.003;
       sphere.rotation.y +=0.005;
       renderer.render(scene, camera);
       requestAnimationFrame(render);
   }

    function createStars() {
        return new THREE.Mesh(new THREE.SphereGeometry(90, 64, 64),
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('galaxy.png'),
                side: THREE.BackSide
            })
        );
    }

   return {
       initScene: initScene
   }
})();