// module aliases
// var Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite;
//_짧게 쓰기 위한 변수처리_object Destructuring를 이용한
const { Engine, Render, Runner, Bodies, Composite } = Matter;

// create an engine
// var engine = Engine.create();
//_물리 시뮬레이션을 위한 엔진 생성(필수)
const anyEngine = Engine.create();

// create a renderer
// var render = Render.create({
//   element: document.body,
//   engine: engine,
// });
//_화면에 그리기위한 렌더러 생성 (p5에서 그릴거면 필수x)
const anyRender = Render.create({
  element: document.body,
  engine: anyEngine,
  options: { width: 600, height: 800 },
});

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
//_월드에 집어넣을 바디를 생성_두개는 박스, 한개는 박스지만 스태틱처리해 바닥으로 역할
let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(450, 50, 80, 80);
let circle = Bodies.circle(200, 100, 80, 80);
let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
// Composite.add(engine.world, [boxA, boxB, ground]);
//_월드에다가 만든 녀석들을 탈탈 집어넣기. 집어넣기 위해 콤포짓을 사용함.
Composite.add(anyEngine.world, [boxA, boxB, ground]);
Composite.add(anyEngine.world, circle);

// run the renderer
// Render.run(render);
//_렌더 모듈한테 만든 렌더 객체 넣어서 굴리라고 말하기
Render.run(anyRender);

// create runner
// var runner = Runner.create();
//_계속 실행을 보장하는 러너 생성
const anyRunner = Runner.create();

// run the engine
// Runner.run(runner, engine);
//_러너 모듈에게 생성된 러너와 생성된 앤진을 집어넣고 실행되기(무한실행보장)
Runner.run(anyRunner, anyEngine);
