import {runTaskTournament} from "../../cron/task-match"
import {User} from "../entities/user"

export const NotifiUser = async function(user:User) : Promise<User> {
	console.log(user)
	const sec: number | string = "*/1"
	const min: number | string = "*" // timesRun.getMinutes()
	const hours: number | string = "*" // timesRun.getHours()
	const day: number | string = "*" // timesRun.getDate()
	const month: number | string = "*" //timesRun.getMonth()
	const daysWeek:any = "*"
	runTaskTournament(sec, min, hours, day, month,daysWeek)

	return user
}
