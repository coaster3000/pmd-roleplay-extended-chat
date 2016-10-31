	//SCHEDULAR MODULE START
	
	class Task {
		constructor(schedular, cmd, delay) {
			this.schedular = schedular;
			this.cmd = cmd;
			this.delay = delay;
			this.args = [].slice.apply(arguments).slice(2);
			this.nextTaskID = -1;
			this.taskID = -1;
		}
		
		schedule() {
			if (this.taskID !== -1) cancel();
			this.taskID = setTimeout(this.cmd, this.delay, this.args);
			this.nextTaskID = setTimeout(this.schedular.tick.bind(this.schedular), this.delay);
			
			return this;
		}
		
		cancel() {
			clearTimeout(this.taskID);
			clearTimeout(this.nextTaskID);
		}
	}
	
	class Schedular {
		constructor() {
			this.running = false;
			this.tasks = [];
		}
		
		addTask(arg0, arg1) {
			if (arguments.length == 1) {
				this.tasks.push(arg0);
				if (!this.running) {
					this.tick();
					this.running = true;
				}
				return this;
			} else {
				return this.addTask(new Task(this, arg0, arg1, [].slice.apply(arguments).slice(2)));
			}
		}
		
		tick() {
			if (this.tasks.length > 0) {
				this.currentTask = this.tasks.shift();
				if (this.currentTask !== null) {
					try {
						this.currentTask.schedule();
					} catch (err) {
						console.log("An error occurred while attempting to schedule a task! Is it not a task object?");
						console.log("Throwing away invalid task object!");
						return this.tick();
					}
				}
			} else {
				this.running = false;
			}
			return this;
		}
		
		stop() {
			if (this.currentTask !== null && this.running) {
				try {
					this.currentTask.cancel();
				} catch (err) {
					console.log("How did that happen? Error occurred while canceling a task!");
					console.log("Whose playing with my api?");
				}
			}
			return this;
		}
	}
	
	