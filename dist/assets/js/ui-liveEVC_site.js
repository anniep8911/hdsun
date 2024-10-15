import {mkChart,mixedNegChart,mixedBarChart,timeChart,mkTimeline,deepCopy, mkRepChart} from './ui-functions.js';
// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {
  let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));
  return arr;
}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)

// 차트영역
const mixedNegArea = document.querySelectorAll('.mixed-neg-chart');
const mixedBarArea = document.querySelector('.mixed-chart');

//타임라인 영역
const timelline = document.querySelectorAll('.chart-time-line');

// 요소별 딥카피 :: 데이터 보존을 위해 필수!
let mixedNegCharts = [];

// 차트 두께설정
mixedNegChart.opts.barThickness= 20
mixedBarChart.opts.barThickness= 20


mixedNegArea.forEach(e => {
  mixedNegCharts.push(deepCopy(mixedNegChart));
});

//딥카피 후  1. [[충전/방전량 그래프(kWh)]]  공통요소 설정  
mixedNegCharts.forEach((mixedNegChart) => {
  // 변수 선언
  mixedNegChart.imdCharge = {}; 
  mixedNegChart.schCharge = {};
  mixedNegChart.imdOff = {};
  mixedNegChart.schOff = {};

  // 컬러 세팅
  mixedNegChart.imdCharge.backgroundColor = '#4D5BD4';
  mixedNegChart.schCharge.backgroundColor = '#999999';
  mixedNegChart.imdOff.backgroundColor = '#EF726A';
  mixedNegChart.schOff.backgroundColor = '#EFC26A';

  // 단위세팅
  mixedNegChart.charOptions.lv = 'kWh';

  //라벨설정 
  mixedNegChart.imdCharge.label = '즉시 충전량';
  mixedNegChart.schCharge.label = '스케줄 충전량';
  mixedNegChart.imdOff.label = '즉시 방전량';
  mixedNegChart.schOff.label = '스케줄 방전량';
  
  // 툴팁 노출 라벨설정
  mixedNegChart.imdCharge.tipLabel = '즉시 충전';
  mixedNegChart.schCharge.tipLabel = '스케줄 충전';
  mixedNegChart.imdOff.tipLabel = '즉시 방전';
  mixedNegChart.schOff.tipLabel = '스케줄 방전';

  // 타이틀 표시여부
  mixedNegChart.charOptions.labelShow=true;
  mixedNegChart.charOptions.title = '충전/방전량 그래프(kWh)';
});

// 변수선언
mixedBarChart.usage = {};
mixedBarChart.charge = {};
mixedBarChart.wait = {};
mixedBarChart.off = {};
mixedBarChart.discon = {};
mixedBarChart.broken = {};

// 컬러세팅
mixedBarChart.charge.backgroundColor = '#4D5BD4';
mixedBarChart.wait.backgroundColor = '#00D2B9';
mixedBarChart.off.backgroundColor = '#EFC26A';
mixedBarChart.discon.backgroundColor = '#CCCCCC';
mixedBarChart.broken.backgroundColor = '#E63312';
mixedBarChart.usage.backgroundColor = '#00AAD2';
mixedBarChart.usage.borderColor = '#00AAD2';
mixedBarChart.usage.pointRadius = 0;

// 타입세팅
mixedBarChart.usage.type = 'line';

// 범례설정
mixedBarChart.opts.scales['y-right'].display = true;
mixedBarChart.usage.yAxisID = 'y-right';
mixedBarChart.charOptions.lv = '대';
mixedBarChart.charOptions.lvRight = '%';

// 툴팁 설정
mixedBarChart.charOptions.toolDet = true;
mixedBarChart.charOptions.lvDet = false;

// 타이틀 세팅
mixedBarChart.charge.label = '충전중';
mixedBarChart.wait.label = '대기중';
mixedBarChart.off.label = '방전중';
mixedBarChart.discon.label = '미연결';
mixedBarChart.broken.label = '고장';
mixedBarChart.usage.label = '사용율';

// 타이틀 표시여부 세팅
mixedBarChart.charOptions.labelShow = true;
mixedBarChart.charOptions.title = 'EVC 커넥터 현황';


// 데이터 세팅 영역 **************************************개발 설정영역*********************************

