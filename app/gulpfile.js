var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minify = require('gulp-clean-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-image-optimization');

gulp.task('sass', function(){
	return gulp.src(['scss/main.scss', '../components/*.scss'])
	.pipe(sass()) //Convert SASS to CSS
	//.pipe(minify()) //Minify master.css
	.pipe(gulp.dest('css')) //Place Converted CSS file in -CSS- folder
});

gulp.task('cssStream', function(){
	return gulp.src('css/*.css')
	.pipe(concatCss('main.css')) //Concatenate all css in master.css
	//.pipe(minify()) //Minify master.css
	.pipe(gulp.dest('css')) //Place master.css in Styles folder
});

gulp.task('optimg', function(){
return gulp.src(['images/*.jpg','images/*.png', 'images/*.gif'])
	.pipe(imagemin())
	.pipe(gulp.dest('images'))
});


gulp.task('watch', function(){
	//gulp.watch('components/dashboardcomponent/css/dashboardcomponent.scss',['dash']);
	gulp.watch([
		'scss/*.scss', 
		'components/dashboardcomponent/css/dashboardcomponent.scss', 
		'components/logincomponent/css/logincomponent.scss', 
		'components/sidemenucomponent/css/SidemenuComponent.scss',
		'components/client/css/clientcomponent.scss'
	],['sass']);
	gulp.watch('css/*.css',['cssStream']);
});

gulp.task('default', ['sass', 'cssStream']);