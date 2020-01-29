let gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  jsonSass = require("gulp-json-sass"),
  plumber = require("gulp-plumber"),
  postcss = require("gulp-postcss"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  stylelint = require("gulp-stylelint"),
  uglify = require("gulp-uglify"),
  svgSprite = require("gulp-svg-sprite"),
  prefixer = require("autoprefixer"),
  babelify = require("babelify"),
  browserify = require("browserify"),
  browserSync = require("browser-sync"),
  cssnano = require("cssnano"),
  buffer = require("vinyl-buffer"),
  source = require("vinyl-source-stream");

/**
 * Notify
 *
 * Show a notification in the browser's corner.
 *
 * @param {*} message
 */
function notify(message) {
  browserSync.notify(message);
}

/**
 * Paths
 *
 * Return paths configuration.
 */
let paths = (function () {
  this.basePath = ".";
  return {
    templates: `${this.basePath}/templates`,
    src: `${this.basePath}/static`,
    dst: `${this.basePath}/web`
  };
})();

/**
 * Vendors
 *
 * List of modules to get bundled into vendors minified file.
 */
let vendors = [
  "lazysizes",
  "lazysizes/plugins/object-fit/ls.object-fit",
  "lazysizes/plugins/unveilhooks/ls.unveilhooks"
];

/**
 * Server Task
 *
 * Launch server using BrowserSync.
 *
 * @param {*} done
 */
function server(done) {
  browserSync.init({
    proxy: "{{ repo }}.local:8888/",
    open: false
  });
  done();
}

/**
 * Reload Task
 *
 * Reload page with BrowserSync.
 *
 * @param {*} done
 */
function reload(done) {
  notify("Reloading...");
  browserSync.reload();
  done();
}

/**
 * Breakpoints Task
 *
 * Create SCSS breakpoints file from JSON, so they can be used as variables.
 */
function breakpoints() {
  notify("Generating breakpoints...");
  return gulp
    .src(`${paths.src}/breakpoints.json`)
    .pipe(
      jsonSass({
        sass: false
      })
    )
    .pipe(rename("_breakpoints.scss"))
    .pipe(gulp.dest(`${paths.src}/sass/`));
}

/**
 * CSS Task
 *
 * The SASS files are run through postcss/autoprefixer and placed into one
 * single main styles.min.css file (and sourcemap)
 */
function css() {
  notify("Compiling styles...");
  return gulp
    .src(`${paths.src}/sass/main.scss`)
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: "string", console: true }]
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["node_modules/"]
      })
    )
    .pipe(postcss([prefixer, cssnano]))
    .pipe(rename("styles.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${paths.dst}/css/`))
    .pipe(browserSync.reload({ stream: true }));
}

/**
 * JS Task
 *
 * All regular .js files are collected, minified and concatonated into one
 * single scripts.min.js file (and sourcemap)
 */
function js() {
  notify("Building scripts...");
  return browserify({
    entries: `${paths.src}/js/app.js`,
    debug: true
  })
    .external(
      vendors.map(vendor => {
        if (vendor.expose) {
          return vendor.expose;
        }
        return vendor;
      })
    )
    .transform(babelify, {
      presets: ["@babel/preset-env"],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", {}]
      ],
      sourceMaps: true
    })
    .bundle()
    .on("error", function (err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("scripts.js"))
    .pipe(buffer())
    .pipe(rename("scripts.min.js"))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${paths.dst}/js/`))
    .pipe(browserSync.reload({ stream: true }));
}

exports.js = js;

/**
 * Vendor Task
 *
 * All vendor .js files are collected, minified and concatonated into one
 * single vendor.min.js file (and sourcemap)
 */
function vendor() {
  const b = browserify({
    debug: true
  });

  vendors.forEach(lib => {
    if (lib.expose) {
      b.require(lib.path, { expose: lib.expose });
    } else {
      b.require(lib);
    }
  });

  return b
    .bundle()
    .on("error", function (err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("vendor.js"))
    .pipe(buffer())
    .pipe(rename("vendor.min.js"))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${paths.dst}/js/`));
}

exports.vendor = vendor;

/**
 * Images Task
 *
 * All images are optimized and copied to static folder.
 */
function images() {
  notify("Copying image files...");
  return gulp
    .src([
      `${paths.src}/images/**/*.{jpg,png,gif,svg,ico}`
    ])
    .pipe(plumber())
    .pipe(
      imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })
    )
    .pipe(gulp.dest(`${paths.dst}/images/`));
}

/**
 * Fonts Task
 *
 * All fonts are copied to static folder.
 */
function fonts() {
  return gulp
    .src([`${paths.src}/fonts/**/*`], {
      base: `${paths.src}`
    })
    .pipe(gulp.dest(`${paths.dst}`));
}

/**
 * Watch Task
 *
 * Watch files to run proper tasks.
 */
function watch() {
  // Watch breakpoints file for changes & recompile
  gulp.watch(`${paths.src}/breakpoints.json`, gulp.series(breakpoints, js));

  // Watch SCSS files for changes & rebuild styles
  gulp.watch(`${paths.src}/sass/**/*.scss`, css);

  // Watch JS files for changes & recompile
  gulp.watch(`${paths.src}/js/**/*.js`, js);

  // Watch images for changes, optimize & recompile
  gulp.watch(`${paths.src}/images/**/*`, gulp.series(images, reload));


  // Watch fonts for changes, copy & reload
  gulp.watch(`${paths.src}/fonts/**/*`, gulp.series(fonts, reload));

  // Watch Twig files & reload
  gulp.watch(`${paths.templates}/**/*.twig`, reload);
}

/**
 * Default Task
 *
 * Running just `gulp` will:
 * - Compile JS and SCSS files
 * - Optimize and copy images to static folder
 * - Copy fonts to static folder
 * - Launch BrowserSync & watch files
 */
exports.default = gulp.series(
  vendor,
  breakpoints,
  gulp.parallel(js, css, fonts, images),
  gulp.parallel(server, watch)
);

/**
 * Build Task
 *
 * Running just `gulp build` will:
 * - Compile JS and SCSS files
 * - Optimize and copy images to static folder
 * - Copy fonts to static folder
 */
exports.build = gulp.series(
  vendor,
  breakpoints,
  gulp.parallel(js, css, fonts, images)
);
