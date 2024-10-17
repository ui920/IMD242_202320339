int randomSeed = int(random(10000));
float HOUSE_A_RANGE = 10;

void setup() {
  size(800, 800);
}

void mousePressed() {
  randomSeed = int(random(10000));
}

void draw() {
  randomSeed(randomSeed);
  background(230);
  for (int n = 0; n < 5; n++) {
    house(random(0.1 * width, 0.9 * width), random(height * 0.4, height * 0.75), random(100, 200), random(150, 250));
  }
}

void house(float x, float y, float houseWidth, float houseHeight) {
  pushStyle();
  colorMode(HSB, 360, 100, 50);
  pushMatrix();
  translate(x, y);
  float houseHue = random(360);
  fill(houseHue, 50, 100);
  rect(0, 0, houseWidth, houseHeight);

  float roofHue = random(30, 100);
  fill(roofHue, 200, 100);
  float roofHeight = houseHeight / 3;
  triangle(0, 0, houseWidth / 2, -roofHeight, houseWidth, 0);

  fill(houseHue, 255, 100);
  float doorWidth = houseWidth / 5;
  float doorHeight = houseHeight / 3;
  rect(houseWidth / 2 - doorWidth / 2, houseHeight - doorHeight, doorWidth, doorHeight);

  fill(roofHue, 255, 50);
  float windowSize = houseWidth / 6;
  rect(houseWidth / 4 - windowSize / 2, houseHeight / 3, windowSize, windowSize);
  rect(3 * houseWidth / 4 - windowSize / 2, houseHeight / 3, windowSize, windowSize);

  popMatrix();
  popStyle();
}
