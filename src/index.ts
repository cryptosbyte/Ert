import Ert from "./Ert";

// e.g. ~/ert.config.js
const ertConfig = require(process.argv[2]);

new Ert(ertConfig).start();