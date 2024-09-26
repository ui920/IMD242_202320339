void setup() {
  size(640, 360);
  rectMode(CENTER);
}

void draw() {
  background(0);

if (mouseY < height / 4) {
 circle(width / 2, height / 8, 50);
 
} else if(mouseY < height / 4 * 2) {
  square(width / 2, height / 4 + height / 8, 50);
  
} else if(mouseY < height / 4 * 3) {
  line(width / 2 - 25, height / 4 * 2 + height / 8 - 25, width / 2 + 25, height / 4 * 2 + height / 8 + 25);
  
} else {
  triangle(width / 2, height / 4 * 3 + height / 8 - 25, width / 2 - 25, height / 4 * 3 + height / 8 + 25, width / 2 + 25, height / 4 * 3 + height / 8 + 25);
} 
  stroke(255);
  strokeWeight(2);
  line(0, height / 4, width, height / 4);  
  line(0, height / 4 * 2, width, height / 4 * 2); 
  line(0, height / 4 * 3, width, height / 4 * 3); 
}
