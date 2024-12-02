// let img; // 이미지 변수
// let scale = 10; // 픽셀 크기 (이 값을 조정하면 ASCII 해상도가 바뀜)

// let emojis = ['✨', '⭐', '☀️']; // 밝기별 이모지 배열

// function preload() {
//   img = loadImage('full_P@1.25x.png'); // 사용할 이미지 파일
// }

// function setup() {
//   createCanvas(1920, 1080); // 캔버스 크기 설정
//   img.resize(width, height); // 캔버스 크기에 맞게 이미지 크기 조정
//   noLoop(); // 애니메이션이 아니므로 한 번만 그리기
// }

// function draw() {
//   background(0);
//   textAlign(CENTER, CENTER); // 텍스트 정렬 설정

//   img.loadPixels(); // 이미지의 픽셀 데이터 로드

//   for (let y = 0; y < img.height; y += scale) {
//     for (let x = 0; x < img.width; x += scale) {
//       // 픽셀 색상 가져오기
//       let index = (x + y * img.width) * 4;
//       let r = img.pixels[index];
//       let g = img.pixels[index + 1];
//       let b = img.pixels[index + 2];

//       // 밝기 계산 (가중 평균법 사용)
//       let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

//       // 밝기에 따라 이모지 선택
//       let emojiIndex = int(map(brightness, 0, 255, 0, emojis.length - 1));
//       let emoji = emojis[emojiIndex];

//       // 이모지를 화면에 출력
//       fill(255);
//       textSize(scale);
//       text(emoji, x + scale / 2, y + scale / 2);
//     }
//   }
// }
let img; // 이미지 변수
let scale = 10; // 픽셀 크기

function preload() {
  img = loadImage('full_P@1.25x.png'); // 사용할 이미지
}

function setup() {
  createCanvas(800, 800); // 캔버스 크기 설정
  img.resize(width / scale, height / scale); // 축소된 크기로 이미지 로드
  noLoop(); // 애니메이션이 아니므로 한 번만 그리기
}

function draw() {
  background(0);
  textAlign(CENTER, CENTER); // 텍스트 정렬 설정

  img.loadPixels(); // 픽셀 데이터 로드

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4; // 픽셀 인덱스
      let r = img.pixels[index]; // 빨간색 값
      let g = img.pixels[index + 1]; // 녹색 값
      let b = img.pixels[index + 2]; // 파란색 값

      // RGB 값에 따라 특정 이모지 매핑
      let emoji = getEmojiForColor(r, g, b);

      // 화면에 이모지 출력
      fill(255);
      textSize(scale);
      text(emoji, x * scale + scale / 2, y * scale + scale / 2);
    }
  }
}

// 색상별 이모지 매핑 함수
function getEmojiForColor(r, g, b) {
  // 예시: 특정 색상 범위에 따라 이모지 선택
  if (r > 200 && g < 100 && b < 100) {
    return '❤️'; // 빨간색 계열
  } else if (r < 100 && g > 200 && b < 100) {
    return '💚'; // 녹색 계열
  } else if (r < 100 && g < 100 && b > 200) {
    return '💙'; // 파란색 계열
  } else if (r > 200 && g > 200 && b < 100) {
    return '💛'; // 노란색 계열
  } else {
    return '⚪'; // 기타 색상
  }
}
