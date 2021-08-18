# Ert

Consider Ert like a CLI; it's inspired by Next's `next.config.js` file style.
Ert allows you to run plain HTML files & static files on `localhost` with your own custom port.

## Configuration

To configure, open a new project folder and add a `ert.config.js` file, this will allow the CLI to communicate to your configuration.
This config file will be in Nodejs but if you're including Javascript files, you'll have to use Vanilla JS.

This is a boilerplate code for your `ert.config.js` file.
```js
if (!__dirname) __dirname = process.cwd();

module.exports = {
    static: `${__dirname}/public`,
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
```

Please consider the following things:

- The port must be a number, NOT A STRING, and must be an available TCP port.
- The `routes` key MUST be an array and has to contain at least 1 object inside of the array.
    - The `route` key is what your route will be; e.g. `localhost:4040/my_html_site`.
    - The `leadsFrom` key is the location of your file that will show what you want the `route` to show.
    - The `contentType` key is optional and the default is `text/html` (or `text/plain` for static files). This will be shown in the response header. The available values are the following:
    ```ts
  // Ignore the |
  | "text/html" // HTML Files
  | "text/css" // CSS Files
  | "text/xml" // XML Files
  | "text/plain" // Plain TXT Files or Strings
  | "application/json" // JSON Files/Response (e.g. API)
  | "application/javascript"; // Javascript (or Runnable Javascript w. Callback) Files
    ```
- The `static` key is optional and is used for making files like CSS and/or JS public and able to be imported from other HTML files. The value can be a string or an array full of strings.
### WARNING FOR STATIC KEY
If you are going to import a folder in the static value (i.e. `${__dirname}/public`, etc), it must NOT end with a `/` because in the code, the default way to scan a directory adds a `/` to the string automatically. Therefore there is no point of adding a `/` inside of the `ert.config.js` file.


### Running the CLI tool
As of right now, there is no portable/shell command that lets you do so; therefore you can run the file with `ts-node` or with `node` (with the compiled code).

Here are the 2 ways:

#### 1:
```sh
$ # Compile && Run node to run index file using argument (location of ert config file)
$ tsc && node build/src/index.js ~/path/to/ert.config.js
```

#### 2:
```sh
$ # Use NPX to run ts-node to run a file using argument (location of ert config file)
$ npx ts-node src/index.js ~/path/to/ert.config.js
$ # A bit slower than node
```