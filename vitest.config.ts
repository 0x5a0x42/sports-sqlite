import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,                      // so you can use describe/it without importing
        environment: 'node',                // run tests in a Node.js-like environment
        include: ['src/test/**/*.test.ts'], // where Vitest will look for test files
        exclude: ['node_modules', 'dist'],  // optional, to skip these folders
        clearMocks: true,                   // automatically clear mocks between tests
        coverage: {
            provider: 'istanbul',           // use Istanbul for coverage reports
            reporter: ['text', 'lcov'],     // output formats: console text + lcov file
            include: ['src/**/*.ts'],       // which files to include in coverage
            exclude: ['src/tests/**'],      // skip test files themselves
        }
    }
});
