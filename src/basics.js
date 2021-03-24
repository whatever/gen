// Return context, scene, renderer
export function basic3(el) {
  let ctx = el.getContext("webgl", {preserveDrawingBuffer: true});
  let renderer = new THREE.WebGLRenderer({
    canvas: el,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(2*el.width, 2*el.height);
  renderer.setClearColor("#FFFFFF");
  return [ctx, renderer];
}

// 
export function basic2(el) {
}

