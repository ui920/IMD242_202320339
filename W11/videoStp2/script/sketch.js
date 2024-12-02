let cp;
let canvasW, canvasH;
let scale;
let cpW, cpH;

function setup() {
  canvasW = 640;
  canvasH = 480;
  createCanvas(canvasW, canvasH);

  scale = 0.1;
  cpW = canvasW * scale;
  cpH = canvasH * scale;
  cp = createCapture(VIDEO, { flipped: true });
  cp.size(cpW, cpH);
  cp.hide();
}

function draw() {
  background(0);
  // image(cp, 0, 0, width, height);
  for (let y = 0; y < cpH; y++) {
    for (let x = 0; x < cpW; x++) {
      let colour = cp.get(x, y);
      let b = brightness(colour);
      let diameter = map(b, 0, 250, 0, 30);
      // Stroke(255);
      // circle(10 * x + 5, 10 * y + 5, diameter);
      fill('yellow');
      stroke(100, 150, 255);
      strokeWeight(1);
      drawStar(10 * x + 10, 10 * y + 10, diameter / 2, diameter / 4, 5);
    }
  }
}
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
