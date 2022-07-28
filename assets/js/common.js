/*
-----------------------------
 - scripts.js
-----------------------------
*/
(function($) {
  /*　- スムーズスクロール -
  /*-----------------------------------*/
  // #で始まるa要素をクリックした場合に処理
  $('a[href^="#"]').click(function () {
    // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
    var adjust = 0;
    // スクロールの速度（ミリ秒）
    var speed = 400;
    // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
    var href = $(this).attr("href");
    // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
    var position = target.offset().top + adjust;
    // スムーススクロール linear（等速） or swing（変速）
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });

  /* - ページトップボタン
  /* ---------------------------------*/
  function pagetopButton() {
    var $pagetop      = $('.p-pagetop');
    var positionValue = $(window).scrollTop();
    var showPosition  = 300;
    var easing        = 'swing';
    var speed         = 1200;
    var pagetopVisible;
    if (positionValue > showPosition) {
      $pagetop.fadeIn();
    }
    $(window).scroll(function() {
      positionValue = $(window).scrollTop();
      pagetopVisible = $pagetop.is(':visible');
      if (positionValue > showPosition) {
        if (!pagetopVisible) {
          $pagetop.fadeIn();
        }
      } else {
        if (pagetopVisible) {
          $pagetop.fadeOut();
        }
      }
    });
    $pagetop.on('click', function(event) {
      $('html,body').animate({scrollTop:0}, speed, easing);
      event.preventDefault;
    });
  }
  /* 実行
  /* ---------------------------------*/
  document.addEventListener('DOMContentLoaded', function() {
    //target=blankに noopener noreferrer を付与します
    $('a[target="_blank"]').attr('rel', 'noopener noreferrer');
    pagetopButton();
  });


  /* - ハンバーガーナビ
  /* ---------------------------------*/
  $('.p-hamburger').on('click', function () {
    $('.p-globalnavigation__area').toggleClass('is-active');
    $('.p-hamburger_text').toggleClass('is-active');
    if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', true);
    } else {
      $(this).attr('aria-expanded', false);
    }
  });

  /* - スマホメニュー閉じる処理 -ハンバーガーナビと連動-
  /* ---------------------------------------------------------*/
  var $triggerBtn = $('.js-open__trigger');
  $triggerBtn.on('click', function (event) {
    $('.p-hamburger').trigger('click');
  });


  /*　アコーディオン
  /* ---------------------------------*/
  $('.c-accordion__title.js-trigger').on('click', function(){
    $(this).toggleClass('is-active');
    $(this).next('.c-accordion__body').slideToggle().toggleClass('is-active');
  });
}(jQuery));