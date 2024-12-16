let mouthOpen = 0;
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };

let source;
let history;
let historyIndex = 0;
let offset = 0;
let H = 5;
let WIDTH = 640;
let HEIGHT = 480;

let stressLevel = 0;
let stressDecayRate = 0.01;
let stressIncreaseRate = 0.1;
let maxStressLevel = 100;

let wasMouthOpen = false;

function calcMouthOpen(face) {
  let upper = face.keypoints[13];
  let lower = face.keypoints[14];
  let distance = dist(upper.x, upper.y, upper.z, lower.x, lower.y, lower.z);
  return distance;
}

function calcWidth(face) {
  let left = face.keypoints[21];
  let right = face.keypoints[251];
  let distance = dist(left.x, left.y, left.z, right.x, right.y, right.z);
  return distance;
}

function initSlitscan() {
  source = createGraphics(WIDTH, HEIGHT);
  history = Array.from({ length: floor(HEIGHT / H) }, () =>
    createImage(WIDTH, HEIGHT)
  );
}

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  video = createCapture(VIDEO, { flipped: true });
  video.size(WIDTH, HEIGHT);
  video.hide();
  initSlitscan();
  faceMesh.detectStart(video, gotFaces);
}

function drawSlitscan() {
  alpha = lerp(alpha, 255, 0.1);
  tint(255, alpha);
  source.image(video, 0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < history.length; i++) {
    const y = i * H;
    const currentIndex = (i + offset) % history.length;
    copy(history[currentIndex], 0, y, WIDTH, H, 0, y, WIDTH, H);
  }
  offset++;
  history[historyIndex].copy(
    source,
    0,
    0,
    source.width,
    source.height,
    0,
    0,
    WIDTH,
    HEIGHT
  );
  historyIndex = (historyIndex + 1) % history.length;
}

function draw() {
  let mouthOpenThreshold = 0.05;
  image(video, 0, 0, width, height);

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let faceWidth = calcWidth(face);
    let mouthDist = calcMouthOpen(face);
    let normalizedMouth = mouthDist / faceWidth;
    let isMouthOpen = normalizedMouth > mouthOpenThreshold;
    if (!isMouthOpen && wasMouthOpen) {
      stressLevel = 0;
    }
    if (isMouthOpen) {
      stressLevel = min(stressLevel + stressIncreaseRate, maxStressLevel);
      drawSlitscan();
    } else {
      stressLevel = max(stressLevel - stressDecayRate, 0);
      image(video, 0, 0, WIDTH, HEIGHT);
    }
    wasMouthOpen = isMouthOpen;
  }
  displayStressLevel();
  if (stressLevel >= maxStressLevel) {
    StressFin();
  }
}

function displayStressLevel() {
  let barWidth = map(stressLevel, 0, maxStressLevel, 0, width);
  let startColor = color(255, 204, 255, 140);
  let endColor = color(255, 0, 153, 140);
  let barColor = lerpColor(startColor, endColor, stressLevel / maxStressLevel);
  noStroke();
  fill(barColor);
  rect(0, height - 25, barWidth, 25);

  fill(255);
  textSize(13);
  textAlign(LEFT, CENTER);
  // text(`Stress gage`, 10, height - 40);
  text(`Stress ${floor(stressLevel)}`, 10, height - 40);
  let emojiCount = floor(map(stressLevel, 0, maxStressLevel, 0, 11));
  let emojiSpacing = barWidth / max(emojiCount, 1);
  textSize(20);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < emojiCount; i++) {
    let emojiX = emojiSpacing * i + emojiSpacing / 2;
    if (emojiX + emojiSpacing / 2 <= barWidth) {
      text('😡', emojiX, height - 10);
    }
  }
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(14);
  textAlign(CENTER, TOP);
  text(
    `Open your 👄 move your body, and express your complicated mind.`,
    WIDTH / 2,
    20
  );
}

function StressFin() {
  background(255, 0, 153, 180);
  fill(255);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(
    'Too much stress detected😡 Take a breath, close your 👄, open it again, and reset to start over.',
    width / 2,
    height / 2
  );
}

function gotFaces(results) {
  faces = results;
}
