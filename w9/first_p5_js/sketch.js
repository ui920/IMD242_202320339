let tileNumX = 16;
let tileNumY = 12;

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(0);
  noStroke();
  fill('skyblue');
  //let or var로 변수 설정 int/float와 같은 타입구분x
  //   for (let column = 0; column < width; column += 40) {
  //     for (let row = 0; row < width; row += 40) {
  //       let x = 20 + column;
  //       let y = 20 + row;
  //       let diameter = 30;
  //       circle(x, y, diameter);
  //     }
  //   }
  // }

  for (let row = 0; row < tileNumY; row++) {
    for (let column = 0; column < tileNumX; column++) {
      let tileW = width / tileNumX;
      let tileH = height / tileNumY;
      let x = tileW * 0.5 + column * tileW;
      let y = tileH * 0.5 + row * tileH;
      ellipse(x, y, tileW, tileH);
    }
  }
}
