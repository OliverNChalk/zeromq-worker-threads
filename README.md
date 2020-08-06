
## Summary
I was trying to use zeromq within `worker_threads` to setup a microservice architecture and was running into whenever
 one of the `work_threads` exited. This repo shows the different scenarios, mainly the crashes variant is what is of
  interest.

### Setup
 - `npm install`

### Available Scenarios
 - `node worker_threads/crashes`
 - `node worker_threads/exits`
 - `node worker_threads/hangs`
 - `node clustering/exits`
 - `node clustering/hangs`
