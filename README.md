## Requirements
Create serverless AWS application with 2 endpoints:
- generate random number
- show previously generated numbers

SNS should be used.

Create a state machine using `StepFunctions` service where a random number is generated and sent to one of the queues
based on some conditions.

## Configuration
Set up `serverless-random` profile in your aws credentials file.

## Install and Deploy
```
$ npm ci
$
$ cd services/<each service>
$ npm ci
$ serverless deploy
```