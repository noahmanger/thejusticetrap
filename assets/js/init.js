$(document).ready(function() {

  $('.js-video-background').each(function(){
    new VideoBackground($(this));
  });

  $('.js-tabs').each(function(){
    new Tabs($(this));
  });

  initScrollTracking();
});

var BREAKPOINTS = {
  'mobile': 600,
  'tablet': 768
}

function getScreenSize() {
  var width = $(window).width();
  if (width <= BREAKPOINTS['mobile']) {
    return 'mobile';
  };

  if (BREAKPOINTS['mobile'] < width && width <= BREAKPOINTS['tablet']) {
    return 'tablet';
  };

  if (BREAKPOINTS['tablet'] < width) {
    return 'desktop';
  };
};

var VideoBackground = function($selector) {
  this.$body = $selector;
  this.src = $selector.data('video-src');

  var screenSize = getScreenSize();

  if (screenSize === 'desktop') {
    this.createVideo();
  };
};

VideoBackground.prototype.createVideo = function() {
  var video =
  '<video class="video-background" width="100%" loop muted autoplay poster="' + this.src + '.jpg">'
    + '<source src="' + this.src + '.mp4" type="video/mp4">'
    + '<source src="' + this.src + '.webm" type="video/webm">'
    + '<img src="' + this.src + '.jpg" alt="Photo of first screen of the video">'
  + '</video>';

  this.$body.append(video)
};

var Tabs = function($selector) {
  this.$body = $selector;
  this.currentTab = 1;
  this.$body.on('click', '[data-controls-tab]', this.handleClick.bind(this));

};

Tabs.prototype.handleClick = function(e) {
  var tabNumber = $(e.target).data('controls-tab');
  this.hide(this.currentTab);
  this.show(tabNumber);
};

Tabs.prototype.show = function(tabNumber) {
  this.$body.find('[data-controls-tab="' + tabNumber +'"]').addClass('active');
  this.$body.find('[data-tab="' + tabNumber + '"]').attr('aria-hidden', false);
  this.currentTab = tabNumber;
};

Tabs.prototype.hide = function(tabNumber) {
  this.$body.find('[data-controls-tab="' + tabNumber +'"]').removeClass('active');
  this.$body.find('[data-tab="' + tabNumber + '"]').attr('aria-hidden', true);
};

var initScrollTracking = function() {
  var controller = new ScrollMagic.Controller();
  var sceneIDs = ['#introduction', '#the-problem', '#the-solution', '#the-need', '#join-us'];
  var scenes = [];
  var headerHeight = $('.site-header').outerHeight();

  // Scene Handler
  var sceneFactory = function(id) {
    var height = $(id).outerHeight();

    var scene = new ScrollMagic.Scene({
      triggerElement: id,
      duration: height,
      triggerHook: .3
    });

    scene.setClassToggle(id, 'visible');

    scene.$link = $('.site-header a[href="'+ id +'"]');

    scene.on('enter', function(e) {
      e.target.$link.addClass('active');
      window.history.pushState(null, null, id);
    });

    scene.on('leave', function(e) {
      e.target.$link.removeClass('active');
    });

    return scene;
  }

  sceneIDs.forEach(function(id) {
    var scene = sceneFactory(id);
    scenes.push(scene);
  });

  // Animate scroll
  $('.js-scroll-link').on('click', function(e){
    e.preventDefault();
    $target = $(e.target);
    var sectionTop = $($target.attr('href')).offset().top + 2;
    $('html, body').animate({
      scrollTop: sectionTop + 'px'
    }, 800)
  });

  controller.addScene(scenes);
}
