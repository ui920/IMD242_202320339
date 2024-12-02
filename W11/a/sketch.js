let cp;
let canvasW, canvasH;
let scale;
let cpW, cpH;

let emojis = ['⭐️', '✨', '🌞', '🌻', '🌙']; // 사용할 이모지 배열

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

  textAlign(CENTER, CENTER); // 텍스트 중앙 정렬
}

function draw() {
  background(0);

  for (let y = 0; y < cpH; y++) {
    for (let x = 0; x < cpW; x++) {
      let colour = cp.get(x, y); // 픽셀 색상 가져오기
      let b = brightness(colour); // 밝기 계산

      // 밝기에 따라 이모지를 선택
      let emojiIndex = int(map(b, 0, 255, 0, emojis.length - 1));
      let emoji = emojis[emojiIndex];

      // 텍스트 크기 조정
      let textSizeValue = map(b, 0, 255, 8, 24);

      // 이모지를 해당 위치에 그리기
      fill(255);
      textSize(textSizeValue);
      text(emoji, 10 * x + 10, 10 * y + 10);
    }
  }
}
