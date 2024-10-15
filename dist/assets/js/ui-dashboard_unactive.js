import {mkChart,enFlow, spendChart, selfChart, mixedBarChart} from './ui-functions.js';


// 다이어그램 설정영역 (여기서 플로우시 컬러 , 디렉션 조절 가이드 참고 )
enFlow.evc.color = 'blue';
enFlow.ev.color = 'blue';
enFlow.home.color = 'red';

// unactive시 상태 추가 (active시 해당 요소 자체가 없거나 '' 빈칸으로 작성)
enFlow.pv.state = 'unactive';
enFlow.home.state = 'unactive';
enFlow.ev.state = 'unactive';
// enFlow.meter.state = 'unactive';

enFlow.show();

// 다이어그램 클릭 설정영역
$('.energy-flow article .flow-data').click(function(){ 
    enFlow.layPop($(this));
})

// chart.js영역
const electArea = document.querySelector('.elec-chart');
const spendArea = document.querySelector('.spend-elect');
const selfArea = document.querySelector('.self-elect');

// UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)
const dataReturn = (max, min) => {
  let arr = Array(24).fill(0).map(m => m = (Math.floor(Math.random() * max) + min));
  return arr;
}
//UI용 임시 데이터 세팅 함수(개발 시 완전 삭제)


// 1. 기간별 생산전력/ 소비전력/ 지급률
// 데이터 선언
mixedBarChart.self={};
mixedBarChart.essOff={};
mixedBarChart.evOff={};
mixedBarChart.pvElect={};
mixedBarChart.essCharge={};
mixedBarChart.evCharge={};
mixedBarChart.spendEl={};
mixedBarChart.ehp={};

mixedBarChart.essOff.stack='stack0';
mixedBarChart.evOff.stack='stack0';
mixedBarChart.pvElect.stack='stack0';
mixedBarChart.essCharge.stack='stack1';
mixedBarChart.spendEl.stack='stack1';
mixedBarChart.ehp.stack='stack1';
mixedBarChart.evCharge.stack='stack1';

// 라벨설정
mixedBarChart.essOff.label='ESS방전';
mixedBarChart.evOff.label='EV방전';
mixedBarChart.pvElect.label='PV발전';
mixedBarChart.essCharge.label='ESS충전';
mixedBarChart.evCharge.label='EV충전';
mixedBarChart.spendEl.label='소비전력(건물)';
mixedBarChart.ehp.label='EHP';
mixedBarChart.self.label='자급율';

//컬러설정
mixedBarChart.essOff.backgroundColor='#4D5BD4';
mixedBarChart.evOff.backgroundColor='#4DABD4';
mixedBarChart.pvElect.backgroundColor='#68E5E5';
mixedBarChart.essCharge.backgroundColor='#BF3F3F';
mixedBarChart.evCharge.backgroundColor='#E76D29';
mixedBarChart.spendEl.backgroundColor='#FEAF38';
mixedBarChart.ehp.backgroundColor='#FFD749';
mixedBarChart.self.borderColor='#00AAD2';
mixedBarChart.essOff.hoverBackgroundColor='#4D5BD4';
mixedBarChart.evCharge.hoverBackgroundColor='#E76D29';
mixedBarChart.pvElect.hoverBackgroundColor='#68E5E5';

// 라벨 show/hide
mixedBarChart.charOptions.labelShow=true;
mixedBarChart.charOptions.checked=true;
mixedBarChart.charOptions.title='기간별 생산전력 / 소비전력 / 자급율';
mixedBarChart.charOptions.yRight=true;
mixedBarChart.charOptions.lv='kWh';
mixedBarChart.charOptions.lvRight='%';

// 눈금 사이즈 단위설정 (수정됨 : 줄 수 기준)
mixedBarChart.charOptions.stepSize=4;


// 라인차트 설정
mixedBarChart.self.type='line';

// 라인차트 포인트 설정
mixedBarChart.self.pointRadius= 1;
mixedBarChart.self.pointBackgroundColor= '#00AAD2';
mixedBarChart.self.pointHoverRadius= 5;
mixedBarChart.self.pointHoverBackgroundColor='#00AAD2';


// 라인차트 y-right 범례 설정
mixedBarChart.self.yAxisID= 'y-right';


