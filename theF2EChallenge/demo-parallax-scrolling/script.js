var $star= $('.star')
var $circle = $('.circle')
var $square = $('.square')

var screenConfig = {
  opening: {
    duration: 5
  }
}

var ans = []

opening()

function opening() {
  TweenLite.to($star, 5, {rotation: 360, ease: Power2.easeOut})
  TweenLite.to($circle, 5, {rotation: 360, ease: Power2.easeOut})
  TweenLite.to($square, 5, {rotation: -360, ease: Power2.easeOut})

  TweenLite.to($circle, screenConfig.opening.duration / 2, {css: {scale: 1.1}})
  TweenLite.to($circle, screenConfig.opening.duration / 2, {css: {scale: 1}, delay: screenConfig.opening.duration / 2})

  TweenLite.to($square, 1.6, {css: {scale: 7}, ease: Power2.easeOut, delay:screenConfig.opening.duration - 1})
  TweenLite.to($circle, 1.6, {css: {scale: 7}, ease: Power2.easeOut, delay:screenConfig.opening.duration - 0.7})
  TweenLite.to($star, 0.6, {css: {scale: 7}, ease: Power2.easeOut, delay:screenConfig.opening.duration - 0.4, onComplete: function(){
    $('.opening').remove()
    screenQ1Start()
  }})
}

function screenQ1Start(){
  $('.screenQ1').css('background', '#1469FF')
  $('.screenQ1 .text-block').animate({opacity: 0}, 500, function() {
    $('.screenQ1 .q-section').animate({opacity: 1}, 500)
  })

  $('.screenQ1 .q-section__options').click(function(e){
    var value = $(e.target).attr('data-value')
    ans.push(value)

    $square.remove()
    $triangle.remove()
    $circle.remove()

    TweenLite.to($('.screenQ1 .animate-section'), 0.5, {css: {left: '0%'}, onComplete: function() {
      $('.screenQ1').remove();
      screenQ2Start()
    }})
    })
    var $square = $('.screenQ1 .animate-section__square') //top: 100
    var $triangle = $('.screenQ1 .animate-section__triangle')  //top:300
    var $circle = $('.screenQ1 .animate-section__circle')  //bottom: -100

    TweenLite.to($('.screenQ1 .animate-section'), 1, {css: {left: '60%'}, delay: 1})
    TweenLite.to($square, 2, {css: {top: '100px'}, ease: Power3.easeOut, delay: 2})
    TweenLite.to($triangle, 2, {css: {top: '300px'}, ease: Power3.easeOut, delay: 2})
    TweenLite.to($circle, 2, {css: {bottom: '-100px'}, ease: Power3.easeOut, delay: 2})

    TweenLite.to($square, 4, {rotation: 360, ease: Power3.easeOut, delay: 4})
    TweenLite.to($triangle, 4, {rotation: -360, ease: Power2.easeOut, delay: 4})
    TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 4})

}

function screenQ2Start() {
  $('.screenQ2 .animate-section').css('right', '100%')
  $('.screenQ2 .q-section').animate({opacity: 1}, 500)

  $('.screenQ2 .q-section__options').click(function(e){
    var value = $(e.target).attr('data-value')
    ans.push(value)

    $square.remove()
    $triangle.remove()
    $circle.remove()

    TweenLite.to($('.screenQ2 .animate-section'), 0.5, {css: {left: '0%'}, onComplete: function() {
      $('screenQ2').remove()
      screenCalculating()
    }})
  })

  var $square = $('.screenQ2 .animate-section__square') //top: 100
  var $triangle = $('.screenQ2 .animate-section__triangle')  //top:300
  var $circle = $('.screenQ2 .animate-section__circle')  //bottom: -100

  TweenLite.to($('.screenQ2 .animate-section'), 1, {css: {right: '60%'}, delay: 0.5})
  TweenLite.to($square, 2, {css: {bottom: '200px'}, ease: Power3.easeOut, delay: 2})
  TweenLite.to($triangle, 2, {css: {top: '-50px'}, ease: Power2.easeOut, delay: 2})
  TweenLite.to($circle, 2, {css: {bottom: '200px'}, ease: Power2.easeOut, delay: 2})

  TweenLite.to($square, 4, {rotation: '+=360', ease: Power3.easeOut, delay: 4})
  TweenLite.to($triangle, 4, {rotation: '-=360', ease: Power2.easeOut, delay: 4})
  TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 4})
}

function screenCalculating() {
  $('.screenQ2').remove()
  $('.calculating').removeClass('hide')
  $('body').css('overflow', 'auto')

  var controller = new ScrollMagic.Controller()

  var total = 50;
  var colors = ['white', 'black', '#0027C8']
  for (var i = 0; i < total; i++) {
    var size = Math.floor(getRandom(100, 300));
    var color = colors [i % 3];
    $('.calculating').append(`<div class='small-circle small-circle${i}' style='background:${color};width:${size}px;height:${size}px;position:fixed;bottom:-300px;'></div>`)
  }

  for (var i = 0; i < total; i++) {
    var Top = getRandom(300,500);
    var Left = getRandom(1000, 3000);
    new ScrollMagic.Scene({triggerElement: '.trigger' + ((i % 4) + 1), duration: getRandom(100, 3000)})
    .setTween(TweenLite.to($('.small-circle' + i), 5, {css: {top: `${-Top}px`, left: `${Left}px`}}))
    .addTo(controller)
  }
}


function getRandom(lower, upper) {
  return Math.random() * (upper - lower) + lower
}

