import {
  mixedChart,
  timeChart,
  mkTimeline,
  mkChart,
  annotation,
  deepCopy
} from './ui-functions.js';
const mixedChartArea = document.querySelector('.mixed-bar-chart');
const timelines = document.querySelectorAll('.chart-time-line');

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {
  let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));
  return arr;
}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)


// 차트설정 부분
mixedChart.expCharge = {};
mixedChart.charge = {};
mixedChart.expOff = {};
mixedChart.off = {};
mixedChart.targetSOC = {};
mixedChart.minSOC = {};
mixedChart.soc = {};

// 컬러설정
mixedChart.expCharge.backgroundColor = '#7E7F8E';
mixedChart.charge.backgroundColor = '#4D5BD4';
mixedChart.expOff.backgroundColor = '#BC8884';
mixedChart.off.backgroundColor = '#EF726A';
mixedChart.targetSOC.backgroundColor = '#00D2B9';
mixedChart.minSOC.backgroundColor = '#FFCE22';
mixedChart.soc.backgroundColor = '#8D52EF';
mixedChart.targetSOC.borderColor = '#00D2B9';
mixedChart.minSOC.borderColor = '#FFCE22';
mixedChart.soc.borderColor = '#8D52EF';


mixedChart.targetSOC.pointRadius = 0;
mixedChart.minSOC.pointRadius = 0;
mixedChart.soc.pointRadius = 0;
// 라벨설정
mixedChart.expCharge.label = '예측 충전량';
mixedChart.charge.label = '충전량';
mixedChart.expOff.label = '예측 방전량';
mixedChart.off.label = '방전량';
mixedChart.targetSOC.label = 'Target SOC';
mixedChart.minSOC.label = 'Min SOC';
mixedChart.soc.label = 'SOC';


// 보더설정
mixedChart.expCharge.borderWidth = 2;
mixedChart.charge.borderWidth = 2;
mixedChart.expOff.borderWidth = 2;
mixedChart.off.borderWidth = 2;

mixedChart.expCharge.borderColor = 'transparent';
mixedChart.charge.borderColor = 'transparent';
mixedChart.expOff.borderColor = 'transparent';
mixedChart.off.borderColor = 'transparent';

// 타입설정
mixedChart.targetSOC.type = 'line';
mixedChart.minSOC.type = 'line';
mixedChart.soc.type = 'line';

// 라벨설정
mixedChart.charOptions.labelShow = true;
mixedChart.charOptions.checked = true;
mixedChart.charOptions.title = '충전량 / 방전량 (kWh)';
mixedChart.charOptions.lv = 'kWh';
mixedChart.charOptions.yRight = true;
mixedChart.charOptions.lvRight = 'kWh';


// 라인차트 범례 설정
mixedChart.targetSOC.yAxisID = 'y-right';
mixedChart.minSOC.yAxisID = 'y-right';
mixedChart.soc.yAxisID = 'y-right';

// 빈공간 없애기
mixedChart.expCharge.skipNull = true;
mixedChart.charge.skipNull = true;
mixedChart.expOff.skipNull = true;
mixedChart.off.skipNull = true;


// 타임스탬프 공간 생성 (mixed chart 내 타임스탬프)
mixedChart.opts.plugins.annotation = {};
mixedChart.opts.plugins.annotation.annotations = annotation;

// 타임스탬프 checkbox 사용 및  타이틀 등록
mixedChart.charOptions.anno = true;
mixedChart.charOptions.annoTitle = '스케줄';

annotation.changeSchedule = deepCopy(annotation.init);
annotation.enter = deepCopy(annotation.init);
annotation.expLeave = deepCopy(annotation.init);
annotation.leave = deepCopy(annotation.init);

annotation.changeSchedule.id = 'changeSchedule';
annotation.enter.id = 'enter';
annotation.expLeave.id = 'expLeave';
annotation.leave.id = 'leave';

