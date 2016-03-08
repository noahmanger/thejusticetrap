$(document).ready(function() {
    $('#fullpage').fullpage({
      anchors: ['section-1', 'section-2', 'section-3', 'section-4'],
      // autoScrolling: false,
      menu: '#menu',
      navigation: true,
      scrollBar: true,
      slidesNavigation: true,
      controlArrows: true,
      paddingTop: '7rem',
      // verticalCentered: false
    });

    $('.js-background-video').each(function(){
      new VideoBackground($(this));
    })
});

var BREAKPOINTS = {
  'mobile': 600,
  'tablet': 768
}

function getScreenSize() {
  var width = $(window).width();
  if (width <= BREAKPOINTS['mobile']) {
    return 'mobile';
  }

  if (BREAKPOINTS['mobile'] < width && width <= BREAKPOINTS['tablet']) {
    return 'tablet';
  }

  if (BREAKPOINTS['tablet'] < width) {
    return 'desktop';
  }
}

var VideoBackground = function($selector) {
  this.$body = $selector;
  this.src = $selector.data('video-src');

  var screenSize = getScreenSize();

  if (screenSize === 'desktop') {
    this.createVideo();
  }
}

VideoBackground.prototype.createVideo = function() {
  var video =
  '<video class="video-background" width="100%" loop muted autoplay poster="' + this.src + '.png">'
    + '<source src="' + this.src + '.mp4" type="video/mp4">'
    + '<source src="' + this.src + '.webm" type="video/webm">'
    + '<img src="' + this.src + '.png">'
  + '</video>';

  this.$body.append(video)
}
