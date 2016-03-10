$(document).ready(function() {

    $('.js-video-background').each(function(){
      new VideoBackground($(this));
    })

    new Tabs('.js-cycle');
    new Tabs

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

var Tabs = function(selector) {
  this.$body = $(selector);
  this.currentTab = 1;
  this.$body.on('click', '.cycle__button', this.handleClick.bind(this));

};

Tabs.prototype.handleClick = function(e) {
  var tabNumber = $(e.target).data('tab');

  this.hideTab(this.currentTab);
  this.showTab(tabNumber);
};

Tabs.prototype.showTab = function(tabNumber) {
  var $button = $('.cycle__button[data-tab="' + tabNumber +'"]');
  var $stage = $('#stage-' + tabNumber);
  var $content = $('#content-stage-' + tabNumber);
  $stage.attr('aria-hidden', false);
  $content.attr('aria-hidden', false);
  $button.addClass('active');
  this.currentTab = tabNumber;
};

Tabs.prototype.hideTab = function(tabNumber) {
  var $button = $('.cycle__button[data-tab="' + tabNumber +'"]');
  var $stage = $('#stage-' + tabNumber);
  var $content = $('#content-stage-' + tabNumber);
  $stage.attr('aria-hidden', true);
  $content.attr('aria-hidden', true);
  $button.removeClass('active');
};
