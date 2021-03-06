# Robot simulator

My approach to the Robot simulation problem in javascript. 


## Usage Instructions:

Prerequisites:

This simulator requires Node.js and NPM to be installed on your system. For instructions on installing please visit: https://nodejs.org/en/
This project is written with EcmaScript2015(ES6) so running directly with node with result in errors. 

```sh
$ npm install
$ npm start -- test/data/sampleData1.txt
```
Or to run directly from terminal, install babel-cli globally and run :
```sh
$ npm install -g babel-cli
$ babel-node index.js -- test/data/sampleData1.txt
```
Or to run using commandline and provide commands one line at a time, run:

```sh
$ npm start
```
P.S. To exit the simulator use "Ctrl + c"

## Robot commands and valid format:

The simulator either accepts a .txt files, with one command per line or commandline input. 
The commands available are:

- **PLACE X, Y, DIRECTION (PLACE 0,1,NORTH):** Place the robot on the table.
- **MOVE:** Move the robot one unit in the direction it is facing
- **LEFT:** Turn the robot left
- **RIGHT:** Turn the robot right
- **REPORT:** Report the current position and direction of the robot (0,0,NORTH)

The table is a 5x5 grid, and any command that would result in the robot being off the table *will be ignored*.


## Tests

```sh
$ npm test
```

Test input files are available under ```test/data```. 

