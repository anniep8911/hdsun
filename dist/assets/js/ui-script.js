$(function() {
  // gnb헤더 인터렉션 
  const cat = $('.categories .expand .ct-title');
  const catDet = $('.expand li');
  const catLi = document.querySelectorAll('.categories .expand ul');

  // gnb 확장시 세부 요소 높이 계산 :: 삭제금지
  catLi.forEach(e => {
    e.setAttribute('style', `--var-height:${48 * e.childElementCount + 16}px`)
  });


  // gnb클릭시 확장 함수
  cat.click(function(e) {
    e.stopPropagation();
    let flag = $(this).parent().attr('class').includes('open');
    flag ?
      $(this).parent().toggleClass('open') :
      (
        $('.categories .expand').removeClass('open'),
        $(this).parent().addClass('open')
      );
  });

  // 확장시 세부 내용 highlight 함수
  catDet.click(function() {
    catDet.removeClass('active');
    $(this).addClass('active');
  });



  // gbn헤더 인터렉션 끝 
  // 페이지네이션 인터렉션
  const page = $('.pagination .pg');
  page.click(function() {
    page.removeClass('active');
    $(this).addClass('active');
  });
  // 페이지네이션 인터렉션 끝


  // input활성화 인터렉션
  const srch = $('.search input');
  const txt = $('.input-txt');
  const clr = $('input+i.clear');
  // 인풋박스 이벤트 
  srch.keydown(function() {
    $(this).parent().attr('state', 'focus');
  });
  srch.focusout(function() {
    $(this).parent().attr('state', '');

  });
  txt.keydown(function() {
    $(this).attr('state', 'focus');
  });

  txt.children('input').focus(function() {
    let val = $(this)[0].value;
    val === '' ? '' : $(this).parent().attr('state', 'focus');
  })
  clr.click(function() {
    $(this).prev('input')[0].value = '';
  })
  txt.focusout(function(e) {
    $(this).attr('state', '');
  });

  // 사이트 찾기 이벤트
  // 사이트 찾기 검색결과 일치 단어 컬러변경 이벤트
  txt.keyup(function() {
    if ($(this).attr('auto-srch')) {
      let srWd = $(this).children('input').val();
      let lists = document.querySelectorAll('.addr .result li span.dts span:nth-of-type(1)');
      lists.forEach(e => {
        let txt = e.innerText.replace(srWd, `<b>${srWd}</b>`);
        e.innerHTML = txt;
      })
    }
  });
  // 컬러변경 이벤트 끝


  // 사이트 찾기 클릭 이벤트
  const fndSite = $('.site-find .input-txt');
  fndSite.click(function(e) {
    $(this).toggleClass('active');
  });

  // 사이트 찾기 상세 검색결과 클릭이벤트
  $('.addr .result li').click(function() {
    let srchName = $(this).children('span').children('span')[0].innerText;
    let srchAdd = $(this).children('span').children('span')[1].innerText;
    fndSite.removeClass('active');
    fndSite.children('span:nth-of-type(1)').text(srchName);
    fndSite.children('span:nth-of-type(2)').text(srchAdd);
    fndSite.children('span:nth-of-type(2)').addClass('selected');
  })

  // 모달 interaction
  const btn = $('button, .button, .btn, .btn-add');
  const btnModal = $('.modal-btn');

  // 모달창 show/hide 함수
  const modalHide = (modal) => {
    $('.modal').removeClass('active');
    $('.dimmed').css('display', 'none');
  }

  const modalShow = (modal) => {
    $('.modal').removeClass('active'),
      $(`${modal}`).addClass('active'),
      $('.dimmed').css({
        display: 'block',
        zIndex: 1,
        opacity: 1,
      });
  }

  btn.click(function(e) {
    e.stopPropagation();
    $(this).attr('target-modal') ? modalShow($(this).attr('target-modal')) : '';
  });

  btnModal.click(function(e) {
    e.stopPropagation();
    !$(this).attr('class').includes('notyet')?
    modalHide():'';
  });

  // 배경 클릭시 모달 제거 이벤트
  $('.dimmed').click(function(e){
    e.stopPropagation();
    $('.modal .btns .notyet').length ? '': modalHide();
  });
  
  $('.modal').click(function(e){
    e.stopPropagation();
  });
      
  // 모달 함수 끝


  // 대시보드 함수 
  // PV발전 퍼센트 바

  const per = $('.prog-bar .bar');

  per.each(function(i) {
    let percent = per.eq(i).children().text();
    percent ?
      (
        per.addClass('active'),
        $({
          per: 0
        }).animate({
          per: percent
        }, {
          duration: 500,
          progress: function() {
            let now = Math.floor(this.per);
            $('.prog-title').eq(i).text(now);
            $('.prog-data').eq(i).text(now+'%');
            per.eq(i).css('width', `${now}%`);
          }
        })
      ) : '';
  })

  // 로그인페이지 인터랙션
  $('.view').click(function() {
    $(this).attr('class') === 'view' ?
      (
        $(this).attr('class', 'hidden'),
        $(this).siblings('input').attr('type', 'text')
      ) :
      (
        $(this).attr('class', 'view'),
        $(this).siblings('input').attr('type', 'password')
      )
  });



  // 통계페이지의 유닛관련 함수입니다! 만약 필요없다면 전체 삭제해주시고 직접 쓰시면 됩니다.******************

  // 사용방법:  insertUnit(유닛에 들어갈텍스트, 체크박스 부모의(li의) 인덱스넘버)
  function insertUnit(txt, idx) {
    $('.results').addClass('active');
    const units = document.querySelector('p.units');
    let span = document.createElement('span');
    span.setAttribute('data-idx', idx);
    span.innerHTML = `${txt}<i class="table-clear"></i>`;
    units.append(span);

    // 유닛리스트 선택 내용 삭제 인터랙션
    $('.table-clear').click(function() {
      unitDel(e = $(this));
    })
  }


  // 유닛개수 체크 함수
  function leftCheck() {
    let left = $('p.units').children().length;
    return left;
  }

  // 유닛삭제 인터렉션
  function unitDel(e) {
    let idx = 0;
    let dom = '';
    !Number.isInteger(e) ? (
        dom = e.parent(),
        idx = e.parent().attr('data-idx')
      ) :
      dom = $(`span[data-idx="${unit}"]`);
    $(`.tbl-list:nth-of-type(${idx}) input`).prop('checked', false);
    dom.remove();

    let left = leftCheck();

    // 이부분이 유닛리스트에 올라왔던 유닛들이 모두 사라졌을때 처리 입니다. 
    if (left == 0) {
      // 유닛 /차트적용 버튼 박스자체 제거
      $('.results').removeClass('active');
      $('.units span').remove();
    }
  }

  // 페이지 로딩 시 초기 체크박스 검토 및 초기 유닛 설정
  function checking() {
    let state = '';
    let chBox = document.querySelectorAll('.content.board .tbl-list input[name="list-check"]');
    let labels = document.querySelectorAll('.unit-name');
    chBox.forEach((e, i) => {
      e.checked && labels.length ? (
        insertUnit(labels[i].innerHTML, i + 1)
      ) : '';
    })
    return state;
  }

  // 페이지 로딩 시 초기 함수 실행
  checking();

  // 체크박스 인터렉션 (개발 시 유닛 체크박스관련 다른 함수 적용하면 삭제해주세요)
  $('.tbl-list input[name="list-check"]').change(function() {
    let state = $(this).prop('checked');
    let idx = $(this).parent().parent().index();
    let txt = $(this).parent().siblings('.unit-name').text();
    state && txt !== '' ? insertUnit(txt, idx) : (unitDel(unit = idx));
  });

  // 통계페이지의 유닛관련 함수 끝!***********************************************


  // on/off 아이콘 함수 
  $('i.switch').click(function() {
    $(this).attr('class').indexOf('on') > 0 ? $(this).prev('span').text('OFF') : $(this).prev('span').text('ON');
    $(this).toggleClass('on');
  })

  let timeWrap = $('.time-wrap');
  let initSize = '';
  let linelineCh = timeWrap.children('.chart-time-line').eq(0);

  linelineCh.length ?
    initSize = Number(timeWrap.children('.chart-time-line').eq(0).css('height').replace('px', '')) : '';
  timeWrap.css('height', initSize + 100);

  $('.time-wrap button.more').click(function() {
    let sum = 0;
    $(timeWrap.children('.chart-time-line')).each(function(e) {
      sum += Number(timeWrap.children('.chart-time-line').eq(e).css('height').replace('px', ''));
    })
    timeWrap.toggleClass('active');
    $(this).toggleClass('on');
    timeWrap.attr('class').indexOf('active') > 0 ?
      (
        timeWrap.css('height', sum + 200),
        $(this).text('닫기')
      ) :
      (
        timeWrap.css('height', initSize + 80),
        $(this).text('더보기')
      )
  })

  function tableSizing(){
    let ind =$('.w-lg').index();
    let hdr =$('.tbl-header').children('ul').children().eq(ind);
    let childWidth =$('.w-lg').width();
    hdr.css('min-width',childWidth + 40);
  }

  tableSizing();
})