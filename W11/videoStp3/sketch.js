// let video;
// let faceMesh;
// let detections = [];
// let emoji = '🙂'; // 기본 이모지

// function setup() {
//   createCanvas(640, 480);

//   // Set up video capture
//   video = createCapture(VIDEO);
//   video.size(width, height);
//   video.hide();

//   // Initialize FaceMesh
//   faceMesh = new FaceMesh({
//     locateFile: (file) =>
//       `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
//   });

//   faceMesh.setOptions({
//     maxNumFaces: 1,
//     refineLandmarks: true,
//     minDetectionConfidence: 0.5,
//     minTrackingConfidence: 0.5,
//   });

//   faceMesh.onResults(onResults);

//   // Set up MediaPipe camera
//   const camera = new Camera(video.elt, {
//     onFrame: async () => {
//       await faceMesh.send({ image: video.elt });
//     },
//     width: 640,
//     height: 480,
//   });
//   camera.start();
// }

// function draw() {
//   image(video, 0, 0, width, height);

//   // Draw emoji if face is detected
//   if (detections.length > 0) {
//     analyzeFace(detections[0]);
//   }

//   // Draw emoji
//   textSize(128);
//   textAlign(CENTER, CENTER);
//   text(emoji, width / 2, height / 2);
// }

// function onResults(results) {
//   detections = results.multiFaceLandmarks || [];
// }

// function analyzeFace(faceLandmarks) {
//   // Define key points for eyes and mouth
//   const leftEyeTop = faceLandmarks[159];
//   const leftEyeBottom = faceLandmarks[145];
//   const rightEyeTop = faceLandmarks[386];
//   const rightEyeBottom = faceLandmarks[374];
//   const mouthTop = faceLandmarks[13];
//   const mouthBottom = faceLandmarks[14];

//   // Calculate distances for eyes and mouth
//   const leftEyeHeight = dist(
//     leftEyeTop.x * width,
//     leftEyeTop.y * height,
//     leftEyeBottom.x * width,
//     leftEyeBottom.y * height
//   );

//   const rightEyeHeight = dist(
//     rightEyeTop.x * width,
//     rightEyeTop.y * height,
//     rightEyeBottom.x * width,
//     rightEyeBottom.y * height
//   );

//   const mouthHeight = dist(
//     mouthTop.x * width,
//     mouthTop.y * height,
//     mouthBottom.x * width,
//     mouthBottom.y * height
//   );

//   // Thresholds for expressions
//   const eyeClosedThreshold = 10; // Adjust based on testing
//   const mouthOpenThreshold = 25; // Adjust based on testing

//   // Determine emoji based on thresholds
//   if (
//     leftEyeHeight < eyeClosedThreshold &&
//     rightEyeHeight < eyeClosedThreshold
//   ) {
//     emoji = '😉'; // Eyes closed
//   } else if (mouthHeight > mouthOpenThreshold) {
//     emoji = '😲'; // Mouth open
//   } else {
//     emoji = '🙂'; // Default expression
//   }
// }
//

// let mouthOpen = 0;
// let keyIdx = 0;
// let faceMesh;
// let video;
// let faces = [];
// let options = { maxFaces: 1, refineLandmarks: true, flipHorizontal: true };

// let source;
// let history;
// let historyIndex = 0;
// let offset = 0;
// const H = 8; // 슬릿 높이
// const WIDTH = 640;
// const HEIGHT = 480;

// let emoji = null; // 초기 상태에서는 이모지가 표시되지 않음

// // 입술 열림 거리 계산
// function calcMouthOpen(face) {
//   let upper = face.keypoints[13]; // 상순 중앙
//   let lower = face.keypoints[14]; // 하순 중앙
//   let distance = dist(upper.x, upper.y, upper.z, lower.x, lower.y, lower.z);
//   return distance;
// }

