int centerX, centerY;
int clockRadius = 300;
int hl = 180;
int ml = 260;
int sl = 275;

void setup() {
  size(800, 800);
  centerX = width / 2;
  centerY = height / 2;
}

void draw() {
  background(255);
  translate(centerX, centerY);
  stroke(0);
  strokeWeight(9);
  noFill();
  circle(0, 0, 600);

  for (int i = 0; i < 60; i++) {
    float angle = 360 / 60 * i;
    float x1 = (clockRadius - 20);
    float y1 = 0;
    float x2 = (clockRadius - 7);
    float y2 = 0;

    if (i % 5 == 0) {
      strokeWeight(5);
      stroke(0);
    } else {
      strokeWeight(2);
      stroke(0);
    }

    pushMatrix();
    rotate(radians(angle));
    line(x1, y1, x2, y2);
    popMatrix();
  }

  int h = hour();
  int m = minute();
  int s = second();

  strokeWeight(4.5);
  float hA = (360 / 12) * h - 90;
  pushMatrix();
  rotate(radians(hA));
  line(0, 0, hl, 0);
  popMatrix();

  strokeWeight(4.5);
  float mA = (360 / 60) * m - 90;
  pushMatrix();
  rotate(radians(mA));
  line(0, 0, ml, 0);
  popMatrix();

  strokeWeight(2);
  float sA = (360 / 60) * s - 90;
  pushMatrix();
  rotate(radians(sA));
  stroke(255, 0, 0);
  line(0, 0, sl, 0);
  popMatrix();
  
  noStroke();
  fill(255, 0, 0);
  circle(0, 0, 20);
}