// EVC의 모듈이 늘어나는 수만큼 index값을 넣어서 데이터를 설정하면 됩니다.
// 예  EVC3가 있다면 ? mixedNegCharts[2].imdCharge.data= 데이터 설정
// 1.EVC1 충전/방전량 그래프
// 라벨설정 
mixedNegCharts[0].labels= Array(24).fill(0).map((_,i)=>i+1);
// 즉시 충전량
mixedNegCharts[0].imdCharge.data=dataReturn(300,0).map((m,i)=>i<11? m:0);
// 스케줄 충전량
mixedNegCharts[0].schCharge.data=dataReturn(300,0).map((m,i)=>i<11? m:0);
// 즉시 방전량
mixedNegCharts[0].imdOff.data=dataReturn(300,0).map((m,i)=>i>10?m*-1:0);
// 스케줄 방전량
mixedNegCharts[0].schOff.data=dataReturn(300,0).map((m,i)=>i>10?m*-1:0);

// 1.EVC2 충전/방전량 그래프
// 라벨설정 
mixedNegCharts[1].labels= Array(24).fill(0).map((_,i)=>i+1);
// 즉시 충전량
mixedNegCharts[1].imdCharge.data=dataReturn(100,0).map((m,i)=>i<11? m:0);
// 스케줄 충전량
mixedNegCharts[1].schCharge.data=dataReturn(100,0).map((m,i)=>i<11? m:0);
// 즉시 방전량
mixedNegCharts[1].imdOff.data=dataReturn(100,0).map((m,i)=>i>10?m*-1:0);
// 스케줄 방전량
mixedNegCharts[1].schOff.data=dataReturn(100,0).map((m,i)=>i>10?m*-1:0);

// 2. EVC 커넥터 현황
// 라벨세팅
mixedBarChart.labels = Array(24).fill(0).map((_, i) => i + 1);
mixedBarChart.charge.data = dataReturn(200, 0);
mixedBarChart.wait.data = dataReturn(200, 0);
mixedBarChart.off.data = dataReturn(200, 0);
mixedBarChart.discon.data = dataReturn(200, 0);
mixedBarChart.broken.data = dataReturn(200, 0);
mixedBarChart.usage.data = dataReturn(100, 0);
// 데이터 세팅 영역 **************************************개발 설정영역*********************************


// 그리기 영역
// 1. 각EVC별 충전/방전량 그래프(kWh)(만약  전체 max값 계산이 필요없다면 ? 맨 마지막 파라미터에 false넣기!)
let repChart = mkRepChart(mixedNegArea,mixedNegCharts,true);
mkChart(mixedBarArea, mixedBarChart);


// 각 EVC별 차트 세팅을 원하면 다음과 같이 진행합니다. 
// (아래의 이벤트는 예시용 이벤트이므로, 이벤트 함수 내에 있는 사용법을 참고하면 됩니다.)
$('.sel_date').change(function(){
  // ********************개발 참고 구간: 딥카피 발생 시 차트 설정 예시:: 사용법에 맞게 수정하시고 해당 함수는 지워주세요! *****************//
  // 전체 지우기 (전체 max값 때문에 반복이 진행되는 모든 chart를 지우고 시작합니다.)
  repChart.forEach(e=> e.destroy());

  // 데이터 세팅 (예:: EVC1데이터가 변경된다면?)
  // 라벨설정 
  mixedNegCharts[0].labels= Array(15).fill(0).map((_,i)=>i+1);
  // 즉시 충전량
  mixedNegCharts[0].imdCharge.data=dataReturn(500,0).map((m,i)=>i<11? m:0);
  // 스케줄 충전량
  mixedNegCharts[0].schCharge.data=dataReturn(500,0).map((m,i)=>i<11? m:0);
  // 즉시 방전량
  mixedNegCharts[0].imdOff.data=dataReturn(500,0).map((m,i)=>i>10?m*-1:0);
  // 스케줄 방전량
  mixedNegCharts[0].schOff.data=dataReturn(500,0).map((m,i)=>i>10?m*-1:0);

  // 다시 그리기 (다시 그릴때 만약  전체 max값 계산이 필요없다면 ? 맨 마지막 파라미터에 false넣기 ! : 처음 설정한 형태와 동일하게 가야함 )
  repChart = mkRepChart(mixedNegArea,mixedNegCharts,true);
  // ***********************개발 참고 구간 끝!!!!!!!!!!!!**************/
});


// 타임라인 그려질 곳 
const tm = document.querySelectorAll('.chart-time-line');

// 타임차트 같은 페이지 내 반복 시 딥카피 필요!
let tmChart1 = deepCopy(timeChart);
let tmChart2 = deepCopy(timeChart);

// 바 굵기 설정(전체 그리드 높기 기준 -npx형식)
tmChart1.options.cut=15;
tmChart2.options.cut=15;

