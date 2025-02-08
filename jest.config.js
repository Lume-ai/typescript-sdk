module.exports = {
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
        }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: [
        "<rootDir>/tests/active/**/*.test.ts"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(p-limit|yocto-queue)/)"
    ]
}; 