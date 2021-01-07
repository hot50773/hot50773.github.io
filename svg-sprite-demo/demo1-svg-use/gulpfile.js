var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

function clean (done) {
  gulp.src(['./dist'], { read: false, allowEmpty: true }).pipe($.clean())

  done()
}

function svgSprite (done) {
  gulp
    .src('./src/svg/*.svg')
    // .pipe($.svgo())
    .pipe(
      $.svgSprite({
        mode: {
          symbol: {
            example: true,
            sprite: 'sprite-symbol.svg',
            render: { css: true }
          }
        }
      })
    )
    .on('error', err => {
      console.log(err)
    })
    .pipe(gulp.dest('dist/svg'))

  done()
}

function externalSvgSprite (done) {
  gulp
    .src('./src/svg/external/*.svg')
    // .pipe($.svgo())
    .pipe(
      $.svgSprite({
        log: 'info',
        mode: {
          symbol: {
            example: true,
            sprite: 'sprite-symbol.external.svg',
            render: { css: true }
          }
        }
      })
    )
    .on('error', err => {
      console.log(err)
    })
    .pipe(gulp.dest('dist/svg/external'))

  done()
}

exports.default = gulp.series(clean, gulp.parallel(svgSprite, externalSvgSprite))
