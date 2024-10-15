import {mkChart,mixedNegChart,boxPlotChart,enFlow,lineChart,mkTimeline,timeChart, deepCopy, mkRepChart, annotation, times} from "./ui-functions.js";

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {
  let arr = Array(24).fill(0).map(m => Array(3).fill(0).map(m => m = (Math.floor(Math.random() * max) + min)));
  console.log('boxplot에 들어가는 값 형태');
  console.log(arr);
  return arr;
}
const dataReturn2 = (max, min) => {
  let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));
  return arr;
}
// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)!!! 끝!!



// 다이어그램 설정영역 (여기서 플로우시 컬러 , 디렉션 조절 가이드 참고 )
enFlow.evc.color = 'blue';
enFlow.ev.color = 'red';
enFlow.home.color = 'blue';
enFlow.home.dir = 'rev';
enFlow.show();

// 다이어그램 클릭 설정영역
$('.energy-flow article .flow-data').click(function() {
  enFlow.layPop($(this));
})

// 다이어그램 플로우 함수 끝
let boxPlotArea = document.querySelector('.box-plot-chart');
let mixedNegArea = document.querySelector('.mixed-neg-chart');
let evcArea = document.querySelectorAll('.mixed-neg-chart.evc');
let lineChartArea = document.querySelector('.line-chart');

// init 바 굵기 공통 설정
mixedNegChart.opts.barThickness= 20

// mixedNegChart가 늘어날때마다 mixedNegChart 자체를 다른 object에 딥카피해야함
let mixedNegChart1 = deepCopy(mixedNegChart);
let mixedNegChart2 = [];

evcArea.forEach(e=>{
  mixedNegChart2.push(deepCopy(mixedNegChart));
})


// 박스플롯 오브젝트 선언
boxPlotChart.frequency = {};
boxPlotChart.frequency.data = {};
// 박스플롯 스타일 설정 영역
boxPlotChart.frequency.backgroundColor = '#4D5BD4';
boxPlotChart.frequency.borderColor = '#4D5BD4';
boxPlotChart.frequency.borderWidth = '1';
boxPlotChart.frequency.outlierColor = 'red';
boxPlotChart.frequency.meanRadius = '0';

// 바 굵기 공통설정
boxPlotChart.opts.barThickness= 20

// 전력소비량/PV발전/EV발전량 위치
mixedNegChart1.building = {};
mixedNegChart1.pvElect = {};
mixedNegChart1.evCharge = {};
mixedNegChart1.evOff = {};
mixedNegChart1.essCharge = {};
mixedNegChart1.essOff = {};
mixedNegChart1.evPeack = {};
mixedNegChart1.essPeack = {};

// 전력소비량 /PV발전/EV발전량 스타일 설정
mixedNegChart1.opts.scales.y.ticks.stepSize = 200;
mixedNegChart1.building.label = '건물';
mixedNegChart1.pvElect.label = 'PV발전량';
mixedNegChart1.evCharge.label = 'EV충전량';
mixedNegChart1.evOff.label = 'EV방전량';
mixedNegChart1.essCharge.label = 'ESS충전량';
mixedNegChart1.essOff.label = 'ESS방전량';
mixedNegChart1.evPeack.label = 'EV Peak cut';
mixedNegChart1.essPeack.label = 'ESS Peak cut';

mixedNegChart1.building.mark ='kWh';
mixedNegChart1.pvElect.mark = 'kWh';
mixedNegChart1.evCharge.mark = 'kWh';
mixedNegChart1.evOff.mark = 'kWh';
mixedNegChart1.essCharge.mark = 'kWh';
mixedNegChart1.essOff.mark = 'kWh';
mixedNegChart1.evPeack.mark = 'kWh';
mixedNegChart1.essPeack.mark = 'kWh';

mixedNegChart1.building.backgroundColor = '#4DD4A3';
mixedNegChart1.pvElect.backgroundColor = '#00AAD2';
mixedNegChart1.evCharge.backgroundColor = '#B062CC';
mixedNegChart1.evOff.backgroundColor = '#723787';
mixedNegChart1.essCharge.backgroundColor ='#FFA959';
mixedNegChart1.essOff.backgroundColor = '#B17237';
mixedNegChart1.evPeack.backgroundColor = '#78BE33';
mixedNegChart1.essPeack.backgroundColor = '#FF8412';

mixedNegChart1.charOptions.title='';
mixedNegChart1.charOptions.labelShow=true;



// EVC충전/방전 
mixedNegChart2.forEach(mixedNegChart2=>{
// EVC충전/방전 변수
mixedNegChart2.charge = {};
mixedNegChart2.discharge = {};

  // 배경컬러 설정
  mixedNegChart2.charge.backgroundColor ='#4D5BD4';
  mixedNegChart2.discharge.backgroundColor ='#B062CC';
  mixedNegChart2.discharge.borderWidth =0;
  mixedNegChart2.charge.borderWidth =0;
  
  // 타이틀 설정
  mixedNegChart2.charge.label ='충전';
  mixedNegChart2.discharge.label ='방전';
  mixedNegChart2.charge.mark ='kWh';
  mixedNegChart2.discharge.mark ='kWh';
})