// 2. 전력소비량 (오늘)
spendChart.bld = {};
spendChart.evc = {};
spendChart.ess = {};
spendChart.ehp = {};
spendChart.evcNeg = {};
spendChart.essNeg = {};

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



// 차트 데이터 세팅 영역 (****************************개발 시 데이터 세팅 영역 *******************************)
// 1. 기간별 생산전력/ 소비전력/ 지급률- 라벨세팅
mixedBarChart.labels= Array(24).fill(0).map((_, i) => i + 1);
// ESS방전 데이터
mixedBarChart.essOff.data=dataReturn(1000, 0);
// EV방전 데이터
mixedBarChart.evOff.data=dataReturn(1000, 0);
// PV방전 데이터
mixedBarChart.pvElect.data=dataReturn(1000, 0);
// ESS충전 데이터
mixedBarChart.essCharge.data=dataReturn(1000, 0);
// EV충전 데이터
mixedBarChart.evCharge.data=dataReturn(1000, 0);
//EHP데이터
mixedBarChart.ehp.data=dataReturn(1000, 0);
// 소비전력(건물) 데이터
mixedBarChart.spendEl.data=dataReturn(1000, 0);
//자급율 데이터
mixedBarChart.self.data=dataReturn(100, 0);


// 2. 전력소비량 (오늘)
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


//3. 자급률 (오늘)
//데이터 세팅 (세팅방법 : 맨 앞쪽은 데이터값, 뒤는 100- 데이터값  예) 70퍼센트라고 하면, [70, 100-70])
selfChart.self.data = [80, 100 - 80];
//도넛 가운데 텍스트 세팅
selfChart.charOptions.innerText = '75%';
// 차트 데이터 세팅 영역 (****************************개발 시 데이터 세팅 영역 ***********끝*******************)




// 차트 그리기  (mkChart라는 함수 씀 사용법: mkChart(캔버스돔, 옵션값))
// 기간별 생산전력/소비전력/자급율 
let eChart = mkChart(electArea, mixedBarChart);
// 전력소비량(오늘)차트
let spChart = mkChart(spendArea, spendChart);
// 자급율(오늘)차트
let sChart = mkChart(selfArea, selfChart);



// 기간별 생산전력/소비전력/자급율 select옵션 변경 시 인터렉션 
$('.sel_date').change(function() {
  // 시작 시 전체 카테고리 checked set
  $('input[name="board-bottom"]').prop('checked', true);
  // 일, 월, 년 기준 데이터 라벨입력
  $(this).val() === '월' ?
    // 월 선택 시 차트 라벨세팅 (UI임시용 // 개발에 맞게 수정필요)
    mixedBarChart.labels = Array(12).fill(0).map((_, i) => i + 1) :
    $(this).val() === '일' ?
    // 일 선택 시 차트 라벨세팅 (UI임시용 // 개발에 맞게 수정필요)
    mixedBarChart.labels = Array(24).fill(0).map((_, i) => i + 1) :
    // 년 선택 시 차트 라벨세팅 (UI임시용 // 개발에 맞게 수정필요)
    mixedBarChart.labels = Array(5).fill(0).map((_, i) => 2019 + i + 1);

  // 차트 다시 그릴 경우 destory필수!
  eChart.destroy();
  
  // 다음에 다시 그리기
  eChart = mkChart(electArea, mixedBarChart);
})

// 체크박스 체크 인터렉션 생산,소비,자급률 넣고 뺄때
$('input[name="board-bottom"]').change(function() {
  let idx = ($(this).parent().index() + 1) % 3;
  $(this).prop('checked') ? eChart.show(idx) : eChart.hide(idx);
  eChart.update();
})
// 차트 인터렉션 영역 끝!




// 대시보드 헤더 인터렉션
$(function(){
  const ham = $('.ham');
  // 대시보드 헤더용 인터렉션
  ham.click(function() {
    $(this).parent().parent().addClass('open');
    $('.dimmed').css({
      zIndex:3,
      display:'block'
    });
    $('.energy-flow').css('z-index',0);

    $('.dimmed').animate({
      'opacity': 1,
    }, 500)
  })

  $('.dimmed').click(function() {
    $('.hdrtop-wrap').removeClass('open');
    $('.dimmed').animate({
      'opacity': 0,
      'z-index': -1
    }, 500)
  })
});