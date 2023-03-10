import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import url from 'postcss-url';
import postcss from 'rollup-plugin-postcss';

export default [
    // browser-friendly UMD build
    {
        input: 'src/js/main.iife.js',
        dest: pkg.browser,
        paths: ['src/css'],
        output: {
            name: 'chocolat',
            format: 'iife',
            file: 'dist/js/chocolat.js'
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude: ['node_modules/**']
            }),
            postcss({
                extract: './dist/css/chocolat.css',
                plugins: [
                    url({
                        url: 'inline',
                    }),
                ],
            }),
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `targets` option which can specify `dest` and `format`)
    {
        input: 'src/js/main.esm.js',
        external: ['es6-promise/auto'],
        targets: [
            { dest: pkg.main, format: 'cjs' },
            { dest: pkg.module, format: 'es' }
        ],
        plugins: [
            babel({
                exclude: ['node_modules/**']
            })
        ]
    }
];