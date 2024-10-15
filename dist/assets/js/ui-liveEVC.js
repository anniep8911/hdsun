import {mkChart,mixedBarChart,mixedChart, deepCopy} from './ui-functions.js';
// 일선택 :mixedChartDay , 월 선택 mixedChartMon 구분 필요합니다.!!!!!!!!!!!!!!!!!!***확인 후 해당 주석 삭제!!!

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));return arr;}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const mixedBarChartArea = document.querySelector('.mixed-bar-chart');
const mixedChartArea = document.querySelector('.mixed-neg-chart');
const mixedChartAreaMonth = document.querySelector('.mixed-neg-chart-mon');

// 바 굵기 설정
mixedChart.opts.barThickness= 20;

// 바 굵기 설정
mixedBarChart.opts.barThickness= 20;

let mixedChartDay=deepCopy(mixedChart);
let mixedChartMon=deepCopy(mixedBarChart);

// 라벨설정영역
mixedBarChart.charOptions.labelShow = true;
mixedBarChart.charOptions.title = 'EVC 커넥터 현황';

// 일선택 
mixedChartDay.charOptions.labelShow = true;
mixedChartDay.charOptions.checked = false;
mixedChartDay.charOptions.title = '충전 / 방전량 (kWh)';

// 월선택
mixedChartMon.charOptions.labelShow = true;
mixedChartMon.charOptions.checked = false;
mixedChartMon.charOptions.title = '충전 / 방전량 (kWh)';

// 범례 변수 선언영역
mixedBarChart.usage={};
mixedBarChart.charge={};
mixedBarChart.wait={};
mixedBarChart.off={};
mixedBarChart.discon={};
mixedBarChart.broken={};
mixedBarChart.err={};


// 일선택
mixedChartDay.prevCharge={};
mixedChartDay.charge={};
mixedChartDay.prevOff={};
mixedChartDay.off={};

// 월선택
mixedChartMon.prevCharge={};
mixedChartMon.prevOff={};
mixedChartMon.charge={};
mixedChartMon.off={};


// 각 범례 라벨링 영역
mixedBarChart.charge.label = '충전';
mixedBarChart.wait.label = '대기';
mixedBarChart.off.label = '방전';
mixedBarChart.discon.label = '미연결';
mixedBarChart.broken.label = '고장';
mixedBarChart.err.label = '오류';
mixedBarChart.usage.label = '사용률';


mixedBarChart.charOptions.lvDet=false;


// 일선택
mixedChartDay.prevCharge.label='전일 충전량';
mixedChartDay.charge.label='일 충전량';
mixedChartDay.off.label='전일 방전량';
mixedChartDay.prevOff.label='방전량';


// 월선택
mixedChartMon.prevCharge.label='전일 충전량(kWh)';
mixedChartMon.charge.label='충전량(kWh)';
mixedChartMon.off.label='방전량(kWh)';
mixedChartMon.prevOff.label='전일 방전량(kWh)';


// 스택설정
mixedChartMon.prevCharge.stack='stack0';
mixedChartMon.charge.stack='stack1';
mixedChartMon.off.stack='stack1';
mixedChartMon.prevOff.stack='stack0';


mixedChartDay.prevCharge.stack='stack1';
mixedChartDay.charge.stack='stack2';
mixedChartDay.off.stack='stack1';
mixedChartDay.prevOff.stack='stack2';



// 차트 타입 변경
mixedBarChart.usage.type = 'line';
mixedBarChart.charOptions.yRight = true;
mixedBarChart.usage.yAxisID = 'y-right';



// 컬러 설정영역/ 스타일 설정영역
mixedBarChart.charge.backgroundColor = '#4D5BD4';
mixedBarChart.wait.backgroundColor = '#00D2B9';
mixedBarChart.off.backgroundColor = '#EFC26A';
mixedBarChart.discon.backgroundColor = '#ccc';
mixedBarChart.err.backgroundColor = '#FF5ADB';
mixedBarChart.broken.backgroundColor = '#E63312';
mixedBarChart.usage.borderColor = '#00AAD2';
mixedBarChart.usage.pointBackgroundColor = '#00AAD2';
mixedBarChart.usage.pointRadius = 0;



// 일선택
mixedChartDay.charge.backgroundColor='#4D5BD4';
mixedChartDay.off.backgroundColor='#EF726A';
mixedChartDay.prevCharge.backgroundColor='#7E7F8E';
mixedChartDay.prevOff.backgroundColor='#BC8884';
mixedChartDay.off.mark='kWh';
mixedChartDay.charge.mark='kWh';

// 월선택

