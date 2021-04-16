import "colors";
import os from "os";
import path from "path";
import { Worker } from "worker_threads";
import { argv } from "yargs";
import ProgressBar from "progress";
import _ from "lodash";

const nargs: number = argv._.length;
const ncpus: number = _.floor(_.divide(os.cpus().length, 1.8));
const cpus: null[] = _.times(ncpus, _.constant(null));
const initial: string[][] = _.times(cpus.length, _.constant([]));
const partitionSz: number = _.ceil(_.divide(nargs, cpus.length));
const boundaries: number[][] = cpus.map((_: any, ncpu: number) => [
  partitionSz * ncpu,
  partitionSz * (ncpu + 1),
]);
const inPartition = (i: number, j: number): boolean =>
  i >= boundaries[j][0] && i < boundaries[j][1];
const plocate = (i: number): number =>
  cpus.reduce((result, _, p) => (inPartition(i, p) ? p : 0) + result, 0);
const partitionedArgv: string[][] = argv._.reduce((result, arg, i) => {
  result[plocate(i)].push(arg as string);
  return result;
}, initial);

const pathMapper = (x: string[]) => _.map(x, (p: string) => path.resolve(__dirname, "..", p));
partitionedArgv.forEach(pathMapper);

let progress = new ProgressBar(`[${"TeX".green} ]: |:bar|`, {
  total: argv._.length,
  incomplete: " ",
});

Promise.all(
  partitionedArgv.map((partition: string[]) => {
    new Promise((resolve, reject) => {
      const worker = new Worker(path.resolve(__dirname, "mathjax.js"), { workerData: partition });
      worker.on("error", (err: any) => reject);
      worker.on("exit", (code: any) => reject);
      worker.on("message", (ntimes: number) => {
        progress.tick(ntimes);
        resolve;
      });
    });
  })
);
