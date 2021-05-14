const EN = require("./en.json")
const FR = require("./fr.json")

export const Translation = (language:string|"undifined") => {
	if (language === "en") {
	  return EN
	} else {
	  return FR
	}
  }
