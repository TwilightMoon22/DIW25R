const { src, dest, watch, series, parallel } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    //compilar sass
    //pasos: 1 - identificar archivo, 2 - Compilarla, 3 - Guardar el .css
    src('src/scss/app.scss')
        .pipe(sass())
        //.pipe(sass({outputStyle: 'compressed'})) // con esto le decimos que queremos que el css nos lo haga comprimido, que ocupe lo mínimo
        .pipe(postcss([autoprefixer()])) // para dar soporte a navegadores antiguos que he tenido que especificar en el package.json
        .pipe(dest('build/css')) // este es el archivo que debe compilar
    done();
}

function imagenes() {
    return src("src/img/**/*")
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest("build/img"));
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"));
}

function versionAvif() {
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif())
        .pipe(dest("build/img"));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = dev;

// Tarea por defecto que ejecuta primero css y luego dev
exports.default = series(imagenes, versionWebp, versionAvif, css, dev); // Mejor series, para que compile primero, y luego se quede escuchando. La tarea con los
//watch siempre la última

//series -  lanza las tareas una detrás de otra, hasta que no termina una no empieza la otra
//parallel -  las lanza a la vez, no espera. 