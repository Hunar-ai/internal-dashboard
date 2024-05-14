import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default () => {
    return defineConfig({
        // depending on your application, base can also be "/"
        optimizeDeps: {
            exclude: ['js-big-decimal']
        },
        base: '/',
        plugins: [
            viteTsconfigPaths(),
            react({
                jsxImportSource: '@emotion/react',
                babel: {
                    plugins: ['@emotion/babel-plugin']
                }
            }),
            svgr()
        ],
        resolve: {
            // alias: [
            //     { find: '@', replacement: resolve(__dirname, './src') },
            //     {
            //         find: '@containers',
            //         replacement: resolve(__dirname, './src/containers')
            //     }
            // ]
            alias: {
                '@': path.resolve(__dirname, 'src'),
                containers: path.resolve(__dirname, 'src/containers'),
                // components: path.resolve(__dirname, './src/components'),
                components: '/src/components',
                'components/*': path.resolve(__dirname, './src/components/*'),
                Enum: path.resolve(__dirname, 'src/Enum'),
                enums: path.resolve(__dirname, 'src/enums'),
                utils: path.resolve(__dirname, 'src/utils'),
                hooks: path.resolve(__dirname, 'src/hooks'),
                contexts: path.resolve(__dirname, 'src/contexts'),
                api: path.resolve(__dirname, 'src/api'),
                useValidationHelper: path.resolve(
                    __dirname,
                    'src/useValidationHelper'
                ),
                middleware: path.resolve(__dirname, 'src/middleware'),
                interfaces: path.resolve(__dirname, 'src/interfaces'),
                App: path.resolve(__dirname, 'src/App'),
                Constants: path.resolve(__dirname, 'src/Constants'),
                useHelper: path.resolve(__dirname, 'src/useHelper'),
                'components/common/': path.resolve(
                    __dirname,
                    'src/components/common/'
                )
            }
        },

        server: {
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000
            port: 3000
        }
    });
};
