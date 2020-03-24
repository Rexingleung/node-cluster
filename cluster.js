const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
// const worker = cluster.fork();
const process = require('process');
const log4js = require('log4js');
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'cheese.log',
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'info',
        }
    }
})
// 原生进程守卫
const workers = {};
if (!cluster.isMaster) { // 如果不是主进程进来，则为 true, 就创建进程。 这是由 process.env.NODE_UNIQUE_ID 决定的。 如果 process.env.NODE_UNIQUE_ID 未定义，则 isMaster 为 true。

    cluster.on('death', function (worker) {
        worker = cluster.fork(); // 相当于复制进程
        workers[worker.id] = worker;
        for (let i = 0; i < numCPUs; i++) {
            const worker = cluster.fork();
            workers[worker.pid] = worker
        }
    })
} else {
    const app = require('./app');
    app.use(async (ctx, next) => {
        // console.log(`work ${cluster.worker.id} , PID:${process.pid}`);
        console.log(worker.id);
        console.log(worker.process.pid);
        console.log(numCPUs, 'numCPUs');


        // console.log('work' + cluster.worker.id + ', PID:' +  process.pid);

        next();
    })
    app.listen(3000);
    console.log('3000');

}
process.on('SIGTERM', function () {
    for (let pid in workers) {
        process.kill(pid)
    }
    process.exit(0)
})
require('./test')