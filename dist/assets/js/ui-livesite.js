import {mkChart,enFlow,spendChart,mixedBarChart} from './ui-functions.js';


// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {
  let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));
  return arr;
}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)


// 다이어그램 설정영역 (여기서 플로우시 컬러 , 디렉션 조절 가이드 참고 )
enFlow.evc.color = 'blue';
enFlow.ev.color = 'blue';
enFlow.home.color = 'blue';
enFlow.show();

// 다이어그램 클릭 설정영역
$('.energy-flow article .flow-data').click(function() {
  enFlow.layPop($(this));
})

// chart.js영역
const spendArea = document.querySelector('.spend-elect');
const mixedBarArea = document.querySelector('.mixed-bar-chart');

// 1. 누적 소비 전력량
// 2. 전력소비량 (오늘)
//데이터세팅
spendChart.ehp = {};
spendChart.ess = {};
spendChart.evcNeg = {};
spendChart.essNeg = {};
spendChart.evc = {};
spendChart.bld = {};

// 스텝값 나누기
spendChart.charOptions.divStep = 4

// 데이터 기초 세팅
spendChart.ehp.data = Array(3).fill(0);
spendChart.ess.data = Array(3).fill(0);
spendChart.evcNeg.data = Array(3).fill(0);
spendChart.essNeg.data = Array(3).fill(0);
spendChart.evc.data = Array(3).fill(0);
spendChart.bld.data = Array(3).fill(0);
spendChart.evcNeg.data = Array(3).fill(0);
spendChart.essNeg.data = Array(3).fill(0);
spendChart.labels=Array(3).fill(0);



spendChart.bld.backgroundColor = '#4DD4A3';
spendChart.evc.backgroundColor = '#B062CC';
spendChart.ehp.backgroundColor = '#59B1E2';
spendChart.ess.backgroundColor = '#FFA959';
spendChart.evcNeg.backgroundColor = '#8C45A5';
spendChart.essNeg.backgroundColor = '#DA8739';
spendChart.bld.hoverBackgroundColor = '#4DD4A3';
spendChart.evc.hoverBackgroundColor = '#B062CC';
spendChart.ehp.hoverBackgroundColor = '#59B1E2';
spendChart.ess.hoverBackgroundColor = '#FFA959';
spendChart.evcNeg.hoverBackgroundColor = '#8C45A5';
spendChart.essNeg.hoverBackgroundColor = '#DA8739';

spendChart.bld.label = '빌딩';
spendChart.evc.label = 'EVC';
spendChart.ehp.label = 'EHP';
spendChart.ess.label = 'ESS';
spendChart.evcNeg.label = '#8C45A5';
spendChart.essNeg.label = '#DA8739';
spendChart.opts.barThickness = '30';


// 2.전력 소비 현황
// 라벨세팅 구간
mixedBarChart.charOptions.title='';
mixedBarChart.charOptions.labelShow=true;
mixedBarChart.charOptions.checked=true;
mixedBarChart.charOptions.toolDet=true;
mixedBarChart.charOptions.lvDet=true;
mixedBarChart.charOptions.lvDetByStack=true;


// 라벨에 들어간것은 더미데이터용 임시함수임 :: 실제 개발 시 삭제
mixedBarChart.labels = Array(24).fill(0).map((_, i) => i + 1);


// 차트 데이터 기본 세팅
mixedBarChart.pvEle={};
mixedBarChart.self={};
mixedBarChart.essOff={};
mixedBarChart.evOff={};
mixedBarChart.pvEle={};
mixedBarChart.essCharge={};
mixedBarChart.evCharge={};
mixedBarChart.site={};

//  바 두께 설정
mixedBarChart.opts.barThickness= 20;

// 범례설정
mixedBarChart.charOptions.yRight=true;

mixedBarChart.pvEle.yAxisID= 'y-right';
mixedBarChart.self.yAxisID= 'y-right';

mixedBarChart.charOptions.lv='kWh'
mixedBarChart.charOptions.lvRight='%'

