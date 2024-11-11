let capture;

function setup() {
  createCanvas(500, 500);
  capture = createCapture(VIDEO);
  capture.size(200, 200);
  capture.hide();
}

function draw() {
  background(220);
  image(capture, 0, 0, width, height);
}
