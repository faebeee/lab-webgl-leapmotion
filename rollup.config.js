import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: './src/app.js',
    inlineDynamicImports: true,
    output: {
        file: './dist/bundle.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({
            mainFields: ['module', 'main'],
            browser: true,

        }),
    ]
}
