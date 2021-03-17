const imagemin = require('gulp-imagemin');

let project_folder = "dist";
let source_folder = "#src";
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        media: project_folder + "/media/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        media: source_folder + "/media/**/*.{jpg,jpeg,png,svg,gif,ico,webp,mp4}",
        fonts: source_folder + "/fonts/**/*.{woff2,woff,ttf,eot}",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        media: source_folder + "/media/**/*.{jpg,png,svg,gif,ico,webp,mp4}",
    },
    clean: "./" + project_folder + "/"
}
let { src, dest, task } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imgmin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webp-css"),
    svgSprite = require("gulp-svg-sprite");


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
function css() {
    return src(path.src.css)
        .pipe(webpcss())
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 2 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(
            clean_css()
        )
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())

}
function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}
function images() {
    return src(path.src.media)
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.media))
        .pipe(src(path.src.media))
        .pipe(
            imgmin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 2 //0 to 7
            })
        )
        .pipe(dest(path.build.media))
        .pipe(browsersync.stream())
}
function fonts(params) {
    src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}
gulp.task('svgSprite', function () {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../icons/icons.svg",
                        example: true
                    }
                }
            })
        )
        .pipe(dest(path.build.media))
})

function watchFiles(params) { gulp.watch([path.watch.html], html); gulp.watch([path.watch.css], css); gulp.watch([path.watch.js], js); gulp.watch([path.watch.media], images); }
function clean(params) { return del(path.clean); }
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;