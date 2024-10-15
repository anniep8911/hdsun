import {mkChart,mixedChart} from './ui-functions.js';
// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));return arr;}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const mixedChartArea = document.querySelector('.mixed-chart');

mixedChart.charOptions.title='소비 전력량 그래프 (kWh)';
mixedChart.charOptions.labelShow=true;
mixedChart.charOptions.checked=true;

// 바두께 설정
mixedChart.opts.barThickness= 16

mixedChart.prevEl={};
mixedChart.prevEl.mark='kWh';
mixedChart.prevEl.borderWidth=1;
mixedChart.prevEl.borderColor='transparent';
mixedChart.prevEl.backgroundColor='#878787';

mixedChart.todayEl={};
mixedChart.todayEl.mark='kWh';
mixedChart.todayEl.borderWidth=1;
mixedChart.todayEl.borderColor='transparent';
mixedChart.todayEl.backgroundColor='#EF726A';

mixedChart.prevEl.label='전일 소비 전력량';
mixedChart.todayEl.label='기준일 소비 전력량';


// 범례설정
mixedChart.labels=Array(24).fill(0).map((_,i)=> i+1);
mixedChart.opts.scales['y-right'].display=false;

mixedChart.prevEl.data = dataReturn(2500,0);
mixedChart.todayEl.data = dataReturn(2500,0);

mkChart(mixedChartArea,mixedChart);