annotation.changeSchedule.borderColor = '#FF00B8';
annotation.enter.borderColor = '#00D2B9';
annotation.expLeave.borderColor = '#EF726A';
annotation.leave.borderColor = '#EF726A';

annotation.expLeave.borderDash = [6, 6];


// 데이터 설정 ** 개발 수정 영역
// X축 범례 설정
mixedChart.labels = Array(24).fill(0).map((_, i) => i + 1);
// 예측 충전량 데이터
mixedChart.expCharge.data = dataReturn(600, 0).map((m, i) => i < 10 || i > 20 ? m : m * 0);
// 충전량 데이터
mixedChart.charge.data = dataReturn(600, 0).map((m, i) => i < 10 || i > 20 ? m : m * 0);
// 예측 방전량 데이터
mixedChart.expOff.data = dataReturn(600, 0).map((m, i) => i >= 10 && i <= 20 ? m * -1 : m * 0);
// 방전량 데이터
mixedChart.off.data = dataReturn(600, 0).map((m, i) => i >= 10 && i <= 20 ? m * -1 : m * 0);

// Target SOC 데이터
mixedChart.targetSOC.data = Array(24).fill(90);
// min SOC 데이터
mixedChart.minSOC.data = Array(24).fill(70);
// SOC 데이터
mixedChart.soc.data = Array(24).fill(95).map((m, i) => i < 5 ? m : i > 18 ? 78 : 60);

// 타임 데이터 설정
// 스케줄 변경
// .content=[타이틀, 시간(hh:mm:ss) , '이유'> 없어도 됨]
annotation.changeSchedule.contents = ['스케줄 변경', '03:40:34', '-입차 시간 변경'];
annotation.enter.contents = ['실제 입차 시간', '04:48:12'];
annotation.expLeave.contents = ['예상 출차 시간', '18:02:58'];
annotation.leave.contents = ['실제 출차 시간', '20:22:44'];


// 그리기 함수
mkChart(mixedChartArea, mixedChart);




// 타임라인 그려질 곳 
const tm = document.querySelectorAll('.chart-time-line');
// 타임차트 같은 페이지 내 반복 시 딥카피 필요!
let tmChart1 = deepCopy(timeChart);
let tmChart2 = deepCopy(timeChart);
let tmChart3 = deepCopy(timeChart);


// 바 굵기 설정(전체 그리드 높기 기준 -npx형식)
tmChart1.options.cut = 15;
tmChart1.options.devGrid = `1px dotted #ccc`;

// 그리드 나누기
tmChart2.options.devBy = 4;
tmChart2.options.gridShow = true;
tmChart2.options.devGrid = `1px dotted #ccc`;

tmChart3.options.devBy = 4;
tmChart3.options.gridShow = true;
tmChart3.options.devGrid = `1px dotted #ccc`;

// 높이설정
tmChart3.options.heights = 60


// 카테고리 리스트 삭제
tmChart2.options.catShow = false;

// 타임모듈 변수 :: 데이터 추가마다 빈 변수 추가 필요 **** 개발 참고영역
tmChart1.ev1 = {};
tmChart1.ev2 = {};
tmChart1.ev3 = {};
tmChart1.ev4 = {};
// 타임모듈 변수 :: 데이터 추가마다 빈 변수 추가 필요 **** 개발 참고영역

tmChart2.notConnect = {};
tmChart2.enter = {};
tmChart2.leave = {};
tmChart2.expCarge = {};
tmChart2.expOff = {};
tmChart2.wait = {};
tmChart2.smartChage = {};
tmChart2.leftCharge = {};
tmChart2.drCit = {};
tmChart2.drPlus = {};
tmChart2.chargeMarket = {};
tmChart2.peakCut = {};
tmChart2.immdCharge = {};

tmChart3.enter = {};
tmChart3.leave = {};
tmChart3.expCarge = {};
tmChart3.expOff = {};
tmChart3.wait = {};
tmChart3.smartChage = {};
tmChart3.leftCharge = {};
tmChart3.drCit = {};
tmChart3.drPlus = {};
tmChart3.chargeMarket = {};
tmChart3.peakCut = {};
tmChart3.immdCharge = {};