// 라인 차트 
lineChart.maxEle = {};
lineChart.goalEle = {};

// 라인차트 옵션 설정
lineChart.opts.scales.y.ticks.stepSize = 1000;
lineChart.opts.interaction.mode = null;
lineChart.maxEle.label = '최대 소비전력';
lineChart.goalEle.label = '목표전력';
lineChart.goalEle.pointRadius = 0;
lineChart.maxEle.pointRadius = 0;
lineChart.goalEle.borderColor = '#EF726A';
lineChart.maxEle.borderColor = '#4D5BD4';

// Y축 범례 라벨 설정
lineChart.charOptions.lv = 'kW';


// 타임스탬프 공간 생성 (mixed chart 내 타임스탬프)
lineChart.opts.plugins.annotation={};
lineChart.opts.plugins.annotation.annotations=annotation;

// 타임스탬프 checkbox 사용 및  타이틀 등록
lineChart.charOptions.anno=true;
lineChart.charOptions.annoTitle='peack-cut';

annotation.peakCut=deepCopy(annotation.init);
annotation.peakCut2=deepCopy(annotation.init);

annotation.peakCut.borderColor='#5EBB4F';
annotation.peakCut.borderWidth=1;
annotation.peakCut2.borderColor='#5EBB4F';
annotation.peakCut2.borderWidth=1;

annotation.peakCut.contents=['', '00:00:12'];
annotation.peakCut2.contents=['', '08:50:12'];




// 데이터 세팅 구간 **********************************개발 수정 영역*******************************************
// 1. 전력 소비량 / PV 발전 / EV 방전량
// 라벨세팅 (X축 범례)
mixedNegChart1.labels = Array(24).fill(0).map((_, i) => i + 1);
mixedNegChart1.building.data = dataReturn2(300,0).map((m,i)=>i < 14 ? m :0);
mixedNegChart1.pvElect.data = dataReturn2(200,0).map((m,i)=>i < 4 ? m :0);
mixedNegChart1.evCharge.data = dataReturn2(200,0).map(_=>0);
mixedNegChart1.evOff.data = dataReturn2(200,0).map((m,i)=>i < 11 ? m : m*-1);
mixedNegChart1.essCharge.data =dataReturn2(200,0).map(_=>0);
mixedNegChart1.essOff.data = dataReturn2(200,0).map((m,i)=> i> 10 ? m*-1:0);
mixedNegChart1.evPeack.data = dataReturn2(200,0).map(_=>0);
mixedNegChart1.essPeack.data = dataReturn2(200,0).map(_=>0);



// 2. 전력피크
// 라벨세팅 (X축 범례)
lineChart.labels = Array(24).fill(0).map((_, i) => i);
// 목표전력
lineChart.goalEle.data = Array(24).fill(2000);
// 최대소비전력
lineChart.maxEle.data = dataReturn2(1500, 0);


// 3. 충전시간 : 박스플롯
// 라벨세팅 (X축 범례)
boxPlotChart.labels = Array(24).fill(0).map((_, i) => i + 1);
// 전압 or 주파수 or 역율
// 데이터 넣는 방법 
// boxPlotChart.frequency.data =[
// 1개의 배열이 1개의 라벨(X축 범례 값임), 배열 안에는 1,2,3순서로 3개의 숫자를 넣을 수 있음 . 각 min mideian max값임 
//   [1,2,3]
// 만약, 라벨 배열수가 1~24라면, 위와같은 [1,2,3]배열형태가 24개가 추가로 필요하다
// 예)
// [1,2,3],[1,2,3],[1,2,3],[1,2,3] ....... [1,2,3]
// 임시로 집어넣은 데이터는 콘솔에 찍어놨습니다! 참고 부탁드립니다.
// ]
boxPlotChart.frequency.data = dataReturn(80, -40);


//3. 개별 EVC
// EVC의 모듈이 늘어나는 수만큼 index값을 넣어서 데이터를 설정하면 됩니다.
// 예  EVC3가 있다면 ? mixedNegChart2[2].discharge.data= 데이터 설정 

// EVC1
// 라벨세팅 (X축 범례)
mixedNegChart2[0].labels = Array(24).fill(0).map((_,i)=>i+1);
// 충전
mixedNegChart2[0].charge.data =  dataReturn2(300, 0).map((m, i) => i>10 ?  m*-1 : m);
// 방전
mixedNegChart2[0].discharge.data =  dataReturn2(300, 0).map((m, i) => i>10 ?  m*-1 : m);

// EVC2
// 라벨세팅 (X축 범례)
mixedNegChart2[1].labels = Array(24).fill(0).map((_,i)=>i+1);
// 충전
mixedNegChart2[1].charge.data =  dataReturn2(200, 0).map((m, i) => i>10 ?  m*-1 : m);
// 방전
mixedNegChart2[1].discharge.data =  dataReturn2(200, 0).map((m, i) => i>10 ?  m*-1 : m);

