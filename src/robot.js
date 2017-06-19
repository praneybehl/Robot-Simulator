'use strict';

/**
 * The max coordinates of the table
 * @type {{x: number, y: number}}
 */
const cordsMax = { x: 5, y: 5 };

/**
 * List of valid Directions.
 * @type {[*]}
 */
const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

/**
 * Directions map to assist the robot to rotate.
 * @type {{north: {left: string, right: string}, east: {left: string, right: string}, south: {left: string, right: string}, west: {left: string, right: string}}}
 */
const map = {
	NORTH: {
		left: "WEST",
		right: "EAST"
	},
	EAST: {
		left: "NORTH",
		right: "SOUTH"
	},
	SOUTH: {
		left: "EAST",
		right: "WEST"
	},
	WEST: {
		left: "SOUTH",
		right: "NORTH"
	}
};

/**
 * Class Robot
 * @constructor
 */
class Robot {

	constructor() {
		this.x = null;
		this.y = null;
		this.f = null;
		this.isPlaced = false;
	}

	/**
	 * Place the robot on table to a valid coordinate.
	 * @param {Array} args - Arguments passed for placement of the robot.
	 * @returns {Robot}
	 */
	place(args) {
		let [x, y, f] = args;

		 // Validate argument values.
		if(this.validateX(x) && this.validateY(y) && this.validateF(f) ) {
			// Modify robot position.
			this.isPlaced = true;
			this.x = x;
			this.y = y;
			this.f = f;
		}
		return this;
	}

	/**
	 * Moves the robot 1 unit in the direction it's facing.
	 * @returns {Robot}
	 */
	move() {

		if(!this.isPlaced) {
			console.log(`'MOVE' command ignored, Robot not place on the table.`);
			return this;
		}

		switch (this.f) {
			case "NORTH":
				this.validateY(this.y + 1) ? this.y += 1 : "";
				break;

			case "EAST":
				this.validateX(this.x + 1) ? this.x += 1 : "";
				break;

			case "SOUTH":
				this.validateY(this.y - 1) ? this.y -= 1 : "";
				break;

			case "WEST":
				this.validateX(this.x - 1) ? this.x -= 1 : "";
				break;
		}
		return this;
	}

	/**
	 * Rotates the robot left to it's current direction.
	 * @returns {Robot}
	 */
	left() {

		if(!this.isPlaced) {
			console.log(`'LEFT' command ignored, Robot not place on the table.`);
			return this;
		}

		this.f = map[this.f].left;

		return this;
	}

	/**
	 * Rotates the robot right to it's current direction.
	 * @returns {Robot}
	 */
	right() {

		if(!this.isPlaced) {
			console.log(`'RIGHT' command ignored, Robot not place on the table.`);
			return this;
		}
		this.f = map[this.f].right;

		return this;
	}

	/**
	 * Output the robot's current x, y, and facing direction.
	 * @returns {Robot}
	 */
	report() {

		if(this.isPlaced) {
			console.log(`Output: ${this.x},${this.y},${this.f}`);
		} else console.log(`Robot not place on the table. Try placing the robot on the table again`);
		return this;
	}

	/**
	 * Validate X coordinate value.
	 * @param {number} x - Value of X coordinate.
	 * @returns {boolean}
	 */
	validateX(x) {

		if(isNaN(x) || x < 0 || x > cordsMax.x) {
			!this.isPlaced ? console.log(`Please enter a valid X coordinate value. Hint: Use a number between 0 and ${cordsMax.x}`) : "";
			return false;
		} else return true;
	}

	/**
	 * Validate Y coordinate value.
	 * @param {number} y - Value of Y coordinate.
	 * @returns {boolean}
	 */
	validateY(y) {

		if(isNaN(y) || y < 0 || y > cordsMax.y) {
			!this.isPlaced ? console.log(`Please enter a valid Y coordinate value. Hint: Use a number between 0 and ${cordsMax.y}`) : "";
			return false;
		} else return true;
	}

	/**
	 * Validate Facing direction value.
	 * @param {string} f - Value of Facing direction.
	 * @returns {boolean}
	 */
	validateF(f) {

		if(directions.indexOf(f) === -1) {
			!this.isPlaced ? console.log("Please enter a valid facing direction. Hint: Use UPPERCASE") : "";
			return false;
		} else return true;
	}

	/**
	 * Process commands
	 * @param {Array} cmdList - List of commands data parsed from user input/file.
	 */
	process(cmdList) {

		cmdList.forEach(cmd => {
			cmd.args ? this[cmd.name](cmd.args)
				: this[cmd.name]();
		});
	}

}

export default Robot;