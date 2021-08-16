import gql from "graphql-tag"

export const CREATE_PAGE_ASSIST = gql`
mutation{createAsist(assistInput:{
  name:"Blog",
  content:{Title:"Title-game",TitleUnder:"Next-title",Incontent:"xxxxx"}
})}
`
