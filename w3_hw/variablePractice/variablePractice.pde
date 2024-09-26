void setup() {
  size(1280, 720);
  background(255);
}

void mousePressed() {
  background(255);
}

void draw() {
  float x = random(width);   
  float y = random(height);
  float s = random(.5, 3);
  float r = random(100);
  float g = random(0);
  float b = random(240);
  strokeWeight(s);
  stroke(r, g, b, 45);
  line(width / 2, height / 2, x, y);
}
