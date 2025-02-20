import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    // plugins: [
    //     laravel({
    //         input: ['resources/css/app.css', 'resources/js/app.js'],
    //         refresh: true,
    //     }),
    // ],
    plugins: [
        laravel({
            input: ['resources/js/main.tsx'],
            refresh: true,
        }),
        react({
            jsxRuntime: 'automatic', // Ensures the correct JSX runtime is used
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
});
