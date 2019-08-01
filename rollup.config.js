import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: './src/app.js',
    inlineDynamicImports: true,
    output: {
        file: './dist/bundle.js',
        format: 'cjs',
        name: 'bundle',
    },
    plugins: [
        resolve({
            mainFields: ['module', 'main'],
            browser: true,
        }),

        commonjs(),

        babel({
            exclude: 'node_modules/**'
        }),
    ]
}
