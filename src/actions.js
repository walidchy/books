export const acheter=(book)=>{
    return {type:"acheter",payload:book}
}
export const fav=(book)=>{
    return {type:"fav",payload:book}
}
export const supprimer=(id)=>{
    return {type:"supprimer",payload:id}
}
export const supprimerF=(id)=>{
    return {type:"supprimerr",payload:id}
}
