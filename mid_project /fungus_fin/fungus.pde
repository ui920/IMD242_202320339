class Fungus {
  float x, y; // fungus의 위치
  float size; // fungus의 크기
  float opc; // fungus의 투명도
  color col; // fungus의 색상
  float growthRate = 0.5; // 성장 속도
  boolean isGrowing = true; // 성장에대한 것
  boolean isShrinking = false; // 감소에대한 것
  boolean isExpanding = false; // 점점 커지는 상태
  boolean ellipseShape; // 개별적인 타원에 대한 것

  Fungus(float x, float y, color col, boolean ellipseShape) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.size = random(5, 20); // 곰팡이가 점점 커졌다 작아지는 것을 극대화 하기 위해 초기 크기를 5~20 사이로 작게 설정
    this.opc = 50;
    this.ellipseShape = ellipseShape; // 화면에 나올 생성시 모양을 설정 
  }

  // 곰팡이의 크기가 커졌다 작아졌다, 숨쉬는 듯한 코드
  void update() {
    if (this.isExpanding) { // 곰팡이가 점점 커지는 상태면 느리게 증가시키는 코드
      this.size += this.growthRate * 0.5;
      if (this.size > 70) {
        this.isExpanding = false;
        this.isGrowing = true;
      }
    } else if (this.isGrowing) { // 곰팡이가 원래 상태면 기본 속도로 증가시키는 코드
      this.size += this.growthRate;
      if (this.size > 20) {
        this.isGrowing = false;
        this.isShrinking = true;
      }
    } else if (this.isShrinking) { // 곰팡이 감소상태면 기본 속도로 감축시키는 코드
      this.size -= this.growthRate;
      if (this.size < 6) {
        this.isShrinking = false;
        this.isExpanding = true;
      }
    }
  }

  void display() {
    fill(col, opc);
    stroke(255, opc);
    strokeWeight(.3);
    if (ellipseShape) {
      ellipse(x, y, size * 2, size);
    } else {
      circle(x, y, size);
    }
  }
}
