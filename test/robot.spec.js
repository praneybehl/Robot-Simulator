'use strict';


import Robot from "../src/robot";
import { expect, should } from 'chai';
import sinon from "sinon";

should();

describe("Robot", () => {

	let robot;

	beforeEach(() => {
		robot = new Robot();
	});

	/**
	 * Place robot function tests.
	 */
	it("should ignore all commands if not placed on the table.", () => {
		robot.move();
		robot.left();
		robot.right();
		robot.report();
		expect(robot.isPlaced).to.be.false;
		expect(robot.x).to.equal(null);
		expect(robot.y).to.equal(null);
		expect(robot.f).to.equal(null);
	});

	it("should ignore place commands that are not valid coordinate on the table.", () => {
		robot.place([2,4,"NORTH"]);
		robot.place([8,4,"WEST"]);
		expect(robot.x).to.equal(2);
		expect(robot.y).to.equal(4);
		expect(robot.f).to.equal("NORTH");
	});

	it("should be placed on valid coordinate on the table", () => {
		robot.place([2,4,"NORTH"]);
		expect(robot.isPlaced).to.be.true;
	});

	it("should place the robot to another valid positions if required.", () => {
		robot.place([0,0,"WEST"]);
		robot.move();
		robot.place([2,2,"SOUTH"]);
		expect(robot.x).to.equal(2);
		expect(robot.y).to.equal(2);
		expect(robot.f).to.equal("SOUTH");
	});


	/**
	 * Move robot function tests.
	 */
	it("should move 1 unit in the facing direction.", () => {
		robot.place([0,0,"EAST"]);
		robot.move();
		expect(robot.x).to.equal(1);
		expect(robot.y).to.equal(0);
		expect(robot.f).to.equal("EAST");
	});

	it("should ignore move command if moving forward will get it off the table.", () => {
		robot.place([0,0,"SOUTH"]);
		robot.move();
		expect(robot.x).to.equal(0);
		expect(robot.y).to.equal(0);
		expect(robot.f).to.equal("SOUTH");
	});


	/**
	 * Rotate robot function tests.
	 */
	it("should rotate left from the current facing direction.", () => {
		robot.place([0,0,"NORTH"]);
		robot.left();
		expect(robot.f).to.equal("WEST");
	});

	it("should rotate right from the current facing direction.", () => {
		robot.place([0,0,"NORTH"]);
		robot.right();
		expect(robot.f).to.equal("EAST");
	});

	/**
	 * Report function tests.
	 */

	it("should output its current position and facing direction when asked to report.", () => {
		let spy = sinon.spy(console, 'log');
		robot.place([1,2,"NORTH"]);
		robot.left();
		robot.report();
		robot.move();
		robot.report();
		expect(spy.called).to.be.true;
		expect(spy.callCount).to.equal(2);
		expect(spy.getCall(0).args[0].split(' ')[1]).to.equal('1,2,WEST');
		expect(spy.getCall(1).args[0].split(' ')[1]).to.equal('0,2,WEST');
		spy.restore();
	});


	/**
	 * Process commands tests.
	 */

	it('should run through the commands in series', () => {
		let spy = sinon.spy(console, 'log');
		robot.process([
			{
				name: 'place',
				args: [0, 0, 'NORTH']
			}, {
				name: 'move'
			}, {
				name: 'report'
			}
		]);
		expect(robot.x).to.equal(0);
		expect(robot.y).to.equal(1);
		expect(robot.f).to.equal("NORTH");
		expect(spy.called).to.be.true;
		expect(spy.getCall(0).args[0].split(' ')[1]).to.equal('0,1,NORTH');
		spy.restore();
	});




});
