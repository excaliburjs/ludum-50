module.exports = {
    plugins: {
        "posthtml-expressions": {
            locals: {
                commitRef() {
                    return process.env.GITHUB_SHA || "local";
                },
                commitRefShort() {
                    return (process.env.GITHUB_SHA || "local").substring(0, 7)
                }
            },
        },
    },
};