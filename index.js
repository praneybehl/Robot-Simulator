
import Robot from "./src/robot";
import InputReader from "./src/inputReader";
import * as readline from "readline";
import color from "colors-cli/safe";

const robot = new Robot(),
	inputReader = new InputReader();


const inputFile = process.argv[2] || null;

if(inputFile) {
	inputReader.readFile(inputFile, (err, rawCommands) => {
		err ? console.log(color.red.bold(err)) : "";

		inputReader.parseInputCommands(rawCommands, (err, parsedArray) => {
			err ? console.log(color.red.bold(err)) : "";

			robot.process(parsedArray);
		});
	});
}else {
	console.log(color.cyan.bold(`No file passed. Starting commandline interface`));
	console.log(`Please enter a command for the Robot`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on('line', (input) => {
		robot.process([inputReader.parseRawCommand(input)]);
	});
}