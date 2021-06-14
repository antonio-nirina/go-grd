import {NotifiUser} from "../user/controller/friendController"
import {User} from "../user/entities/user"

export const Query = {
	NotifiUser: async (obj: any,{user}:{user: User}) => NotifiUser(user),
}