// 타임모듈 컬러설정
// 충전/방전 장소
tmChart1.ev1.backgroundColor = '#BA7660';
tmChart1.ev2.backgroundColor = '#BA7660';
tmChart1.ev3.backgroundColor = '#BA7660';
tmChart1.ev4.backgroundColor = '#BA7660';


tmChart2.notConnect.backgroundColor = '#F0F0F0';
tmChart2.enter.backgroundColor = '#00D2B9';
tmChart2.leave.backgroundColor = '#EF726A';
tmChart2.expCarge.backgroundColor = '#6368AC';
tmChart2.expOff.backgroundColor = '#BC8884';
tmChart2.wait.backgroundColor = '#CCCCCC';
tmChart2.smartChage.backgroundColor = '#FFCE22';
tmChart2.leftCharge.backgroundColor = '#69A1F4';
tmChart2.drCit.backgroundColor = '#5DD370';
tmChart2.drPlus.backgroundColor = '#D35DC8';
tmChart2.chargeMarket.backgroundColor = '#4442AB';
tmChart2.peakCut.backgroundColor = '#1ABE8D';
tmChart2.immdCharge.backgroundColor = '#9DBE1A';

tmChart3.enter.backgroundColor = '#00D2B9';
tmChart3.leave.backgroundColor = '#EF726A';
tmChart3.expCarge.backgroundColor = '#6368AC';
tmChart3.expOff.backgroundColor = '#BC8884';
tmChart3.wait.backgroundColor = '#CCCCCC';
tmChart3.smartChage.backgroundColor = '#FFCE22';
tmChart3.leftCharge.backgroundColor = '#69A1F4';
tmChart3.drCit.backgroundColor = '#5DD370';
tmChart3.drPlus.backgroundColor = '#D35DC8';
tmChart3.chargeMarket.backgroundColor = '#4442AB';
tmChart3.peakCut.backgroundColor = '#1ABE8D';
tmChart3.immdCharge.backgroundColor = '#9DBE1A';


// Y축 범례 타이틀 설정
tmChart1.options.title = '커넥터';

// 각 타임모듈 라벨명
// 충전/방전 장소
tmChart1.ev1.label = 'EV1.커넥터1';
tmChart1.ev2.label = 'EV2.커넥터2';
tmChart1.ev3.label = 'EV3.커넥터3';
tmChart1.ev4.label = 'EV4.커넥터4';

tmChart2.notConnect.label = '미연결';
tmChart2.enter.label = '입차';
tmChart2.leave.label = '출차';
tmChart2.expCarge.label = '예상충전';
tmChart2.expOff.label = '예상방전';
tmChart2.wait.label = '대기';
tmChart2.smartChage.label = '스마트충전';
tmChart2.leftCharge.label = '차액거래';
tmChart2.drCit.label = '국민DR';
tmChart2.drPlus.label = '플러스DR';
tmChart2.chargeMarket.label = '발전시장';
tmChart2.peakCut.label = 'Peak cut';
tmChart2.immdCharge.label = '즉시충전';

// 타임 모듈 안 텍스트 보여주기 설정
tmChart1.ev1.labelShow = true;
tmChart1.ev2.labelShow = true;
tmChart1.ev3.labelShow = true;
tmChart1.ev4.labelShow = true;
tmChart2.enter.labelShow = true;
tmChart2.leave.labelShow = true;

// 라벨 리스트 보여주기 설정
tmChart2.options.labelShow = true;

tmChart3.enter.label = '입차';
tmChart3.leave.label = '출차';
tmChart3.expCarge.label = '예상충전';
tmChart3.expOff.label = '예상방전';
tmChart3.wait.label = '대기';
tmChart3.smartChage.label = '스마트충전';
tmChart3.leftCharge.label = '차액거래';
tmChart3.drCit.label = '국민DR';
tmChart3.drPlus.label = '플러스DR';
tmChart3.chargeMarket.label = '발전시장';
tmChart3.peakCut.label = 'Peak cut';
tmChart3.immdCharge.label = '즉시충전';


