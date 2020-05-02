let gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps"),
  stylelint = require("gulp-stylelint"),
  terser = require("gulp-terser"),
  svgSprite = require("gulp-svg-sprite"),
  babelify = require("babelify"),
  browserify = require("browserify"),
  browserSync = require("browser-sync"),
  cssnano = require("cssnano"),
  buffer = require("vinyl-buffer"),
  source = require("vinyl-source-stream"),
  postcss = require("gulp-postcss"),
  postcssImport = require("postcss-import"),
  postcssNested = require("postcss-nested"),
  postcssProperties = require("postcss-custom-properties"),
  autoprefixer = require("autoprefixer"),
  tailwindcss = require("tailwindcss"),
  purgecss = require("@fullhuman/postcss-purgecss"),
  purgecssFromJs = require("purgecss-from-js");

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
    dst: `${this.basePath}/web`,
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
  "lazysizes/plugins/unveilhooks/ls.unveilhooks",
  "scrollmagic",
  "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators",
  "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap",
  "smooth-scrollbar",
  "gsap",
  "gsap/ScrollToPlugin",
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
    proxy: "[[name]].local:8888/",
    open: false,
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
  browserSync.reload();
  done();
}

/**
 * CSS Task
 *
 * The css files are run through postcss/autoprefixer and placed into one
 * single main styles.min.css file (and sourcemap)
 */
function css() {
  return gulp
    .src(`${paths.src}/css/styles.css`)
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: "string", console: true }],
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        postcssImport({
          root: `${paths.src}/css *`,
        }),
        postcssNested(),
        postcssProperties(),
        tailwindcss(),
        autoprefixer(),
        purgecss({
          content: [
            `${paths.src}/js/**/*.js`,
            `${paths.templates}/**/*.twig`,
            `${paths.templates}/**/*.html`,
          ],
          defaultExtractor: (content) => {
            return content.match(/[\w-/:]+(?<!:)/g) || [];
          },
        }),
        cssnano(),
      ])
    )
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
  return browserify({
    entries: `${paths.src}/js/app.js`,
    debug: true,
  })
    .external(
      vendors.map((vendor) => {
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
        ["@babel/plugin-proposal-class-properties", {}],
      ],
      sourceMaps: true,
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
    .pipe(terser())
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
    debug: true,
  });

  vendors.forEach((lib) => {
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
    .pipe(terser())
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
  return gulp
    .src([`${paths.src}/images/**/*.{jpg,png,gif,svg,ico}`])
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
      base: `${paths.src}`,
    })
    .pipe(gulp.dest(`${paths.dst}`));
}

/**
 * Watch Task
 *
 * Watch files to run proper tasks.
 */
function watch() {
  gulp.watch(`${paths.src}/css/**/*.css`, css);
  gulp.watch(`${paths.src}/js/**/*.js`, js);
  gulp.watch(`${paths.src}/images/**/*`, gulp.series(images, reload));
  gulp.watch(`${paths.src}/fonts/**/*`, gulp.series(fonts, reload));
  gulp.watch(`${paths.templates}/**/*.twig`, reload);
  gulp.watch(`./tailwind.config.js`, css);
  gulp.watch(`./gulpfile.js`, reload);
}

/**
 * Default Task
 *
 * Running just `gulp` will:
 * - Compile JS and CSS files
 * - Optimize and copy images to static folder
 * - Copy fonts to static folder
 * - Launch BrowserSync & watch files
 */
exports.default = gulp.series(
  vendor,
  gulp.parallel(js, css, fonts, images),
  gulp.parallel(server, watch)
);

/**
 * Build Task
 *
 * Running just `gulp build` will:
 * - Compile JS and CSS files
 * - Optimize and copy images to static folder
 * - Copy fonts to static folder
 */
exports.build = gulp.series(vendor, gulp.parallel(js, css, fonts, images));
