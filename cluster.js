const cluster = require('cluster');
const sticky = require('sticky-session');
const os = require('os');
const app = require('./app'); // Assuming your Express app instance is exported from app.js
const PORT = 4000;

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  // Fork workers
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  // Worker process
  const server = app.listen(PORT + cluster.worker.id - 1, () => {
    console.log(`Worker ${cluster.worker.id} listening on port ${server.address().port}`);
  });

  // Use sticky-session to handle session affinity
  sticky.listen(server);
}
