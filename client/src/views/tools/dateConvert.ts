
export const dateStringToStringFr = function(date: string){
		return new Date(date).toLocaleDateString("fr").toString()
}

export const dateStringToStringEn = function(date: string){
		return new Date(date).toLocaleDateString("en").toString()
}

export const dateStringToDHString = function(date: string){
	return new Date(date).toLocaleTimeString('fr-Fr', {
				day : 'numeric',
				month : 'numeric',
				year : 'numeric',
				hour:"numeric",
				minute:"numeric"
			})
}

export const dateStringToDHStringEN = function(date: string){
	return new Date(date).toLocaleTimeString('en', {
				day : 'numeric',
				month : 'numeric',
				year : 'numeric',
				hour:"numeric",
				minute:"numeric"
			})
}
export const dateStringToDHStringLong = function(date: string){
	return new Date(date).toLocaleTimeString('fr-Fr', {
				day : 'numeric',
				month : 'long',
				year : 'numeric',
				hour:"2-digit",
				minute:"numeric"
			})
}
export const dateStringToDY = function(date:any){
	return new Date(date).toLocaleTimeString('fr-Fr', {
				day : 'numeric',
				month : 'short',
				year : 'numeric',
				hour:"2-digit",
				minute:"numeric"
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

export const dateStringToDYEn = function(date:string){
	return new Date(date).toLocaleTimeString('en', {
				day : 'numeric',
				month : 'short',
				year : 'numeric',
				hour:"2-digit",
				minute:"numeric"
	}).replace(/PM|AM/,"").trim()
}