// // 얼굴 가로 너비 계산 (참조 기준점)
// function calcWidth(face) {
//   let left = face.keypoints[21]; // 왼쪽 얼굴 끝
//   let right = face.keypoints[251]; // 오른쪽 얼굴 끝
//   let distance = dist(left.x, left.y, left.z, right.x, right.y, right.z);
//   return distance;
// }

// // 슬릿스캔 초기화
// function initSlitscan() {
//   source = createGraphics(WIDTH, HEIGHT);
//   history = Array.from({ length: floor(HEIGHT / H) }, () =>
//     createImage(WIDTH, HEIGHT)
//   );
// }

// function preload() {
//   // FaceMesh 모델 로드
//   faceMesh = ml5.faceMesh(options);
// }

// function setup() {
//   createCanvas(WIDTH, HEIGHT);
//   video = createCapture(VIDEO, { flipped: true });
//   video.size(WIDTH, HEIGHT);
//   video.hide();

//   initSlitscan(); // 슬릿스캔 초기화
//   faceMesh.detectStart(video, gotFaces);
// }

// function drawSlitscan() {
//   source.image(video, 0, 0, WIDTH, HEIGHT);
//   for (let i = 0; i < history.length; i++) {
//     const y = i * H;
//     const currentIndex = (i + offset) % history.length;
//     copy(history[currentIndex], 0, y, WIDTH, H, 0, y, WIDTH, H);
//   }
//   offset++;
//   history[historyIndex].copy(
//     source,
//     0,
//     0,
//     source.width,
//     source.height,
//     0,
//     0,
//     WIDTH,
//     HEIGHT
//   );
//   historyIndex = (historyIndex + 1) % history.length;
// }

// function draw() {
//   let mouthOpenThreshold = 0.05; // 입이 열린 상태를 판별하는 기준

//   // 기본 비디오 출력
//   image(video, 0, 0, width, height);

//   // 얼굴 데이터 처리
//   if (faces.length > 0) {
//     let face = faces[0];
//     let faceWidth = calcWidth(face);
//     let mouthDist = calcMouthOpen(face);
//     let normalizedMouth = mouthDist / faceWidth;

//     // 입이 열린 상태 확인
//     if (normalizedMouth > mouthOpenThreshold) {
//       drawSlitscan(); // 슬릿스캔 활성화
//     } else {
//       image(video, 0, 0, WIDTH, HEIGHT); // 기본 비디오 출력
//     }

//     // 이모지 분석 및 업데이트
//     analyzeFace(face.keypoints);
//   }

//   // 얼굴이 감지된 경우에만 이모지 표시
//   if (emoji) {
//     textSize(64);
//     textAlign(CENTER, CENTER);
//     text(emoji, width / 2, height / 2);
//   }
// }

// function analyzeFace(faceLandmarks) {
//   // Define key points for eyes and mouth
//   const leftEyeTop = faceLandmarks[159];
//   const leftEyeBottom = faceLandmarks[145];
//   const rightEyeTop = faceLandmarks[386];
//   const rightEyeBottom = faceLandmarks[374];
//   const mouthTop = faceLandmarks[13];
//   const mouthBottom = faceLandmarks[14];

//   // Calculate distances for eyes and mouth
//   const leftEyeHeight = dist(
//     leftEyeTop.x,
//     leftEyeTop.y,
//     leftEyeBottom.x,
//     leftEyeBottom.y
//   );

//   const rightEyeHeight = dist(
//     rightEyeTop.x,
//     rightEyeTop.y,
//     rightEyeBottom.x,
//     rightEyeBottom.y
//   );

//   const mouthHeight = dist(
//     mouthTop.x,
//     mouthTop.y,
//     mouthBottom.x,
//     mouthBottom.y
//   );

//   // Thresholds for expressions
//   const eyeClosedThreshold = 10; // Adjust based on testing
//   const mouthOpenThreshold = 25; // Adjust based on testing

