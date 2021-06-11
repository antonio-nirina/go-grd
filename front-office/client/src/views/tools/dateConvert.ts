
export const dateStringToStringFr = function(date: string){
		return new Date(date).toLocaleDateString("fr").toString()
}

export const dateStringToStringEn = function(date: string){
		return new Date(date).toLocaleDateString("en").toString()
}

export const dateStringToDHString = function(date: string){
	return new Date(date).toLocaleTimeString('fr-Fr', {
				day : 'numeric',
				month : 'short',
				year : 'numeric'
			})
}

export const dateStringToDHStringEN = function(date: string){
	return new Date(date).toLocaleTimeString('en', {
				day : 'numeric',
				month : 'short',
				year : 'numeric'
			})
}
export const dateStringToDHStringLong = function(date: string){
	return new Date(date).toLocaleTimeString('fr-Fr', {
				day : 'numeric',
				month : 'long',
				year : 'numeric'
			})
}
export const dateStringToDY = function(date: string){
	return new Date(date).toLocaleTimeString('fr-Fr', {
				day : 'numeric',
				month : 'long',
				year : 'numeric'
	}).split("à")
}
export const dateStringNoYear = function(date: string){
	return new Date(date).toLocaleTimeString('fr-Fr', {
		day : 'numeric',
		month : 'short',
	})
}
export const dateObject = function(date: any){
	return new Date(new Date(date).toLocaleTimeString('en', {
		day : 'numeric',
		month : 'short',
		year : 'numeric'
	})).toString()
}