// 차트 데이터 범주 설정
mixedBarChart.essOff.label='ESS방전';
mixedBarChart.evOff.label='EV방전';
mixedBarChart.pvEle.label='PV발전';
mixedBarChart.essCharge.label='ESS충전';
mixedBarChart.evCharge.label='EV충전';
mixedBarChart.site.label='사이트';
mixedBarChart.pvEle.label='PV발전량';
mixedBarChart.self.label='자급율';



// 스택 혹은 카테고리 별 툴팁 노출
mixedBarChart.essOff.cate='stack0';
mixedBarChart.evOff.cate='stack0';
mixedBarChart.essCharge.cate='stack1';
mixedBarChart.evCharge.cate='stack1';
mixedBarChart.site.cate='stack1';

// 차트 타입 변경 (소비전력량)
mixedBarChart.pvEle.type = 'line';
mixedBarChart.self.type = 'line';


mixedBarChart.self.pointRadius= 1;
mixedBarChart.pvEle.pointRadius= 1;


mixedBarChart.pvEle.pointHoverRadius= 5;
mixedBarChart.self.pointHoverRadius= 5;

mixedBarChart.pvEle.pointBackgroundColor= '#4D5BD4';
mixedBarChart.self.pointBackgroundColor= '#00AAD2';


mixedBarChart.pvEle.borderColor= 'rgb(77, 91, 212)';
mixedBarChart.self.borderColor= '#00AAD2';


mixedBarChart.pvEle.pointRadius= 1;
mixedBarChart.self.pointRadius= 1;



mixedBarChart.essOff.skipNull=true;
mixedBarChart.evOff.skipNull=true;
mixedBarChart.pvEle.skipNull=true;
mixedBarChart.essCharge.skipNull=true;
mixedBarChart.evCharge.skipNull=true;
mixedBarChart.site.skipNull=true;


// // 툴팁 노출 설정
// mixedBarChart.spendEl.mark='kWh';

// 데이터 컬러설정
mixedBarChart.essOff.backgroundColor="#4D5BD4";
mixedBarChart.evOff.backgroundColor="#4DABD4";
mixedBarChart.pvEle.backgroundColor="#68E5E5";
mixedBarChart.essCharge.backgroundColor="#BF3F3F";
mixedBarChart.evCharge.backgroundColor="#E76D29";
mixedBarChart.site.backgroundColor="#FEAF38";
mixedBarChart.pvEle.backgroundColor="#4D5BD4";
mixedBarChart.self.backgroundColor="#00AAD2";

// 차트 데이터 세팅 영역 (****************************개발 시 데이터 세팅 영역 **********************)
// 1. 누적 소비 전력량
// 맨 앞 호버시 툴팁에 합산 %들어가는 곳 
spendChart.charOptions.per=40;
// 건물
spendChart.bld.data[0]=10;
// EHP
spendChart.ehp.data[0]=12;
// ESS
spendChart.ess.data[2]=5;
// ESS음수값
spendChart.essNeg.data[2]=-28;
// EVC (EVC의 경우 맨 앞 토탈값이 0번째, EVC중간위치가 1번째이므로 두개 같은 데이터 입력)
spendChart.evc.data[0]=20;
spendChart.evc.data[1]=20;
// EVC음수값
spendChart.evcNeg.data[1]=-20;


// 2.전력소비현황
// ESS방전
mixedBarChart.essOff.data=dataReturn(2000,0).map(m=>m*-1);
// EV방전
mixedBarChart.evOff.data=dataReturn(2000,0).map(m=>m*-1);
// PV발전량
mixedBarChart.pvEle.data=dataReturn(2000,0).map(m=>m*-1);
// ESS충전
mixedBarChart.essCharge.data=dataReturn(2000,0);
// EV충전
mixedBarChart.evCharge.data=dataReturn(2000,0);
// 사이트
mixedBarChart.site.data=dataReturn(2000,0);
// PV발전
mixedBarChart.pvEle.data=dataReturn(100,0);

// 자급율
mixedBarChart.self.data=dataReturn(100,0);

// 차트 데이터 세팅 영역 (****************************개발 시 데이터 세팅 영역 ***********끝*******************)



// 차트 그리기
mkChart(spendArea, spendChart);
mkChart(mixedBarArea, mixedBarChart);
