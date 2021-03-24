// Return context, scene, renderer
export function basic3(el) {
  let ctx = el.getContext("webgl", {preserveDrawingBuffer: true});
  let renderer = new THREE.WebGLRenderer({
    canvas: el,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(el.width, el.height);
  renderer.setClearColor("#FFFFFF");
  return [ctx, renderer];
}

// 
export function basic2(el) {
}

