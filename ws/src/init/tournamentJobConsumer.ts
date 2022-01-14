import Queue from "bee-queue"

require('dotenv').config()
export const TournamentJob = function() {
	const options = {
		isWorker: false,
		sendEvents: false,
		redis: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
		},
	}

	const queue = new Queue('job_tournament', options)
	queue.on("succeeded",async function(job) {
		console.log(job)
	})

}
