// 이 파일은 레이아웃 조합용 스크립트입니다. 실제 개발시 삭제해주세요!

$(function() {
  function modalFullAct() {
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
      $(this).attr('target-modal') ? modalShow($(this).attr('target-modal')) : '';
    });

    btnModal.click(function(e) {
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
  }

  // 헤더 로딩 
  $('.header-place').load('../inc/header.html', function() {
    const cat = $('.categories .expand .ct-title');
    const catDet = $('.expand li');
    const catLi = document.querySelectorAll('.categories .expand ul');

    catLi.forEach(e => {
      e.setAttribute('style', `--var-height:${48 * e.childElementCount + 16}px`)
    });


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


    catDet.click(function() {
      catDet.removeClass('active');
      $(this).addClass('active');
    });
  });

  // 모달 로딩
  $('.modal-place').load('../inc/modals.html', modalFullAct);
  $('.dev-place').load('../inc/form_modal.html', modalFullAct);

  // 데이터 개수 세팅
  let dataAdd = 15;

  // 데이터 로딩
  Array(dataAdd - 1).fill(0).forEach((e, i) => {
    let txt = $('ul.tbl-list').html();
    let res = txt !== undefined ? txt.toString().replaceAll('$', i + 2) : '';
    $('.table').append(`<ul class="tbl-list">${res}</ul>`)
  });
  
  $('ul.tbl-list').html() !== undefined ? callbacks() : '';

  // 첫번째 데이터 특문 변경
  function callbacks() {
    let fst = $('ul.tbl-list').first().html().toString().replaceAll('$', 1);
    $('ul.tbl-list').first().html(fst);

    // 랜덤 체크박스 뿌리기
    let ran = Math.ceil(Math.random() * 10);
    $('.tbl-header input').prop('checked') ?
      Array(ran).fill(0).forEach((_, i) => {
        $(`.content.board .tbl-list:nth-of-type(${i+ran}) input`).prop('checked', true);
      }) : '';
  }


  // 일, 월, 년 선택 시 케이스 추가 
  $('.labels-select li:nth-of-type(1)').children().css('display','none');
  $('.sel_date').val()!=='term'?$('.labels-select li:nth-of-type(1)').children( `.${$('.sel_date').val()}`).css('display','block'):$('.labels-select li:nth-of-type(1)').children( `.${$('.sel_date').val()}`).css('display','flex');
  $('.sel_date').change(function() {
    $('.labels-select li:nth-of-type(1)').children().css('display','none'); 
    let now =$(this).val();
    let par= $(this).parent().prev();
    let noun = now ==='day'?'일자':now==='year'?'년도':now==='month'?'월':'기간';
    now!=='term'? par.children(`.${now}`).css('display','block') : par.children(`.${now}`).css('display','flex');
    par.parent().prev().prev().text(`${noun}별 현황`);
  })

});