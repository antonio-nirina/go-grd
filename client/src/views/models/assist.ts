export interface Assist {
	uid:string
	title:string
	underTitle:Subject[]
	statut:boolean
}

interface Subject {
	title:string
	content:string
	tag:string
}