// 바 모양 일괄적용
// tmChart1.options.shape= 'polygon(0% 0%, calc(100% - 30px) 0%, 100% 50%, calc(100% - 30px) 100%, 0% 100%)';
// tmChart2.options.shape= 'polygon(0% 0%, calc(100% - 30px) 0%, 100% 50%, calc(100% - 30px) 100%, 0% 100%)';

// 호버 툴팁 설정 :: dt 파라미터내에서 입력한 데이터 값을 들고올 수 있음! 필요한것을 txt형식으로 값 return하면 됨
tmChart1.options.tips= (dt)=>{ return `${dt.label} \n ${dt.start} ~ ${dt.end} \n ${dt.note}`};
tmChart2.options.tips= (dt)=>{ return `${dt.label} \n ${dt.start} ~ ${dt.end} \n ${dt.note}`};

// 타임모듈 변수 :: 데이터 추가마다 빈 변수 추가 필요
tmChart1.ev1={};
tmChart1.ev2={};
tmChart1.ev3={};

tmChart2.ev1={};
tmChart2.ev2={};
tmChart2.ev3={};

// 각 타임모듈 카테고리 위치 설정
// EVC1
tmChart1.ev1.category='1';
tmChart1.ev2.category='1';
tmChart1.ev3.category='2';

//EVC2
tmChart2.ev1.category='1';
tmChart2.ev2.category='1';
tmChart2.ev3.category='2';

// 타임모듈 컬러설정
// EVC1
tmChart1.ev1.backgroundColor='#C8907F';
tmChart1.ev2.backgroundColor='#BA7660';
tmChart1.ev3.backgroundColor='#8F523E';

// EVC2
tmChart2.ev1.backgroundColor='#C8907F';
tmChart2.ev2.backgroundColor='#BA7660';
tmChart2.ev3.backgroundColor='#8F523E';

// 라벨 show/hide설정
tmChart1.ev1.labelShow=true;
tmChart1.ev2.labelShow=true;
tmChart1.ev3.labelShow=true;

tmChart2.ev1.labelShow=true;
tmChart2.ev2.labelShow=true;
tmChart2.ev3.labelShow=true;

// **********************데이터 설정 , 개발 설정영역 ***********************

// 각 타임모듈 라벨명
// EVC1
tmChart1.ev1.label='EV1';
tmChart1.ev2.label='EV2';
tmChart1.ev3.label='EV3';

//EVC2
tmChart2.ev1.label='EV1';
tmChart2.ev2.label='EV2';
tmChart2.ev3.label='EV3';

// 타임라인 카테고리 설정 :: 카테고리 명을 배열 형태로 입력하면 됨 위=>아래 순서
// EVC1
tmChart1.options.category=['Plug-1','Plug-2'];
// EVC2
tmChart2.options.category=['Plug-1','Plug-2'];

// 각 타임모듈 툴팁에서 추가로 들어갈 내용
// EVC1
tmChart1.ev1.note='충전 100kWh \n 방전 100kWh';
tmChart1.ev2.note='충전 100kWh\n 방전 100kWh';
tmChart1.ev3.note='충전 100kWh\n 방전 100kWh';

// EVC2
tmChart2.ev1.note='충전 100kWh\n 방전 100kWh';
tmChart2.ev2.note='충전 100kWh\n 방전 100kWh';
tmChart2.ev3.note='충전 100kWh\n 방전 100kWh';

// 타임모듈 시작 시간설정 (hh:mm)
// EVC1
tmChart1.ev1.start=['08:00'];
tmChart1.ev2.start=['09:10'];
tmChart1.ev3.start=['02:30'];

// EVC2
tmChart2.ev1.start=['01:00'];
tmChart2.ev3.start=['02:00'];
tmChart2.ev2.start=['13:00'];

// 타임모듈 끝시간 설정 (hh:mm)
// EVC1
tmChart1.ev1.end=['08:20'];
tmChart1.ev2.end=['10:10'];
tmChart1.ev3.end=['09:00'];

// EVC2
tmChart2.ev1.end=['06:00'];
tmChart2.ev3.end=['09:00'];
tmChart2.ev2.end=['18:00'];


// **********************데이터 설정 , 개발 설정영역 ***********************

// 설정 후 그리기 함수 사용 (데이터, 그릴 위치 dom)
// EVC1
mkTimeline(tmChart1,tm[0]);
// EVC2
mkTimeline(tmChart2,tm[1]);
