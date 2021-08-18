if (!__dirname) __dirname = process.cwd();

module.exports = {
    static: [
        // Must NOT end w. /
        `${__dirname}/public`,
        `${__dirname}/test`
    ],
    routes: [
        {
            route: "/",
            leadsFrom: `${__dirname}/pages/index.html`,
            contentType: "text/html"
        },
        {
            route: "/test",
            leadsFrom: `${__dirname}/pages/bye.txt`,
            contentType: "text/plain"
        }
    ],
    port: 4040,
}