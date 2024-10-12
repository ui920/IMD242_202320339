
int tileNum;
int randomSeed = 0;
float noiseMult = 0.1;

void setup() {
  size(800, 800);
}

void draw() {
  noiseSeed(randomSeed);
  randomSeed(randomSeed);
  background(0);
  tileNum = int(map(mouseX, 0, width, 3, 16 + 1));
  noiseMult = map(mouseY, 0, height, 0.01, 0.0005);
  float tileSize = width / float(tileNum);
  for (int row = 0; row < tileNum; row++) {
    for (int col = 0; col < tileNum; col++) {
      float rectX = tileSize * col;
      float rectY = tileSize * row;
      float centerX = rectX + tileSize * .5;
      float centerY = rectY + tileSize * .5;
      float noiseVal = noise(centerX * noiseMult, centerY * noiseMult);
      float lc = tileSize * .8 * .5;
      fill(255);
      circle(centerX, centerY, tileSize);
      pushMatrix();
      translate(centerX, centerY);
      rotate(radians(360 * noiseVal));
      line(0, 0, tileSize * .8 * .5, 0);
      fill(0);
      circle(lc, 0, tileSize * .2);
      popMatrix();
    }
  }
}
