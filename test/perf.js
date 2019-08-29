const {expect} = require('chai');
const TyrDB = require('../src/types/TyrDB/TyrDB');
const {version} = require('../package.json');
const faker = require('faker');
const {each} = require('lodash');
const {randomBetweenMinAndMax} = require('../src/utils/math')
const {Timer} = require('../src/utils/time');
const Document = require('../src/types/Document/Document');
let benchmark = {
  writeElements: 100,
  getElements: 500,
  findElements: 500,
  writeOp: 0,
  findOp: 0,
  getOp: 0,
  readOp: 0,
  totalOp: 0,
  avgOps: 0,
  durations: {}
};

const client = new TyrDB();
let db
let col
let processWriteInt;
let processReadInt;
const fakeData = [];
const findParams = [];
const getElements = [];

while (fakeData.length < benchmark.writeElements) {
  fakeData.push(new Document({name: faker.fake("{{name.lastName}}")}))
}
while (findParams.length < benchmark.findElements) {
  const ran = randomBetweenMinAndMax(0, fakeData.length-1);
  findParams.push(fakeData[ran].data)
}
;
// while(getElements.length<benchmark.getElements){
// getElements.push(fakeData[randomBetweenMinAndMax(0, fakeData.length)])
// };

describe('Performance - Benchmark within test ', async function () {
  this.timeout(60000);
  before(async function () {
    db = await client.db('testdb');
    col = await db.collection('users');
  })
  it('should be fast', function (done) {
    const benchmarkTimer = new Timer();

    const startBenchmark = () => {
      benchmarkTimer.start();

      const jobs = [
        ['writeOp', benchmark.writeElements, () => col.insert(fakeData[benchmark.writeOp])],
        ['findOp', benchmark.findElements, () => col.find(findParams[benchmark.findOp])],
        ['readOp', benchmark.getElements,()=> col.get(getElements[benchmark.getOp])]
      ]

      each(jobs, (job) => {
        const timer = new Timer();
        timer.start();
        while (benchmark[job[0]] < job[1]) {
          performJob(job);
        }
        timer.stop();
        console.log(`Finished ${job[0]} in ${timer.duration.ms} ms [${benchmark[job[0]]}] ops`)
        benchmark.durations[job[0]] = timer.duration.ms
      })
      stopBenchmark()
    };
    const performJob = (job) => {
      job[2]();
      benchmark[job[0]] += 1;
      benchmark.totalOp += 1;
    }

    const stopBenchmark = () => {
      benchmarkTimer.stop();
      benchmark.duration = benchmarkTimer.duration.ms / 1000;

      // console.log(benchmark)
      benchmark.writeOps = benchmark.writeOp / (benchmark.durations.writeOp / 1000);
      benchmark.readOps = benchmark.readOp / (benchmark.durations.readOp / 1000);
      benchmark.findOps = benchmark.findOp / (benchmark.durations.findOp / 1000);

      benchmark.avgOps = (benchmark.writeOps + benchmark.readOps + benchmark.findOp) / 2

      done();
    };
    startBenchmark()
  });
  after(() => {
    console.log(`======== TyrDB ${version} - Benchmark from mocha`)
    console.log(`= Write : ${benchmark.writeOps} op/s`)
    console.log(`= Find : ${benchmark.findOps} op/s`)
    console.log(`= Read : ${benchmark.readOps} op/s`)
    console.log(`= Total : ${benchmark.totalOp} ops`)
    console.log(`= Duration : ${benchmark.duration} s`)
    console.log(`= Avg : ${benchmark.avgOps} /s`)
  })

});