//   // Determine emoji based on thresholds
//   if (
//     leftEyeHeight < eyeClosedThreshold &&
//     rightEyeHeight < eyeClosedThreshold
//   ) {
//     emoji = '😉'; // Eyes closed
//   } else if (mouthHeight > mouthOpenThreshold) {
//     emoji = '😲'; // Mouth open
//   }
// }

// // FaceMesh 데이터 처리 콜백 함수
// function gotFaces(results) {
//   faces = results;
// }
//
// let mouthOpen = 0;
// let faceMesh;
// let video;
// let faces = [];
// let options = { maxFaces: 1, refineLandmarks: true, flipHorizontal: true };

// let source;
// let history;
// let historyIndex = 0;
// let offset = 0;
// const H = 8; // 슬릿 높이
// const WIDTH = 640;
// const HEIGHT = 480;

// let emoji = '😉'; // 고정 이모지
// let emitters = []; // 파티클 방출기 배열

// // 입술 열림 거리 계산
// function calcMouthOpen(face) {
//   let upper = face.keypoints[13]; // 상순 중앙
//   let lower = face.keypoints[14]; // 하순 중앙
//   let distance = dist(upper.x, upper.y, upper.z, lower.x, lower.y, lower.z);
//   return distance;
// }

// // 얼굴 가로 너비 계산 (참조 기준점)
// function calcWidth(face) {
//   let left = face.keypoints[21]; // 왼쪽 얼굴 끝
//   let right = face.keypoints[251]; // 오른쪽 얼굴 끝
//   let distance = dist(left.x, left.y, left.z, right.x, right.y, right.z);
//   return distance;
// }

// // 눈 너비 계산
// function calcEyeOpen(face) {
//   let leftEyeTop = face.keypoints[159]; // 왼쪽 눈 윗부분
//   let leftEyeBottom = face.keypoints[145]; // 왼쪽 눈 아랫부분
//   let rightEyeTop = face.keypoints[386]; // 오른쪽 눈 윗부분
//   let rightEyeBottom = face.keypoints[374]; // 오른쪽 눈 아랫부분

//   let leftEyeHeight = dist(
//     leftEyeTop.x,
//     leftEyeTop.y,
//     leftEyeTop.z,
//     leftEyeBottom.x,
//     leftEyeBottom.y,
//     leftEyeBottom.z
//   );
//   let rightEyeHeight = dist(
//     rightEyeTop.x,
//     rightEyeTop.y,
//     rightEyeTop.z,
//     rightEyeBottom.x,
//     rightEyeBottom.y,
//     rightEyeBottom.z
//   );

//   return (leftEyeHeight + rightEyeHeight) / 2;
// }

// // 슬릿스캔 초기화
// function initSlitscan() {
//   source = createGraphics(WIDTH, HEIGHT);
//   history = Array.from({ length: floor(HEIGHT / H) }, () =>
//     createImage(WIDTH, HEIGHT)
//   );
// }

// // 파티클 방출기 클래스
// class Emitter {
//   constructor(x, y) {
//     this.origin = createVector(x, y);
//     this.particles = [];
//   }

//   addParticle() {
//     if (this.particles.length < 4) {
//       // 최대 파티클 수 제한
//       this.particles.push(new Particle(this.origin.x, this.origin.y));
//     }
//   }

//   run() {
//     for (let i = this.particles.length - 1; i >= 0; i--) {
//       let p = this.particles[i];
//       p.update();
//       p.display();
//       if (p.isDead()) {
//         this.particles.splice(i, 1);
//       }
//     }
//   }
// }

// // 파티클 클래스
// class Particle {
//   constructor(x, y) {
//     this.position = createVector(x, y);
//     this.velocity = createVector(random(-2, 2), random(-2, 2));
//     this.size = random(20, 50); // 크기 다양화
//     this.lifespan = 255;
//   }

//   update() {
//     this.position.add(this.velocity);
//     this.lifespan -= 2; // 수명 감소 속도
//   }