// 데이터 세팅 구간 **********************************개발 수정 영역 끝!!*******************************************
// 그리기 구간 
let mixedChart = mkChart(mixedNegArea, mixedNegChart1);
let linechart = mkChart(lineChartArea, lineChart);
let boxplot = mkChart(boxPlotArea, boxPlotChart);

// 딥카피 차트 그리기
let evcChart=mkRepChart(evcArea, mixedNegChart2, true);



// UI테스트용 이벤트 :: 충전시간 (box-plot 그래프) radio선택별로 데이터 세팅 (:: UI용 임시로 개발 시 삭제해주세요!) :+:+:+:+:+:+:+:
$('[name="chargeSel"]').change(function() {
  boxPlotChart.frequency.data = dataReturn(80, -40);
  // 선택에따라서 다시 그릴경우 기존 그래프 삭제!
  boxplot.destroy();
  // 삭제 후 다시 그리기!
  boxplot = mkChart(boxPlotArea, boxPlotChart);
});
// UI테스트용 이벤트 :: 충전시간 radio선택별로 데이터 세팅 (:: UI용 임시로 개발 시 삭제해주세요!) --끝!!:+:+:+:+:+:+:+:



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

// 라벨 보여주기 세팅
tmChart1.ev1.labelShow=true;
tmChart1.ev2.labelShow=true;
tmChart1.ev3.labelShow=true;
tmChart2.ev1.labelShow=true;
tmChart2.ev2.labelShow=true;
tmChart2.ev3.labelShow=true;

// **********************데이터 설정 , 개발 설정영역 ***********************

// 호버 툴팁 설정 :: dt 파라미터내에서 입력한 데이터 값을 들고올 수 있음! 필요한것을 txt형식으로 값 return하면 됨 (줄바꿈은 \n)
// 파라미터 중 st, end는 시간을 의미함 st: 시작시간 end: 끝시간 
tmChart1.options.tips= (dt,st,end)=>{
  // 시간계산은 따로 필요합니다. 참고 부탁드립니다.
  return `${dt.title} \n ${st} ~ ${end} (0${end.split(':')[0] - st.split(':')[0] }:00) \n ${dt.note}`
};

// 호버 툴팁 설정 :: dt 파라미터내에서 입력한 데이터 값을 들고올 수 있음! 필요한것을 txt형식으로 값 return하면 됨(줄바꿈은 \n)
// 파라미터 중 st, end는 시간을 의미함 st: 시작시간 end: 끝시간 
tmChart2.options.tips= (dt,st,end)=>{ 
  // 시간계산은 따로 필요합니다. 참고 부탁드립니다.
  return `${dt.title} \n ${st} ~ ${end} (0${end.split(':')[0] - st.split(':')[0] }:00) \n ${dt.note}`
};




// 각 타임모듈 라벨명 (툴팁 타이틀 설정)
// EVC1
tmChart1.ev1.title='EV1';
tmChart1.ev2.title='EV2';
tmChart1.ev3.title='EV3';

// 각 타임모듈 라벨명 (툴팁 타이틀 설정)
//EVC2
tmChart2.ev1.title='EV1';
tmChart2.ev2.title='EV2';
tmChart2.ev3.title='EV3';

// 타임라인 카테고리 설정 :: 카테고리 명을 배열 형태로 입력하면 됨 위=>아래 순서
// EVC1
tmChart1.options.category=[1,2];
// EVC2
tmChart2.options.category=[1,2,3,4]

// 각 타임모듈 툴팁에서 추가로 들어갈 내용 (시간 외)
// EVC1
tmChart1.ev1.note='충전 100kWh \n 방전 100kWh';
tmChart1.ev2.note='충전 100kWh \n 방전 100kWh';
tmChart1.ev3.note='충전 100kWh \n 방전 100kWh';

// EVC2
tmChart2.ev1.note='충전 100kWh \n 방전 100kWh';
tmChart2.ev2.note='충전 100kWh \n 방전 100kWh';
tmChart2.ev3.note='충전 100kWh \n 방전 100kWh';

// 타임모듈 시작 시간설정 (hh:mm:ss)? 툴팁 노출에따라서 hh:mm or hh:mm:ss 사용가능
// EVC1
tmChart1.ev1.start=['01:00:00'];
tmChart1.ev3.start=['02:00:00'];
tmChart1.ev2.start=['13:00:00'];

// EVC2
tmChart2.ev1.start=['01:00:00'];
tmChart2.ev2.start=['09:00:00'];
tmChart2.ev3.start=['07:00:00'];

// 타임모듈 끝시간 설정 (hh:mm)
// EVC1
tmChart1.ev1.end=['06:00:00'];
tmChart1.ev3.end=['09:00:00'];
tmChart1.ev2.end=['18:00:00'];

// EVC2
tmChart2.ev1.end=['06:00:00'];
tmChart2.ev2.end=['13:00:00'];
tmChart2.ev3.end=['14:00:00'];


// **********************데이터 설정 , 개발 설정영역 ***********************

// 설정 후 그리기 함수 사용 (데이터, 그릴 위치 dom)
// EVC1
mkTimeline(tmChart1,tm[0]);
// EVC2
mkTimeline(tmChart2,tm[1]);
