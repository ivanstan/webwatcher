var Encore = require('@symfony/webpack-encore');
var webpack = require('webpack');

Encore
// the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build').
    cleanupOutputBeforeBuild().
    enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('js/main', './assets/js/main.js').
    addEntry('js/monaco',
        './node_modules/monaco-editor/esm/vs/editor/editor.main.js').
    addStyleEntry('css/main', './assets/scss/main.scss')

    // uncomment if you use Sass/SCSS files
    .enableSassLoader(function(sassOptions) {
    }, {
      resolveUrlLoader: false,
    }).
    enableTypeScriptLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    .autoProvidejQuery()
;

var config = Encore.getWebpackConfig();
config = Object.assign(config,
    {'node': {'fs': 'empty'}},
);

module.exports = config;
