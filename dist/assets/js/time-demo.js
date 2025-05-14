import {mkTimeline,timeChart, times, deepCopy} from "./ui-functions.js";

// 타임라인 그려질 곳 
const tm = document.querySelectorAll('.chart-time-line');
// 타임차트 같은 페이지 내 반복 시 딥카피 필요!
let tmChart1 = deepCopy(timeChart);

// 바 굵기 설정(전체 그리드 높기 기준 -npx형식)
tmChart1.options.cut=10;
tmChart1.options.heights=50;
tmChart1.options.headerBg='#fce09b';
tmChart1.options.borderCol='#fffaf3';
tmChart1.options.background='#f7f1e1';

tmChart1.ev1={};
tmChart1.ev2={};
tmChart1.ev3={};
tmChart1.ev4={};
tmChart1.ev5={};
tmChart1.ev6={};


// 각 타임모듈 카테고리 위치 설정
// EVC1
tmChart1.ev1.category='바게트';
tmChart1.ev2.category='바게트';
tmChart1.ev3.category='바게트';
tmChart1.ev4.category='식빵';
tmChart1.ev5.category='쿠키';
tmChart1.ev6.category='쿠키';

// 타임모듈 컬러설정
// EVC1
tmChart1.ev1.background=`url('./dist/assets/images/common/bake1.png') repeat-x left/contain`;
tmChart1.ev2.background=`url('./dist/assets/images/common/bake2.png')  repeat-x  left/contain`;
tmChart1.ev3.background=`url('./dist/assets/images/common/bake3.png')  repeat-x  left/contain`;
tmChart1.ev4.background=`url('./dist/assets/images/common/bake4.png')  repeat-x  left/contain`;
tmChart1.ev5.background=`url('./dist/assets/images/common/bake2.png')  repeat-x  left/contain`;
tmChart1.ev6.background=`url('./dist/assets/images/common/bake1.png')  repeat-x  left/contain`;

// 라벨 보여주기 세팅
tmChart1.ev1.labelShow=true;
tmChart1.ev2.labelShow=true;
tmChart1.ev3.labelShow=true;
tmChart1.ev4.labelShow=true;
tmChart1.ev5.labelShow=true;
tmChart1.ev6.labelShow=true;

// **********************데이터 설정 , 개발 설정영역 ***********************

// 호버 툴팁 설정 :: dt 파라미터내에서 입력한 데이터 값을 들고올 수 있음! 필요한것을 txt형식으로 값 return하면 됨 (줄바꿈은 \n)
// 파라미터 중 st, end는 시간을 의미함 st: 시작시간 end: 끝시간 
tmChart1.options.tips= (dt,st,end)=>{
  return `${dt.title} \n 베이킹 시간: ${st} ~ ${end} \n ${dt.note}`
};


// 각 타임모듈 라벨명 (툴팁 타이틀 설정)
// EVC1
tmChart1.ev1.title='플레인 바게트';
tmChart1.ev2.title='갈릭바게트';
tmChart1.ev3.title='마요네즈 바게트';
tmChart1.ev4.title='밤식빵';
tmChart1.ev5.title='초코칩 쿠키';
tmChart1.ev6.title='까눌레';



// 타임라인 카테고리 설정 :: 카테고리 명을 배열 형태로 입력하면 됨 위=>아래 순서
// EVC1
tmChart1.options.category=['바게트','식빵','쿠키'];


// 각 타임모듈 툴팁에서 추가로 들어갈 내용 (시간 외)
// EVC1
tmChart1.ev1.note='알레르기 표시정보: 밀';
tmChart1.ev2.note='알레르기 표시정보: 마늘/밀';
tmChart1.ev3.note='알레르기 표시정보: 밀/우유/계란';
tmChart1.ev4.note='알레르기 표시정보: 밀/우유/계란';
tmChart1.ev5.note='알레르기 표시정보: 밀/우유/계란';
tmChart1.ev6.note='알레르기 표시정보: 밀/우유/계란';


// 타임모듈 시작 시간설정 (hh:mm:ss)? 툴팁 노출에따라서 hh:mm or hh:mm:ss 사용가능
// EVC1
tmChart1.ev1.start=['07:00:00'];
tmChart1.ev2.start=['10:30:00'];
tmChart1.ev3.start=['16:00:00'];
tmChart1.ev4.start=['13:00:00'];
tmChart1.ev5.start=['10:00:00'];
tmChart1.ev6.start=['20:10:00'];


// 타임모듈 끝시간 설정 (hh:mm)
// EVC1
tmChart1.ev1.end=['09:00:00'];
tmChart1.ev2.end=['14:00:00'];
tmChart1.ev3.end=['21:00:00'];
tmChart1.ev4.end=['17:30:00'];
tmChart1.ev5.end=['12:00:00'];
tmChart1.ev6.end=['02:00:00'];



// **********************데이터 설정 , 개발 설정영역 ***********************

// 설정 후 그리기 함수 사용 (데이터, 그릴 위치 dom)
// EVC1
mkTimeline(tmChart1,tm[0]);
