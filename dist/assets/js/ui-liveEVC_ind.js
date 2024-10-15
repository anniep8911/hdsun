import {mkChart,lineChart, mixedNegChart, timeChart, mkTimeline} from './ui-functions.js';

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {
    let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));
    let ranidx = Array(Math.floor(Math.random() * 24)).fill(0).map(m => m + Math.floor( Math.random()*24));

    min<0? ranidx.forEach(e=>{
       arr= arr.map((m,i)=>i===e ? m*-1:m);
    }):'';
    return arr;
}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)

const minxedNegChartArea = document.querySelector('.mixed-neg-chart');
const lineChartArea = document.querySelector('.line-chart');
const tm = document.querySelector('.chart-time-line');

mixedNegChart.expCharge={};
mixedNegChart.charge={};
mixedNegChart.expOff={};
mixedNegChart.off={};

lineChart.usage={};
lineChart.cbl={};

lineChart.usage.label='실제 사용량';
lineChart.cbl.label='CBL';

lineChart.usage.borderColor='#666666';
lineChart.cbl.borderColor='#00AAD2';

lineChart.usage.backgroundColor='#666666';
lineChart.cbl.backgroundColor='#00AAD2';

lineChart.usage.pointRadius=5;
lineChart.cbl.pointRadius=5;

mixedNegChart.expCharge.backgroundColor='#7E7F8E';
mixedNegChart.charge.backgroundColor='#4D5BD4';
mixedNegChart.expOff.backgroundColor='#BC8884';
mixedNegChart.off.backgroundColor='#EF726A';

mixedNegChart.off.borderColor='transparent';
mixedNegChart.expCharge.borderColor='transparent';
mixedNegChart.charge.borderColor='transparent';
mixedNegChart.expOff.borderColor='transparent';

mixedNegChart.off.borderWidth=1;
mixedNegChart.expCharge.borderWidth=1;
mixedNegChart.charge.borderWidth=1;
mixedNegChart.expOff.borderWidth=1;

mixedNegChart.expCharge.label='예측 충전량';
mixedNegChart.charge.label='충전량';
mixedNegChart.expOff.label='예측 방전량';
mixedNegChart.off.label='방전량';

mixedNegChart.expCharge.label='예측 충전량';
mixedNegChart.charge.label='충전량';
mixedNegChart.expOff.label='예측 방전량';
mixedNegChart.off.label='방전량';

mixedNegChart.expCharge.stack='stack1';
mixedNegChart.charge.stack='stack2';
mixedNegChart.expOff.stack='stack1';
mixedNegChart.off.stack='stack2';

mixedNegChart.charOptions.labelShow=true;
mixedNegChart.charOptions.title='12가 4546';
mixedNegChart.charOptions.lv='kWh';


lineChart.charOptions.labelShow=true;
lineChart.charOptions.title='CBL / 사용전력량';
lineChart.charOptions.lv='kWh';

// 타임라인 스타일 설정
// timeChart.options.shape= 'polygon(0% 0%, calc(100% - 30px) 0%, 100% 50%, calc(100% - 30px) 100%, 0% 100%)';
timeChart.options.tips= (dt,st,end)=>{ 
    // 시간계산은 따로 여기에 로직 작성해서 넣으면 됩니다.
    // st는 시작시간, end는 끝 시간을 HH:MM 형식의  string으로 제공합니다.
    return `${dt.start} ~ ${dt.end} (0${end.split(':')[0] - st.split(':')[0] }:00) \n ${dt.note}`
};

timeChart.ev1={};
timeChart.ev2={};
timeChart.ev3={};

//컬러 설정
timeChart.ev1.backgroundColor='#C8907F';
timeChart.ev2.backgroundColor='#BA7660';
timeChart.ev3.backgroundColor='#8F523E';


timeChart.options.cut=15;

// 세팅영역 ****************개발설정영역
// 1.커넥터 차트
mixedNegChart.labels=Array(24).fill(0).map((_,i)=>i+1);
mixedNegChart.expCharge.data=dataReturn(600,0).map((m,i)=>i<9 || i>22 ?  m : m*0);
mixedNegChart.charge.data=dataReturn(600,0).map((m,i)=>i<9 || i>22 ?  m : m*0);
mixedNegChart.expOff.data=dataReturn(600,0).map((m,i)=>i>=9&&i<=22?m*-1:m*0);
mixedNegChart.off.data=dataReturn(600,0).map((m,i)=>i>=9&&i<=22?m*-1:m*0);


// 2.CBL/사용전력량
lineChart.labels=Array(24).fill(0).map((_,i)=>i+1);
lineChart.usage.data=dataReturn(20,-20);
lineChart.cbl.data=dataReturn(20,-20);


// 타임 차트 영역
// 타임영역 카테고리 라벨 설정
timeChart.options.category=['Plug-1','Plug-2'];


// 타임모듈 라벨설정
timeChart.ev1.label='EVC1';
timeChart.ev2.label='EVC2';
timeChart.ev3.label='EVC3';

// 타임모듈 show
timeChart.ev1.labelShow=true;
timeChart.ev2.labelShow=true;
timeChart.ev3.labelShow=true;

// 카테고리 위치 설정
timeChart.ev1.category='1';
timeChart.ev2.category='1';
timeChart.ev3.category='2';


// 각 타임모듈 툴팁에서 추가로 들어갈 내용
timeChart.ev1.note='충전 100kWh';
timeChart.ev2.note='충전 100kWh';
timeChart.ev3.note='충전 100kWh';


// 시간설정
timeChart.ev1.start=['04:00'];
timeChart.ev1.end=['04:30'];

timeChart.ev2.start=['01:30'];
timeChart.ev2.end=['02:30'];

timeChart.ev3.start=['02:00'];
timeChart.ev3.end=['10:00'];

// 세팅영역 ****************개발설정영역 끝

// 그리기
mkChart(minxedNegChartArea, mixedNegChart);
mkChart(lineChartArea, lineChart);

// 타임 그리기
mkTimeline(timeChart,tm);

