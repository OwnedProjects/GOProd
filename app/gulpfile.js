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
	gulp.watch([
		'scss/*.scss', 
		'components/dashboardcomponent/css/dashboardcomponent.scss', 
		'components/logincomponent/css/logincomponent.scss', 
		'components/sidemenucomponent/css/SidemenuComponent.scss',
		'components/client/css/clientcomponent.scss',
		'components/supplier/css/suppliercomponent.scss',
		//production styles
		'components/production/css/productioncomponent.scss',		
		//product styles
		'components/products/productlistcomponet/css/productlist.scss',		
		'components/products/purchasebagcomponent/css/purchasebag.scss',		
		'components/products/purchasecomponent/css/purchase.scss',
		//sales styles
		'components/sales/newordercomponent/css/neworder.scss',		
		'components/sales/despatchescomponent/css/despatches.scss',		
		'components/sales/generatebillcomponent/css/gerneratebill.scss',
		//stock style
		'components/stock/addstockcomponent/css/addstock.scss',		
		'components/stock/availablecomponent/css/availablestock.scss'
	],['sass']);
	gulp.watch('css/*.css',['cssStream']);
});

gulp.task('default', ['sass', 'cssStream']);