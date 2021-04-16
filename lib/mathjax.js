"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
const yargs_1 = require("yargs");
const progress_1 = __importDefault(require("progress"));
const lodash_1 = __importDefault(require("lodash"));
const nargs = yargs_1.argv._.length;
const ncpus = lodash_1.default.floor(lodash_1.default.divide(os_1.default.cpus().length, 1.8));
const cpus = lodash_1.default.times(ncpus, lodash_1.default.constant(null));
const initial = lodash_1.default.times(cpus.length, lodash_1.default.constant([]));
const partitionSz = lodash_1.default.ceil(lodash_1.default.divide(nargs, cpus.length));
const boundaries = cpus.map((_, ncpu) => [
    partitionSz * ncpu,
    partitionSz * (ncpu + 1),
]);
const inPartition = (i, j) => i >= boundaries[j][0] && i < boundaries[j][1];
const plocate = (i) => cpus.reduce((result, _, p) => (inPartition(i, p) ? p : 0) + result, 0);
const partitionedArgv = yargs_1.argv._.reduce((result, arg, i) => {
    result[plocate(i)].push(arg);
    return result;
}, initial);
const pathMapper = (x) => lodash_1.default.map(x, (p) => path_1.default.resolve(__dirname, "..", p));
partitionedArgv.forEach(pathMapper);
let progress = new progress_1.default(`[${"TeX".green} ]: |:bar|`, {
    total: yargs_1.argv._.length,
    incomplete: " ",
});
Promise.all(partitionedArgv.map((partition) => {
    new Promise((resolve, reject) => {
        const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, "mathjax.js"), { workerData: partition });
        worker.on("error", (err) => reject);
        worker.on("exit", (code) => reject);
        worker.on("message", (ntimes) => {
            progress.tick(ntimes);
            resolve;
        });
    });
}));
