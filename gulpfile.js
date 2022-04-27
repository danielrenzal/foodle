const {src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')(require('sass'))


function buildStyles(){
    return src('./src/style/main.scss')
    .pipe(sass())
    .pipe(dest('./src/style'))
}

function watchTask(){
    watch(['./src/style/main.scss'], buildStyles)
}

exports.default = series(buildStyles, watchTask)