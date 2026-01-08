const {defineConfig} = require('@playwright/test');

module.exports = defineConfig({
    testDir:"./testing/api",
    use:{
        baseURL:"http://localhost:4000",
        extraHTTPHeaders: {
            authorization: "Bearer valid-token",
            "Content-Type": "application/json",
        }
    }
})