// 이 코드는 ChatGPT를 이용하여 작성 및 수정되었습니다.
// 푸른곰팡이에서 영감을 받아 곰팡이가 번식하며 움직이는 듯한 모습을 형상을 만들고 싶어 기본 코드 구조를 작업한 후
// void update() 부분인 드래그 시 생긴 후 작아졌다 커지는 코드에 대해 질문을 했습니다.

ArrayList<Fungus> funguses;
boolean drawEllipse = false;

void setup() {
  size(displayWidth, displayHeight);
  fullScreen();
  funguses = new ArrayList<Fungus>();
  textSize(20);
}

void draw() {
  background(0);  
  for (int i = funguses.size() - 1; i >= 0; i--) {
    Fungus fungus = funguses.get(i);
    if (fungus.opc <= 0) {
      funguses.remove(i);
    }
    fungus.update();
    fungus.display();
  }
  fill(255);
  textSize(20);
  text("Fungus Count: " + funguses.size(), 20, 30);
}

void mouseDragged() {
  int randomColor = color(random(0, 70), random(0, 80), random(0, 150), random(5, 30)); // r,g,b 컬러가 각각 랜덤하게 나와 투명도 조절을 통해 겹쳐지는 것을 의도
  funguses.add(new Fungus(mouseX, mouseY, randomColor, drawEllipse));  // 마우스 드래그 시 위치한 곳에 Fungus가 생김
}

// 스페이스바가 떨어질 때 Fungus객체를 지워 화면초기화, 숫자 '1'을 누르면 원/ '2'를 누르면 타원으로 바뀜
void keyReleased() {
  if (key == ' ') {
    funguses.clear();
  } else if (key == '1') {
    drawEllipse = false;
  } else if (key == '2') {
    drawEllipse = true;
  }
}
