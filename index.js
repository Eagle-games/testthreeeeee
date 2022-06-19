import * as THREE from'https://unpkg.com/three@0.126.1/build/three.module.js';

var WIDTH = 800;
var HEIGHT = 600;

// レンダラー
let renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer:true
});
renderer.setSize( WIDTH, HEIGHT );
renderer.autoClearColor = false;
document.body.appendChild(renderer.domElement);

// メイン描画用のシーンとカメラ
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 100 );
camera.position.z = 5;
camera.lookAt({x:0, y:0, z:0 });

// メイン描画オブジェクト、とりあえずBox
var box = new THREE.BoxGeometry(2, 2, 2);
var mat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});
var mesh = new THREE.Mesh(box, mat);
scene.add(mesh);


// 背景オブジェクト用のシーンとメッシュ
var scene_bg = new THREE.Scene();
var camera_bg = new THREE.OrthographicCamera(0, WIDTH, HEIGHT, 0, 0, 1000);

var bg_geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 10, 10);
var bg_material = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: .04,
});
var bg = new THREE.Mesh(bg_geometry, bg_material);
bg.position.x = WIDTH/2;
bg.position.y = HEIGHT/2;
scene_bg.add(bg);

main();
function main() {
  mesh.rotation.x+=.01;
  mesh.rotation.y+=.02;
  renderer.render( scene, camera );
  renderer.render( scene_bg, camera_bg );
  requestAnimationFrame(main);
}
