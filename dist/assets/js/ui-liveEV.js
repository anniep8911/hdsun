import {mixedChart,mkChart,deepCopy} from './ui-functions.js';

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));return arr;}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)

const mixedArea = document.querySelector('.mixed-chart');
const mixedNegArea =  document.querySelector('.mixed-neg-chart');

// 같은 형태의 믹스차트를 쓰고있어 완전 딥카피 진행 (재귀함수 사용)
let mixedNegChart = deepCopy(mixedChart);
let mixeBarChart = deepCopy(mixedChart);

// 충전 차량 수 및 시간
mixeBarChart.prevCars ={};
mixeBarChart.nowCars ={};
mixeBarChart.prevCharge ={};
mixeBarChart.nowCharge ={};

mixeBarChart.prevCharge.label='전일 충전 시간';
mixeBarChart.nowCharge.label='기준일 충전 시간';
mixeBarChart.prevCars.label='전일 차량 수';
mixeBarChart.nowCars.label='기준일 차량 수';

mixeBarChart.prevCharge.backgroundColor='#878787';
mixeBarChart.nowCharge.backgroundColor='#4D5BD4';
mixeBarChart.prevCars.backgroundColor='#EF726A';
mixeBarChart.nowCars.backgroundColor='#00D2B9';
mixeBarChart.prevCars.borderColor='#EF726A';
mixeBarChart.nowCars.borderColor='#00D2B9';

mixeBarChart.prevCars.pointRadius=0;
mixeBarChart.nowCars.pointRadius=0;

mixeBarChart.prevCars.type ='line';
mixeBarChart.nowCars.type ='line';


mixeBarChart.prevCars.mark ='대';
mixeBarChart.nowCars.mark ='대';
mixeBarChart.prevCharge.mark ='kWh';
mixeBarChart.nowCharge.mark ='kWh';

mixeBarChart.charOptions.lv ='분';
mixeBarChart.charOptions.lvRight ='대';

mixeBarChart.prevCars.yAxisID='y-right';
mixeBarChart.nowCars.yAxisID='y-right';

mixeBarChart.prevCharge.borderColor='transparent';
mixeBarChart.nowCharge.borderColor='transparent';
mixeBarChart.prevCharge.borderWidth=2;
mixeBarChart.nowCharge.borderWidth=2;


mixeBarChart.charOptions.title='충전 차량 수 및 시간';
mixeBarChart.charOptions.labelShow=true;


// 충전량 / 방전량 (kWh)
mixedNegChart.expCharge={};
mixedNegChart.charge={};
mixedNegChart.expOff={};
mixedNegChart.off={};

mixedNegChart.expCharge.backgroundColor='#7E7F8E';
mixedNegChart.charge.backgroundColor='#4D5BD4';
mixedNegChart.expOff.backgroundColor='#BC8884';
mixedNegChart.off.backgroundColor='#EF726A';

mixedNegChart.expCharge.borderColor='transparent';
mixedNegChart.charge.borderColor='transparent';
mixedNegChart.expOff.borderColor='transparent';
mixedNegChart.off.borderColor='transparent';

mixedNegChart.charOptions.title='충전량 / 방전량 (kWh)';
mixedNegChart.charOptions.labelShow=true;

mixedNegChart.expCharge.label='예측 충전량';
mixedNegChart.charge.label='충전량';
mixedNegChart.expOff.label='예측 방전량';
mixedNegChart.off.label='방전량';


// 툴팁에서 타이틀 세팅
// mixedNegChart.expCharge.tipLabel='예측 충전';
// mixedNegChart.charge.tipLabel='충전';
// mixedNegChart.expOff.tipLabel='예측 방전';
// mixedNegChart.off.tipLabel='방전';

// 마이너스 값 툴팁 표시 삭제 설정
mixedNegChart.expOff.removeNeg=true;
mixedNegChart.off.removeNeg=true;

mixedNegChart.charOptions.lv ='kWh';

mixedNegChart.expCharge.borderWidth=2;
mixedNegChart.charge.borderWidth=2;
mixedNegChart.expOff.borderWidth=2;
mixedNegChart.off.borderWidth=2;

mixedNegChart.expCharge.skipNull=true;
mixedNegChart.charge.skipNull=true;
mixedNegChart.expOff.skipNull=true;
mixedNegChart.off.skipNull=true;

// 데이터세팅 *********************개발 설정영역 ********************************** 
// 1.충전 차량 수 및 시간
// 라벨설정
mixeBarChart.labels=Array(24).fill(0).map((_,i)=>i+1);
// 전일 충전시간
mixeBarChart.prevCharge.data= dataReturn(2000,0);
// 기준일 충전시간
mixeBarChart.nowCharge.data= dataReturn(2000,0);
// 전일 차량 수
mixeBarChart.prevCars.data= dataReturn(4000,200);
// 기준일 차량 수
mixeBarChart.nowCars.data= dataReturn(4000,200);


// 2.충전량 / 방전량 (kWh)
// 라벨설정
mixedNegChart.labels=Array(24).fill(0).map((_,i)=>i+1);
// 예측충전량
mixedNegChart.expCharge.data=dataReturn(600,0).map((m,i)=>i<=9 || i>22 ? m:m*0);
// 충전량
mixedNegChart.charge.data=dataReturn(600,0).map((m,i)=>i<=9 || i>22 ? m:m*0);
// 예측방전량
mixedNegChart.expOff.data=dataReturn(600,0).map((m,i)=>i>9&&i<=22? m*-1:m*0);
// 방전량
mixedNegChart.off.data=dataReturn(600,0).map((m,i)=>i>9&&i<=22? m*-1:m*0);


// 툴팁에 나오는 날짜, 시간 설정  (데이터의 length와 동일하게 설정 :: 배열로 들어오니 세팅 전 한번 확인해주세요!)
// 배열로 설정한 이유 : 호버시 범례마다 날짜, 시간 데이터가 다를 수 있기때문
mixedNegChart.charOptions.times =Array(24).fill('2024.07.09 12:23:59');

// 데이터세팅 *********************개발 설정영역 ********************* ***********끝


// 차트 그리기
mkChart(mixedArea,mixeBarChart);
mkChart(mixedNegArea,mixedNegChart);