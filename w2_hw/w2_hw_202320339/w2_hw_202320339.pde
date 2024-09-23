void setup() {
  size(1080, 1080);
}

void draw() {
  background(247, 233, 233);
  translate(mouseX - 1920 / 3, mouseY - 1080 / 2);

  // head line
  strokeWeight(8);
  stroke(46, 102, 0);
  line(533.33, 440.82, 480, 290); // left
  line(533.33, 440.82, 600, 290); // right

  noStroke();
  fill(mouseX/2, 0, mouseY/2, 200);
  ellipse(480, 290, 35, 35); // left circle
  ellipse(600, 290, 35, 35); // right circle

  // body_head
  strokeWeight(5);
  stroke(46, 102, 0);
  fill(mouseX, mouseY);
  fill(92, 177, 22);
  ellipseMode(CENTER);
  ellipse(1920/1.63, 1080/2.2, 100, 100); //5
  ellipse(1920/1.79, 1080/2.4, 130, 130); //4
  ellipse(1920/1.99, 540, 160, 160); //3
  ellipse(1920/2.33, 1080/2.35, 180, 180); //2
  ellipse(1920/2.85, 1080/1.9, 200, 200); //1
  ellipse(1920/3.6, 1080/2.45, 200, 200); // head

  // body patterns
  noStroke();
  fill(150, 219, 0);
  ellipseMode(CENTER);
  ellipse(1920/1.63, 1080/2.2 + 20, 60, 60); // 5
  ellipse(1920/1.79, 1080/2.4 + 30, 70, 70); // 4
  ellipse(1920/1.99, 540 + 35, 90, 90); // 3
  ellipse(1920/2.33, 1080/2.35 + 40, 100, 100); // 2
  ellipse(1920/2.85, 1080/1.9 + 45, 110, 110); // 1

  // eye
  noStroke();
  fill(255);
  ellipse(533.33 - 30, 440.82 - 40, 40, 40); // left
  ellipse(533.33 + 30, 440.82 - 40, 40, 40); // right

  fill(0);
  ellipse(533.33 - 30 + 3, 440.82 - 40 - 5, 20, 20); // left
  ellipse(533.33 + 30 + 3, 440.82 - 40 - 5, 20, 20); // right

  // cheek
  noStroke();
  fill(255, 199, 216);
  ellipse(533.33 - 50, 440.82 - 15, 36, 16); // left
  ellipse(533.33 + 50, 440.82 - 15, 36, 16); // right
}
