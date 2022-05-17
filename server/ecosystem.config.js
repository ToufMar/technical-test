export default {
    apps: [
        {
            name: 'test-tech',
            script: "./build/index.js",
            instances: "max",
            exec_mode: "cluster"
        }
    ]
}