import {mkChart,mixedChart, deepCopy} from './ui-functions.js';

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));return arr;}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const mixedChartArea = document.querySelector('.mixed-chart');
const selBox =  document.querySelector('.sel_date');

// 바 두께 설정
mixedChart.opts.barThickness= 18

let mixedChartTerm = deepCopy(mixedChart);
let mixedChartDay = deepCopy(mixedChart);
 

// 기간차트 설정영역
// 차트 타이틀 및 라벨 설정
mixedChartTerm.charOptions.checked=true;
mixedChartTerm.charOptions.labelShow=true;
mixedChartTerm.charOptions.title='생산전력량 그래프 (kWh)';
mixedChartTerm.charOptions.lv='kWh';
mixedChartTerm.charOptions.lvRight='%';

// 가동율 차트 스타일 설정
mixedChartTerm.pvPer={};
mixedChartTerm.pvPer.label='자급율';
mixedChartTerm.pvPer.mark='%';
mixedChartTerm.pvPer.type = 'line';
mixedChartTerm.pvPer.yAxisID= 'y-right';

mixedChartTerm.pvPer.borderColor= '#00AAD2';
mixedChartTerm.pvPer.pointRadius= 1;
mixedChartTerm.pvPer.pointBackgroundColor= '#00AAD2';
mixedChartTerm.pvPer.pointHoverRadius= 5;
mixedChartTerm.pvPer.pointHoverBackgroundColor='#00AAD2';

// pv생산전력 차트 스타일 설정
mixedChartTerm.pvmake={};
mixedChartTerm.pvmake.label='PV생산전력';
mixedChartTerm.pvmake.backgroundColor='#4D5BD4';
mixedChartTerm.pvmake.borderWidth=3;
mixedChartTerm.pvmake.borderColor='transparent';
mixedChartTerm.pvmake.mark='kWh';


// ****************개발 설정 영역**********************/

// 차트 기준라벨(범례)설정(::데이터 길이와 일치해야함)
mixedChartTerm.labels = Array(24).fill(0).map((_,i)=>i+1);

// 차트 데이터 세팅 (dataReturn은 더미데이터용 함수임. 삭제 후 배열타입 데이터 대입)
// pv생산전력
mixedChartTerm.pvmake.data = dataReturn(2500,0);
// 가동율
mixedChartTerm.pvPer.data = dataReturn(100,0);
// ****************개발 설정 영역**********************/
// 기간차트 설정영역 끝!!!



// 일차트 설정영역
// 차트 타이틀 및 라벨 설정
mixedChartDay.charOptions.checked=true;
mixedChartDay.charOptions.labelShow=true;
mixedChartDay.charOptions.title='생산전력량 그래프 (kWh)';

// 가동율 차트 스타일 설정
mixedChartDay.elPer={};
mixedChartDay.elPer.label = '예측 발전량';
mixedChartDay.elPer.mark='%';
mixedChartDay.elPer.type = 'line';
mixedChartDay.elPer.yAxisID= 'y-right';
mixedChartDay.elPer.borderColor= '#00AAD2';
mixedChartDay.elPer.pointRadius= 1;
mixedChartDay.elPer.pointBackgroundColor= '#00AAD2';
mixedChartDay.elPer.pointHoverRadius= 5;
mixedChartDay.elPer.pointHoverBackgroundColor='#00AAD2';


// 전일pv 생산전력 차트 스타일 설정
mixedChartDay.prevPV={};
mixedChartDay.prevPV.label = '전일 PV 생산전력량';
mixedChartDay.prevPV.borderWidth=3;
mixedChartDay.prevPV.borderColor='transparent';
mixedChartDay.prevPV.backgroundColor='#4D5BD4';
mixedChartDay.prevPV.mark='kWh';
  
// 기준일pv 생산전력 차트 스타일 설정
mixedChartDay.dayPV={};
mixedChartDay.dayPV.label = '기준일 PV 생산전력량';
mixedChartDay.dayPV.backgroundColor='#EF726A';
mixedChartDay.dayPV.borderWidth=3;
mixedChartDay.dayPV.borderColor='transparent';
mixedChartDay.dayPV.mark='kWh';

// ****************개발 설정 영역**********************/
// 차트 기준라벨(범례)설정(::데이터 길이와 일치해야함)
mixedChartDay.labels = Array(24).fill(0).map((_,i)=>i+1);

// 차트 데이터 세팅 (dataReturn은 더미데이터용 함수임. 삭제 후 배열타입 데이터 대입)
// 전일pv생산전력량
mixedChartDay.prevPV.data = dataReturn(2500,0);
// 기준일 pv생산 전력량
mixedChartDay.dayPV.data = dataReturn(2500,0);
// 가동율
mixedChartDay.elPer.data = dataReturn(100,0);
// ****************개발 설정 영역**********************/


// 차트 그리기
let ch =  mkChart(mixedChartArea,mixedChartDay);

// 차트 내용변경부분 인터랙션

selBox.addEventListener('change',function(){
  ch.destroy();
  this.value==='term'?ch =  mkChart(mixedChartArea,mixedChartTerm):ch =  mkChart(mixedChartArea,mixedChartDay);
})