mixedChartMon.charOptions.labelShow=true;
mixedChartMon.charge.backgroundColor='#4D5BD4';
mixedChartMon.off.backgroundColor='#EF726A';
mixedChartMon.prevCharge.backgroundColor='#AFB8FF';
mixedChartMon.prevOff.backgroundColor='#FFB4AF';
mixedChartMon.off.mark='kWh';
mixedChartMon.charge.mark='kWh';

mixedChartDay.prevCharge.skipNull=true;
mixedChartDay.off.skipNull=true;
mixedChartDay.charge.skipNull=true;
mixedChartDay.prevOff.skipNull=true;

// 보더설정
mixedChartDay.prevCharge.borderWidth=2;
mixedChartDay.off.borderWidth=2;
mixedChartDay.charge.borderWidth=2;
mixedChartDay.prevOff.borderWidth=2;
// 보더설정
mixedChartMon.prevCharge.borderWidth=2;
mixedChartMon.off.borderWidth=2;
mixedChartMon.charge.borderWidth=2;
mixedChartMon.prevOff.borderWidth=2;

mixedChartDay.prevCharge.borderColor='transparent';
mixedChartDay.off.borderColor='transparent';
mixedChartDay.charge.borderColor='transparent';
mixedChartDay.prevOff.borderColor='transparent';

mixedChartMon.prevCharge.borderColor='transparent';
mixedChartMon.off.borderColor='transparent';
mixedChartMon.charge.borderColor='transparent';
mixedChartMon.prevOff.borderColor='transparent';



// 툴팁 설정영역
mixedBarChart.charOptions.toolDet = true;
mixedBarChart.charOptions.lvDet = false;

// Y범례 단위설정 및 Y축 설정
mixedBarChart.charOptions.lv = '대';
mixedBarChart.charOptions.lvRight = '%';
mixedChartDay.charOptions.lv = 'kWh';

// 스텝사이즈 설정
mixedBarChart.charOptions.stepSize = 5;


// 데이터 설정영역 **********************************개발 세팅영역******************************
// 일 선택 데이터
mixedChartDay.labels=Array(24).fill(0).map((_,i)=>i+1);
mixedChartDay.charge.data=dataReturn(600,0).map((m,i)=>i<10 || i>21 ?  m : m*0);
mixedChartDay.off.data=dataReturn(600,0).map((m,i)=>i>=9 && i<22? m*-1 : m*0 );
mixedChartDay.prevCharge.data=dataReturn(600,0).map((m,i)=>i<10 || i>21 ?  m : m*0);
mixedChartDay.prevOff.data=dataReturn(600,0).map((m,i)=>i>9 && i<22? m*-1 : m*0 );

// 툴팁에 나오는 날짜, 시간 설정  (데이터의 length와 동일하게 설정 :: 배열로 들어오니 세팅 전 한번 확인해주세요!)
// 배열로 설정한 이유 : 호버시 범례마다 날짜, 시간 데이터가 다를 수 있기때문
mixedChartDay.charOptions.times =Array(24).fill('2024.07.09 12:23:59');

// 월 선택 데이터
mixedChartMon.labels=Array(24).fill(0).map((_,i)=>i+1);
mixedChartMon.charge.data=dataReturn(600,0).map(m=>m*-1 );
mixedChartMon.off.data=dataReturn(600,0).map(m=>m*-1 );
mixedChartMon.prevCharge.data=dataReturn(600,0).map(m=>m*-1 );
mixedChartMon.prevOff.data=dataReturn(600,0).map(m=>m*-1);

// 툴팁에 나오는 날짜, 시간 설정  (데이터의 length와 동일하게 설정 :: 배열로 들어오니 세팅 전 한번 확인해주세요!)
// 배열로 설정한 이유 : 호버시 범례마다 날짜, 시간 데이터가 다를 수 있기때문
mixedChartMon.charOptions.times =Array(24).fill('10월 2W 일');



mixedBarChart.labels=Array(24).fill(0).map((_,i)=>i+1);
mixedBarChart.charge.data=dataReturn(100,0);
mixedBarChart.wait.data=dataReturn(30,0);
mixedBarChart.off.data=dataReturn(30,0);
mixedBarChart.err.data=dataReturn(30,0);
mixedBarChart.broken.data=dataReturn(5,0);
mixedBarChart.discon.data=dataReturn(10,0);
mixedBarChart.usage.data=dataReturn(100,0);
// 데이터 설정영역 **********************************개발 세팅영역****************************** 끝

// 차트 그리기
mkChart(mixedBarChartArea,mixedBarChart);
let nowChart = mkChart(mixedChartArea,mixedChartDay);


$('.sel_date').change(function() {
    let now = $(this).val();
    nowChart.destroy();
    now =='month'?
    nowChart= mkChart(mixedChartArea,mixedChartMon)
    :
    nowChart = mkChart(mixedChartArea,mixedChartDay);
})


