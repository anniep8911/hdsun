import {mixedChart, mkChart } from "./ui-functions.js";

const mixedChartArea =  document.querySelector('.mixed-chart');
// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));return arr;}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)

mixedChart.opts.barThickness= 14

mixedChart.prevMon={};
mixedChart.nowMon={};

mixedChart.prevMon.backgroundColor='#878787';
mixedChart.nowMon.backgroundColor='#EF726A';

mixedChart.prevMon.borderColor='transparent';
mixedChart.nowMon.borderColor='transparent';

mixedChart.prevMon.label='전일 소비 전력량';
mixedChart.nowMon.label='기준일 소비 전력량';

mixedChart.prevMon.borderWidth=1;
mixedChart.nowMon.borderWidth=1;

mixedChart.charOptions.labelShow=true;
mixedChart.charOptions.title='소비 전력량 그래프 (kWh)';
mixedChart.charOptions.lv='kWh';
mixedChart.charOptions.checked=true;





// 데이터 세팅영역 ********개발 수정 부분*****************
// 소비전력량 그래프 세팅
mixedChart.labels = Array(24).fill(0).map((_,i)=>i+1);
// 전달 소비 전력량
mixedChart.prevMon.data=dataReturn(2000,0);
// 기준달 소비 전력량
mixedChart.nowMon.data=dataReturn(2000,0);
// 데이터 세팅영역 ********개발 수정 부분*****************끝!


mkChart(mixedChartArea,mixedChart);