// **********************데이터 설정 , 개발 설정영역 ***********************


//타임 길이 설정 
// tmChart1.options.max= 48; 

// 타임라인 카테고리 설정 :: 카테고리 명을 배열 형태로 입력하면 됨 위=>아래 순서
// 충전/방전 장소
tmChart1.options.category = ['1'];
tmChart2.options.category = ['1'];

// 타임모듈 시간설정 (hh:mm)
// 1. 커넥터 스케줄 
// EV1.커넥터1 
tmChart1.ev1.start = ['01:00'];
tmChart1.ev1.end = ['05:00'];

// EV2.커넥터2
tmChart1.ev2.start = ['07:00'];
tmChart1.ev2.end = ['11:00'];

// EV3.커넥터3
tmChart1.ev3.start = ['11:00'];
tmChart1.ev3.end = ['15:00'];

// EV4.커넥터4
tmChart1.ev4.start = ['15:30'];
tmChart1.ev4.end = ['19:30'];


// 2. 입차 출차 첫번째 타임라인
// 예상방전 
tmChart2.expOff.start = ['24:00'];
tmChart2.expOff.end = ['04:00'];

// 예상충전 (같은 범례안에서 2개의 설정이 필요한 경우 형태)
tmChart2.expCarge.start = ['04:00', '18:00'];
tmChart2.expCarge.end = ['06:00', '24:00'];

// 출차 
tmChart2.leave.start = ['06:00'];
tmChart2.leave.end = ['07:00'];

// 입차
tmChart2.enter.start = ['17:00'];
tmChart2.enter.end = ['18:00'];


// 3. 입차, 출차 더보기 시 나오는 타임라인 
// 커스터마이징 카테고리는 아래와 같이 html 태그 형식으로 추가하면 됨 :: 나머지 스타일은 css에서 핸들링 되고있음.
tmChart3.options.catTag = [
  '<span class="timeline-time"> 2024.07.09 20:35:10 </span> <br>  <span class="timeline-txts">실제 입출차 시간변경 </span>',
  '<span class="timeline-time"> 2024.07.09 20:35:10 </span> <br>  <span class="timeline-txts">실제 입출차 시간변경 </span>',
];

// 예상충전 (카테고리 칸이 여러개이고 커스터마이징 라벨을 사용할 경우, 위->아래 기준으로 1부터 ++)
// 배열위치에 맞춰 각각의 타임시작시간(혹은 끝시간)에 카테고리가 들어오게 하면 됨
tmChart3.expCarge.category = [1, 1, 2, 2];
tmChart3.expCarge.start = ['01:00', '16:00', '01:00', '16:00'];
tmChart3.expCarge.end = ['05:00', '17:00', '05:00', '17:00'];

//입차
tmChart3.enter.category = [1, 2];
tmChart3.enter.start = ['07:00', '07:00'];
tmChart3.enter.end = ['08:00', '08:00'];

// 예상방전
tmChart3.expOff.category = [1, 1, 2, 2];
tmChart3.expOff.start = ['17:00', '19:00', '17:00', '19:00'];
tmChart3.expOff.end = ['18:00', '01:00', '18:00', '01:00'];

// 출차
tmChart3.leave.category = [1, 2];
tmChart3.leave.start = ['18:00', '18:00'];
tmChart3.leave.end = ['19:00', '19:00'];


// **********************데이터 설정 , 개발 설정영역 ***********************
// 설정 후 그리기 함수 사용 (데이터, 그릴 위치 dom)
// 충전/방전 장소
let timeLine1 = mkTimeline(tmChart1, tm[0]);
let timeLine2 = mkTimeline(tmChart2, tm[1]);
let timeLine3 = mkTimeline(tmChart3, tm[2]);