//   display() {
//     fill(255, this.lifespan);
//     textSize(this.size);
//     text(emoji, this.position.x, this.position.y); // 이모지를 파티클로 표시
//   }

//   isDead() {
//     return this.lifespan <= 0;
//   }
// }

// function preload() {
//   // FaceMesh 모델 로드
//   faceMesh = ml5.faceMesh(options);
// }

// function setup() {
//   createCanvas(WIDTH, HEIGHT);
//   video = createCapture(VIDEO, { flipped: true });
//   video.size(WIDTH, HEIGHT);
//   video.hide();

//   initSlitscan(); // 슬릿스캔 초기화
//   faceMesh.detectStart(video, gotFaces);

//   // 파티클 방출기 초기화
//   for (let i = 0; i < 5; i++) {
//     // 방출기 개수 제한
//     emitters.push(new Emitter(width / 2, height / 2));
//   }
// }

// function drawSlitscan() {
//   source.image(video, 0, 0, WIDTH, HEIGHT);
//   for (let i = 0; i < history.length; i++) {
//     const y = i * H;
//     const currentIndex = (i + offset) % history.length;
//     copy(history[currentIndex], 0, y, WIDTH, H, 0, y, WIDTH, H);
//   }
//   offset++;
//   history[historyIndex].copy(
//     source,
//     0,
//     0,
//     source.width,
//     source.height,
//     0,
//     0,
//     WIDTH,
//     HEIGHT
//   );
//   historyIndex = (historyIndex + 1) % history.length;
// }

// function draw() {
//   let mouthOpenThreshold = 0.05; // 입이 열린 상태를 판별하는 기준
//   let eyeCloseThreshold = 0.02; // 눈이 감긴 상태를 판별하는 기준

//   // 기본 비디오 출력
//   image(video, 0, 0, width, height);

//   // 얼굴 데이터 처리
//   if (faces.length > 0) {
//     let face = faces[0];
//     let faceWidth = calcWidth(face);
//     let mouthDist = calcMouthOpen(face);
//     let eyeHeight = calcEyeOpen(face);
//     let normalizedMouth = mouthDist / faceWidth;
//     let normalizedEye = eyeHeight / faceWidth;

//     // 입이 열린 상태
//     if (normalizedMouth > mouthOpenThreshold) {
//       drawSlitscan(); // 슬릿스캔 활성화
//     }
//     // 눈이 감긴 상태
//     else if (normalizedEye < eyeCloseThreshold) {
//       for (let emitter of emitters) {
//         emitter.addParticle();
//         emitter.run();
//       }
//     } else {
//       image(video, 0, 0, WIDTH, HEIGHT); // 기본 비디오 출력
//     }
//   }
// }

// function gotFaces(results) {
//   faces = results;
// }

// Particle clas

// 파티클 클래스
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.size = random(20, 50); // 크기 다양화
    this.lifespan = 255;
  }

  update() {
    this.position.add(this.velocity);
    this.lifespan -= 50; // 수명 감소 속도
  }

  display() {
    fill(255, this.lifespan);
    textSize(this.size);
    text(emoji, this.position.x, this.position.y); // 이모지를 파티클로 표시
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

let video;
let handPose;
let hands = [];
let particles = [];

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // 모든 파티클 업데이트 및 표시
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    // 파티클이 사라졌다면 배열에서 제거
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    for (let i = 0; i < random(5, 20); i++) {
      let x = random(index.x - 50, index.x + 50);
      let y = random(index.y - 50, index.y + 50);
      emoji = thumb.y < index.y ? '👍' : '👎';
      textSize(random(20, 60));
      textAlign(CENTER, CENTER);
      text(emoji, x, y);

      // 파티클 생성
      let particle = new Particle(x, y);
      particle.update();
      particle.display();

      if (particle.isDead()) {
        // 파티클 제거
        particles.splice(i, 1);
      }
    }
  }
}
