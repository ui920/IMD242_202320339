let video;
let faceMesh;
let detections = [];
let emoji = '🙂'; // 기본 이모지

function setup() {
  createCanvas(640, 480);

  // Set up video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Initialize FaceMesh
  faceMesh = new FaceMesh({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  faceMesh.onResults(onResults);

  // Set up MediaPipe camera
  const camera = new Camera(video.elt, {
    onFrame: async () => {
      await faceMesh.send({ image: video.elt });
    },
    width: 640,
    height: 480,
  });
  camera.start();
}

function draw() {
  image(video, 0, 0, width, height);

  // Draw emoji if face is detected
  if (detections.length > 0) {
    analyzeFace(detections[0]);
  }

  // Draw emoji
  textSize(128);
  textAlign(CENTER, CENTER);
  text(emoji, width / 2, height / 2);
}

function onResults(results) {
  detections = results.multiFaceLandmarks || [];
}

function analyzeFace(faceLandmarks) {
  // Define key points for eyes and mouth
  const leftEyeTop = faceLandmarks[159];
  const leftEyeBottom = faceLandmarks[145];
  const rightEyeTop = faceLandmarks[386];
  const rightEyeBottom = faceLandmarks[374];
  const mouthTop = faceLandmarks[13];
  const mouthBottom = faceLandmarks[14];

  // Calculate distances for eyes and mouth
  const leftEyeHeight = dist(
    leftEyeTop.x * width,
    leftEyeTop.y * height,
    leftEyeBottom.x * width,
    leftEyeBottom.y * height
  );

  const rightEyeHeight = dist(
    rightEyeTop.x * width,
    rightEyeTop.y * height,
    rightEyeBottom.x * width,
    rightEyeBottom.y * height
  );

  const mouthHeight = dist(
    mouthTop.x * width,
    mouthTop.y * height,
    mouthBottom.x * width,
    mouthBottom.y * height
  );

  // Thresholds for expressions
  const eyeClosedThreshold = 10; // Adjust based on testing
  const mouthOpenThreshold = 25; // Adjust based on testing

  // Determine emoji based on thresholds
  if (
    leftEyeHeight < eyeClosedThreshold &&
    rightEyeHeight < eyeClosedThreshold
  ) {
    emoji = '😴'; // Eyes closed
  } else if (mouthHeight > mouthOpenThreshold) {
    emoji = '😲'; // Mouth open
  } else {
    emoji = '🙂'; // Default expression
  }
}
