import {mkChart,mixedBarChart, deepCopy} from './ui-functions.js';
// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));return arr;}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const mixedBarChartArea = document.querySelector('.mixed-bar-chart');
const mixedChartArea = document.querySelector('.mixed-neg-chart');

let mixedESSChart = deepCopy(mixedBarChart);
let mixedChart = deepCopy(mixedBarChart);


// ESS현황 차트 설정
mixedESSChart.charge={};
mixedESSChart.wait={};
mixedESSChart.off={};
mixedESSChart.broken={};

// 컬러
mixedESSChart.charge.backgroundColor='#44DE66';
mixedESSChart.wait.backgroundColor='#00AAD2';
mixedESSChart.off.backgroundColor='#B3B3B3';
mixedESSChart.broken.backgroundColor='#E63312';


// 라벨설정
mixedESSChart.charge.label='충전중';
mixedESSChart.wait.label='대기중';
mixedESSChart.off.label='방전중';
mixedESSChart.broken.label='고장';


// 라벨 보여주기 설정
mixedESSChart.charOptions.labelShow=true;
mixedESSChart.charOptions.title='ESS 현황 (대)';
mixedESSChart.charOptions.lv='대';


// 툴팁 설정
mixedESSChart.charOptions.toolDet=true;
mixedESSChart.charOptions.lvDet=true;



// 충전 / 방전량 그래프 (kWh) 차트설정
mixedChart.expCharge={};
mixedChart.prvCharge={};
mixedChart.charge={};
mixedChart.expOff={};
mixedChart.prvOff={};
mixedChart.off={};
// 툴팁 안 라벨 이름 보여주기 설정
mixedChart.charOptions.labelShow=true;

// 묶음 스택 설정
mixedChart.expCharge.stack='stack0';
mixedChart.prvCharge.stack='stack1';
mixedChart.charge.stack='stack2';
mixedChart.expOff.stack='stack1';
mixedChart.prvOff.stack='stack0';
mixedChart.off.stack='stack2';

// 컬러
mixedChart.expCharge.backgroundColor='#7E7F8E';
mixedChart.prvCharge.backgroundColor='#AFB8FF';
mixedChart.charge.backgroundColor='#4D5BD4';
mixedChart.expOff.backgroundColor='#FFB4AF';
mixedChart.prvOff.backgroundColor='#BC8884';
mixedChart.off.backgroundColor='#EF726A';


// 보더설정
mixedChart.charge.borderWidth=2;
mixedChart.off.borderWidth=2;
mixedChart.prvCharge.borderWidth=2;
mixedChart.prvOff.borderWidth=2;
mixedChart.expCharge.borderWidth=2;
mixedChart.expOff.borderWidth=2;

mixedChart.charge.borderColor='transparent';
mixedChart.off.borderColor='transparent';
mixedChart.prvCharge.borderColor='transparent';
mixedChart.prvOff.borderColor='transparent';
mixedChart.expCharge.borderColor='transparent';
mixedChart.expOff.borderColor='transparent';


// 라벨
mixedChart.prvCharge.label='전일 충전량';
mixedChart.charge.label='충전량';
mixedChart.prvOff.label='전일 방전량';
mixedChart.off.label='방전량';
mixedChart.expCharge.label='예측 충전량';
mixedChart.expOff.label='예측 방전량';

mixedChart.charge.skipNull=true;
mixedChart.off.skipNull=true;
mixedChart.prvCharge.skipNull=true;
mixedChart.prvOff.skipNull=true;

// 라벨보여주기
mixedChart.charOptions.title='충전 / 방전량 그래프 (kWh)';
mixedChart.charOptions.lv='kWh';

// 툴팁 설정 (mixedBarChart를 사용할때, 계산하지 않고 개별 데이터를 툴팁으로 노출)
mixedChart.charOptions.showSingle = true;




// 데이터 세팅영역 *******개발 설정영역
// 1.ESS 현황 (대)
// Y축 범례
mixedESSChart.labels = Array(24).fill(0).map((_,i)=>i+1);
// 충전중
mixedESSChart.charge.data=dataReturn(150,0);
// 대기중
mixedESSChart.wait.data=dataReturn(150,0);
// 방전중
mixedESSChart.off.data=dataReturn(150,0);
// 고장
mixedESSChart.broken.data=dataReturn(150,0);


// 2. 충전 / 방전량 그래프 (kWh)

// 팁라벨 설정
mixedChart.prvCharge.tipLabel=['2024.07.09 12:23:59',' 전일 충전량'];
mixedChart.charge.tipLabel=['2024.07.09 12:23:59','충전량'];
mixedChart.prvOff.tipLabel=['2024.07.09 12:23:59','전일 방전량'];
mixedChart.off.tipLabel=['2024.07.09 12:23:59','방전량'];

// Y축 범례
mixedChart.labels= Array(24).fill(0).map((_,i)=>i+1);
//  전일 충전량
mixedChart.prvCharge.data=dataReturn(1000,0);
//  충전량
mixedChart.expCharge.data=dataReturn(1000,0);
//  충전량
mixedChart.charge.data=dataReturn(1000,0);
//  전일 방전량
mixedChart.prvOff.data=dataReturn(1000,0).map(m=> m*-1);
// 예측 방전량
mixedChart.expOff.data=dataReturn(1000,0).map(m=> m*-1);
//  방전량
mixedChart.off.data=dataReturn(1000,0).map(m=> m*-1);


// 툴팁에 나오는 날짜, 시간 설정  (데이터의 length와 동일하게 설정 :: 배열로 들어오니 세팅 전 한번 확인해주세요!)
// 배열로 설정한 이유 : 호버시 범례마다 날짜, 시간 데이터가 다를 수 있기때문
mixedChart.charOptions.times =Array(24).fill('2024.07.09 12:23:59');


// 데이터 세팅영역 *******개발 설정영역 끝!


// 차트 그리기 영역
mkChart(mixedBarChartArea,mixedESSChart);
mkChart(mixedChartArea,mixedChart);





