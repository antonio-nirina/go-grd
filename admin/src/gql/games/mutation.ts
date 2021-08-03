import gql from "graphql-tag"

export const CREATE_GAME = gql`
	mutation createdGame($name:String,$image:String,$logo:String,$notes:Int,$slug:String,$typeLogo:String,$typeImage:String){
		createdGame(name:$name,image:$image,logo:$logo,notes:$notes,slug:$slug,typeLogo:$typeLogo,typeImage:$typeImage)
	}
`