// 변환 시 지우고 다시 그리기 필요
$('.sel_date').change(function() {
  // 기간선택시
  if ($(this).val() === 'term') {
    tmChart1.options.max = 48;
    tmChart2.options.max = 48;
    tmChart3.options.max=47;
    tmChart3.options.min=0;
    // 데이터 세팅
    // 1. 커넥터 스케줄 
    // EV1.커넥터1 
    tmChart1.ev1.start = ['01:00'];
    tmChart1.ev1.end = ['09:00'];

    // EV2.커넥터2
    tmChart1.ev2.start = ['13:00'];
    tmChart1.ev2.end = ['21:00'];

    // EV3.커넥터3
    tmChart1.ev3.start = ['21:00'];
    tmChart1.ev3.end = ['29:00'];

    // EV4.커넥터4
    tmChart1.ev4.start = ['30:00'];
    tmChart1.ev4.end = ['38:00'];


    // 타임모듈 안 텍스트 지우기
    tmChart2.enter.labelShow = false;
    tmChart2.leave.labelShow = false;

    // 2. 입차 출차 첫번째 타임라인
    // 예상방전 
    tmChart2.expOff.start = ['32:00'];
    tmChart2.expOff.end = ['07:00'];

    // 예상충전 (같은 범례안에서 2개의 설정이 필요한 경우 형태)
    tmChart2.expCarge.start = ['07:00', '19:00'];
    tmChart2.expCarge.end = ['11:00', '32:00'];

    // 출차 
    tmChart2.leave.start = ['11:00'];
    tmChart2.leave.end = ['12:00'];

    // 입차
    tmChart2.enter.start = ['18:00'];
    tmChart2.enter.end = ['19:00'];


    // 지우고
    timeLine1.remove();
    timeLine2.remove();
    timeLine3.remove();
    // 다시그리기
    timeLine1 = mkTimeline(tmChart1, tm[0]);
    timeLine2 = mkTimeline(tmChart2, tm[1]);
    timeLine3 = mkTimeline(tmChart3, tm[2]);
  } else {

    tmChart1.options.max = 24;
    tmChart2.options.max = 24;
    tmChart3.options.max = 24;
    tmChart3.options.min = 1;
    
    // 타임모듈 시간설정 (hh:mm)
    // 1. 커넥터 스케줄 
    // EV1.커넥터1 
    tmChart1.ev1.start = ['01:00'];
    tmChart1.ev1.end = ['05:00'];

    // EV2.커넥터2
    tmChart1.ev2.start = ['07:00'];
    tmChart1.ev2.end = ['11:00'];

    // EV3.커넥터3
    tmChart1.ev3.start = ['11:00'];
    tmChart1.ev3.end = ['15:00'];

    // EV4.커넥터4
    tmChart1.ev4.start = ['15:30'];
    tmChart1.ev4.end = ['19:30'];

    // 타임모듈 안 텍스트 발생
    tmChart2.enter.labelShow = true;
    tmChart2.leave.labelShow = true;


    // 2. 입차 출차 첫번째 타임라인
    // 예상방전 
    tmChart2.expOff.start = ['24:00'];
    tmChart2.expOff.end = ['04:00'];

    // 예상충전 (같은 범례안에서 2개의 설정이 필요한 경우 형태)
    tmChart2.expCarge.start = ['04:00', '18:00'];
    tmChart2.expCarge.end = ['06:00', '24:00'];

    // 출차 
    tmChart2.leave.start = ['06:00'];
    tmChart2.leave.end = ['07:00'];

    // 입차
    tmChart2.enter.start = ['17:00'];
    tmChart2.enter.end = ['18:00'];

    // 지우고
    timeLine1.remove();
    timeLine2.remove();
    timeLine3.remove();
    
    // 다시그리기
    timeLine1 = mkTimeline(tmChart1, tm[0]);
    timeLine2 = mkTimeline(tmChart2, tm[1]);
    timeLine3 = mkTimeline(tmChart3, tm[2]);
  }
})
