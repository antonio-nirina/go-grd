export const loadState 	=  function() {
	const user :string | null = localStorage.getItem("userConnected")
	let storage = {
		userConnected:{
			user:{}
		},
	}

	if(user){
		storage.userConnected.user = JSON.parse(user)
	}

	return storage
}

export const saveState = function(state:any,name:string) {
	const serializedState = JSON.stringify(state)
	localStorage.setItem(name, serializedState)
}
