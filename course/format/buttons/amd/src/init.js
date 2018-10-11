define(['jquery','format_buttons/slick', 'format_buttons/ajax'], function($, slick, ajax) {

  function initDefaults(initparams){
    if (initparams) console.dir(initparams);
    var currentSection,
        currentLabel = checkStorage('lastLabel');

    // check highlighted
    if (document.querySelector('.slider.sections .nav-item.current') !== null){
      currentSection = parseInt(document.querySelector('.slider.sections .nav-item.current').dataset.section);
      // console.log('matched highlited '+currentSection);
    } else {
      currentSection = checkStorage('lastSection');
      // console.log('no highlighting, use localStorage '+ currentSection);
    }

    if (currentSection == 1){
      // console.log('matched first: '+currentSection);
      var check = document.querySelector('.slider.sections .nav-item');
      if(check.dataset.section !== currentSection){
        currentSection = check.dataset.section;
      }
    }
    // console.log("currentSection "+currentSection);
    if (currentLabel == 1){
      var check = document.querySelector('#section'+currentSection+' .label-item');
      if(check.dataset.label !== currentLabel){
        localStorage.setItem('lastLabel', check.dataset.label);
        currentLabel = check.dataset.label;
      }
    }

    initSlider($('.slider.sections'));
    sectionsEvents();
    $('.slider.sections .nav-item[data-section="'+currentSection+'"]').toggleClass('active');
    $('#section' + currentSection).toggleClass('d-none');

    currentIndex = parseInt($('.slider.sections .slick-slide:has(.nav-item[data-section="'+currentSection+'"])')[0].dataset.slickIndex);
    var lastSlideable = $('.slider.sections .nav-item').length - 4;
    // console.log('lastSlideable '+lastSlideable);
    // console.log('current '+currentIndex);
    if (currentIndex > lastSlideable){
      $('.slider.sections').slick('slickGoTo', lastSlideable);
    } else {
      $('.slider.sections').slick('slickGoTo', currentIndex);
    }

    initSlider($('#section'+currentSection+' .slider.labels'),0);
    labelsEvents(currentSection);
    initPrevNextBtns(currentSection);
    initPrevNextBtnsEvents();
    tooltipEvents();
    xsSectionArrowsEvents();

    document.addEventListener('click', function(e){
      let target = e.target;
      while (!target.classList.contains('buttons')) {
        if (target.dataset.section || target.dataset.label) {
          sendEventToServer(target);
          return;
        }
        target = target.parentNode;
      }

    });
  }
// add events to server
  function sendEventToServer(target) {
    const mainBlock = document.querySelector('.buttons[data-userid]');
    if (!mainBlock) return;
    ajax.data.userid = mainBlock.dataset.userid;

    if (target.dataset.section) {
      ajax.data.modtype = `section`;
      ajax.data.modname = target.querySelector('.section-title').innerHTML.trim();
      ajax.data.sectionid = target.dataset.section;
      ajax.data.cmid = '';
      ajax.send();

    }else if (target.dataset.label) {
      let targetSection = target;
      while (!targetSection.classList.contains('section-content')){
        targetSection = targetSection.parentNode;
      }
      ajax.data.modtype = `label`;
      ajax.data.modname = target.querySelector('.label-title').innerHTML.trim();
      ajax.data.sectionid = targetSection.id.replace(/\D+/, '');
      ajax.data.cmid = target.dataset.label;
      ajax.send();
    }
  };

  function sectionsEvents(){
    var sections = $('.slider.sections .nav-item');
    for (var i = 0; i < sections.length; i++) {
      var item = sections[i];
      item.addEventListener('click', function() {
        loopActive(sections, item);
        $('.slider.sections .nav-item[data-section="'+this.dataset.section+'"]').toggleClass('active');
        loop($('.section-content'));
        $('#section' + this.dataset.section).toggleClass('d-none');
        addToStorage('lastSection', this.dataset.section);
        unslickLabels();
        initSlider($('#section' + this.dataset.section + ' .slider.labels'),0);
        labelsEvents(this.dataset.section);
        initPrevNextBtns(this.dataset.section);
        xsDropdown(this.dataset.section);
      });
    }
  }

  function xsSectionArrowsEvents() {
    if (window.innerWidth <= 767){
      $('.slider.sections .slick-arrow').on('click', function(){
        $('.slider.sections .slick-slide.slick-current.slick-active .nav-item').click();
        $('.labels-wrapper.expand').removeClass('expand');
      });
    }
  }

  function tooltipEvents() {
    var tooltips = $('.section-tooltip');
    for(var i=0; i<tooltips.length; i++){
      var item = tooltips[i];
      item.addEventListener('click', function(){
        var summary = $('.slider.sections .nav-item[data-section="'+this.dataset.section+'"] .section-description').html();
        var alert = $('#section' + this.dataset.section + ' .alert');
        // console.log(alert.length);
        if (alert.length == 0){
          $('#section' + this.dataset.section + ' .label-content-wrapper').prepend('<div class="alert alert-custom alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button>'+summary+'</div>');
        }
      });
    }
  }

  function halfVisibleSlideEvents(li){
    var allActive = document.querySelectorAll('.section-content:not(.d-none) .labels.slick-initialized .slick-active[aria-hidden="false"]');
    // last visible half
    var halfPrev = $(allActive[0]).prev();
    var halfNext = $(allActive[3]).next();
    var liParent = $(li.parentNode.parentNode);
    if (liParent.is(halfNext)){
      var next = document.querySelector('.section-content:not(.d-none) .labels.slick-initialized .slick-next');
      next.click();
    } else if (liParent.is(halfPrev)){
      var prev = document.querySelector('.section-content:not(d-none) .labels.slick-initialized .slick-prev');
      prev.click();
    }
  }

  function labelsEvents(currentSection){
    var labels = $('#section' + currentSection + ' .nav-item');
    if (labels.length == 0){
      $('#section' + currentSection + ' .label-content-wrapper').children().remove();
      $('#section' + currentSection + ' .label-content-wrapper').append('<div class="alert alert-danger" role="alert">Sorry, there is no labels in this topic.</div>');
    } else {
      for (var i = 0; i < labels.length; i++) {
        var item = labels[i];
        item.addEventListener('click', function(e) {
          addToStorage('lastLabel', this.dataset.label);
          loopActive(labels, item);
          $('[data-label="' + this.dataset.label + '"]').toggleClass('active');
          var equils = $('[data-label-content="' + this.dataset.label + '"]');
          loop($('#section' + currentSection + ' .label-content'));
          $('[data-label-content="' + this.dataset.label + '"]').toggleClass('d-none');
          initPrevNextBtns(currentSection);
          if (window.innerWidth <= 767 && $('#section' + currentSection + ' .labels-wrapper').hasClass('expand')){
            $('#section' + currentSection + ' .labels-wrapper').addClass('collapsing');
            setTimeout(function(){
              $('#section' + currentSection + ' .labels-wrapper').removeClass('collapsing');
              $('#section' + currentSection + ' .labels-wrapper').removeClass('expand');
            }, 800);
          }
          halfVisibleSlideEvents(this);

            // var slide = this.parentNode.parentNode;
            // only the last 1 item in all labels list sliding
            // if(slide.parentNode.childNodes.length > 5 && slide.parentNode.childNodes.length-slide.dataset.slickIndex < 2){
            //   var track = this.parentNode.parentNode.parentNode;
            //   var trackOffsetBottom = track.offsetTop + track.offsetHeight;
            //   var listOffsetBottom = track.parentNode.offsetTop + track.parentNode.offsetHeight;
            //   var float = trackOffsetBottom - listOffsetBottom;
            //   setTimeout(function(){
            //     track.style.transform = 'translate3d(0px,'+ -float +'px,0px)';
            //     track.style.transition = 'translate 500ms ease 0s';
            //   },800);
            // }

        });
      }
      var checkLabel = document.querySelector('#section' + currentSection + ' .nav-item.active');
      if (checkLabel == null){
        var check = document.querySelector('#section'+currentSection+' .label-item');
        check.classList += ' active';
        var equils = $('[data-label-content="' + check.dataset.label + '"]');
        loop($('#section' + currentSection + ' .label-content'));
        $('[data-label-content="' + check.dataset.label + '"]').toggleClass('d-none');
      }
    }
  }

  // if elem only - horizontal, 2 attr - vertical;
  function initSlider(elem, vert){
    var dir, resp=[], brakepoints= [1200, 992, 768], brp, slides, focus;
    (document.dir == "rtl")?dir = true:dir = false;
    if (vert !== undefined){vert = true; dir = false; focus = false}else{vert = false; focus = false}
    // responsiveness / dropdown on xs vert
    if (vert){
      slides = 4.5;
      for (var i=0; i<brakepoints.length; i++){
        if (brakepoints[i] == 768){
          // add dropdown touch event
          brp = {
            breakpoint: brakepoints[i],
            settings: 'unslick'
          };
          resp.push(brp);
        } else {
          brp = {
            breakpoint: brakepoints[i],
            settings: {
              slidesToShow: slides,
              slidesToScroll: 1,
              rtl:false
            }
          };
          resp.push(brp);
        }
      }
    } else {
      slides = 4;
      for (var i=0; i<brakepoints.length; i++){
        brp = {
          breakpoint: brakepoints[i],
          settings: {
            slidesToShow: slides-i-1,
            slidesToScroll: 1,
            rtl: dir,
          }
        };
        resp.push(brp);
      }
    }
    var slickConfig = {
      dots: false,
      autoplay: false,
      arrows: true,
      vertical: vert,
      verticalSwiping: vert,
      rtl:dir,
      slidesToShow: slides,
      slidesToScroll: 1,
      focusOnSelect: focus,
      focusOnChange: focus,
      responsive:resp,
    };
    // console.log("rtl:"+slickConfig.rtl);
    // console.log("vert:"+slickConfig.vertical);
    // console.log("resp:"+slickConfig.responsive);
    // console.log($.isArray(slickConfig.responsive));
    elem.slick(slickConfig);
  }

  function unslickLabels(){
      $('.labels.slick-initialized').slick('unslick');
  }

  function loopActive(htmlCollection, currentActive){
    for(var i=0; i<htmlCollection.length;i++){
      var elem = htmlCollection[i];
      if (htmlCollection[i].classList.contains('active')){
        htmlCollection[i].classList.remove('active');
      }
    }
  }

  function loop (htmlCollection){
    for(var i=0; i<htmlCollection.length;i++){
      var elem = htmlCollection[i];
      if (!htmlCollection[i].classList.contains('d-none')){
        htmlCollection[i].classList += " d-none";
      }
    }
  }

  function checkStorage(key){
    if (localStorage.getItem(key)){
      return localStorage.getItem(key);
    } else {
       localStorage.setItem(key, 1);
       return 1;
    }
  }

  function addToStorage(key, value){
    if (localStorage.getItem( key )){
      localStorage.setItem(key, value);
    }
  }

  function xsDropdown(currentSection){
    if (window.innerWidth < 767 && $('#section' + currentSection + ' .labels-wrapper').hasClass('expand')){
      $('#section' + currentSection + ' .labels-wrapper').addClass('collapsing');
      setTimeout(function(){
        $('#section' + currentSection + ' .labels-wrapper').removeClass('collapsing');
        $('#section' + currentSection + ' .labels-wrapper').removeClass('expand');
      }, 800);
    } else {
      $('#section' + currentSection + ' .labels-wrapper').toggleClass('expand');
    }
  }

  function initPrevNextBtns(currentSection){
    var active = $('#section'+currentSection+' .nav-item.active');
    activeSlide = active.parent().parent();

    $('.label-active').children().remove();
    $('.label-prev').children().remove();
    $('.label-next').children().remove();

    if (window.innerWidth < 767){
      active.children().clone().appendTo(".label-active");
      active.prev().children().clone().appendTo(".label-prev");
      active.next().children().clone().appendTo(".label-next");
    } else {
      activeSlide.prev().children().children().children().clone().appendTo(".label-prev");
      activeSlide.next().children().children().children().clone().appendTo(".label-next");
    }
  }

  function initPrevNextBtnsEvents(){
    var prevBtn = $('.label-prev');
    var nextBtn = $('.label-next');
    for (var i=0; i<prevBtn.length;i++){
      var item = prevBtn[i];
      item.addEventListener('click', function(){
        active = $('#section'+localStorage.getItem('lastSection')+' .nav-item.active');
        activeSlide = active.parent().parent();
        if (window.innerWidth < 767){
          active.prev().trigger('click');
        } else {
          activeSlide.prev().children().children().children().trigger('click');
        }
      });
    }
    for (var i=0; i<nextBtn.length;i++){
      var item = nextBtn[i];
      item.addEventListener('click', function(){
        active = $('#section'+localStorage.getItem('lastSection')+' .nav-item.active');
        activeSlide = active.parent().parent();
        if (window.innerWidth < 767){
          active.next().trigger('click');
        } else {
          activeSlide.next().children().children().children().trigger('click');
        }
      });
    }
  }

    return {

        init: function() {
          initDefaults();

          // add fixed scroll position
          var wrap = $("div.buttons");
          // console.log($(document).scrollTop());
          $(document).on("scroll", function(e) {
            if ($(document).scrollTop() > 225) {
              wrap.addClass("fixed");
            } else {
              wrap.removeClass("fixed");
            }
          });

        }
    };
});
