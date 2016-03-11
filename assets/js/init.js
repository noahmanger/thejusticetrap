$(document).ready(function() {

  $('.js-video-background').each(function(){
    new VideoBackground($(this));
  });

  $('.js-tabs').each(function(){
    new Tabs($(this));
  });

  // $('.section').each(function(index, section){
  //   var sectionWatcher = scrollMonitor.create(section)
  //   sectionWatcher.stateChange(function(){
  //     if (section.isInViewport) {
  //       console.log($(this).attr('id'));
  //     }
  //   })
  // })

  // var controller = new ScrollMagic.Controller();
  //
  // // Scene Handler
  // var scene = new ScrollMagic.Scene({
  //   triggerElement: "#section-1", // point of execution
  // });
  //
  // controller.addScene([
  //   scene,
  //   scene2
  // ]);
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
  '<video class="video-background" width="100%" loop muted autoplay poster="' + this.src + '.png">'
    + '<source src="' + this.src + '.mp4" type="video/mp4">'
    + '<source src="' + this.src + '.webm" type="video/webm">'
    + '<img src="' + this.src + '.png">'
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
