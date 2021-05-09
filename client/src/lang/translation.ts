const EN = require("./en.json")
const FR = require("./fr.json")

export const Translation = (language:string|"undifined") => {
	if (language === "undifined") {
		return FR
	}
	if (language === "en") {
	  return EN
	}
	if (language === "fr") {
	  return FR
	}
  }
