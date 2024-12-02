/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

let faceMesh;
let video;
let faces = []; //얼굴이 여러개일 가능성ㅇ 어레이로
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };

function preload() {
  // Load the faceMesh model 파일이 크면 여기서 미리 실행
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    //   for (let j = 0; j < face.keypoints.length; j++) {
    //     let keypoint = face.keypoints[j];
    //     fill(0, 255, 0);
    //     noStroke();
    //     circle(keypoint.x, keypoint.y, 4);
    //   }
    let leftEye = face.leftEye;
    for (let n = 0; n < leftEye.keypoints.length; n++) {
      let keypoint = leftEye.keypoints[n];
      circle(keypoint.x, keypoint.y, 4);
    }
    let rightEye = face.rightEye;
    for (let n = 0; n < rightEye.keypoints.length; n++) {
      let keypoint = rightEye.keypoints[n];
      circle(keypoint.x, keypoint.y, 4);
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

function keyPressed() {
  if (key == 'o' || key == 'O') console.log(faces);
}
