import {mkChart,lineChart} from './ui-functions.js';

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {let arr = Array(12).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));return arr;}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const lineChartArea = document.querySelector('.line-chart');

lineChart.lightLoad ={};
lineChart.heavyLoad ={};
lineChart.maxLoad ={};


lineChart.charOptions.title='소비 전력량 그래프 (kWh)';
lineChart.charOptions.labelShow=true;


lineChart.lightLoad.label = '경부하';
lineChart.heavyLoad.label = '중부하';
lineChart.maxLoad.label = '최대부하';

lineChart.lightLoad.type = 'line';
lineChart.heavyLoad.type = 'line';
lineChart.maxLoad.type = 'line';
lineChart.lightLoad.mark = 'kWh';
lineChart.heavyLoad.mark = 'kWh';
lineChart.maxLoad.mark = 'kWh';

lineChart.lightLoad.pointRadius= 0;
lineChart.heavyLoad.pointRadius= 0;
lineChart.maxLoad.pointRadius= 0;



lineChart.lightLoad.borderColor = '#4D5BD4';
lineChart.heavyLoad.borderColor = '#EF726A';
lineChart.maxLoad.borderColor = '#999999';
lineChart.charOptions.lv = '원/kWh';

// 스텝사이즈 설정
lineChart.opts.scales.y.ticks.stepSize=10;


// 차트데이터 세팅 부분 ******************개발 설정부분*******************
// X축 라벨(범례)세팅 
lineChart.labels =Array(12).fill(0).map((_,i)=> i+1);
// 경부하
lineChart.lightLoad.data = dataReturn(20,0);
// 중부하
lineChart.heavyLoad.data = dataReturn(20,0);
// 최대부하
lineChart.maxLoad.data = dataReturn(20,0);
// 차트데이터 세팅 부분 끝******************개발 설정부분*******************



// 차트 그리기
mkChart(lineChartArea,lineChart);


// 차트 내용변경부분 인터랙션
