const url = "http://localhost:4000/";

export const getProducts = (setCategories) => {
  let query = ` query{
        categories{
   name
  
  
 }
}   `
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query
    })
  }).then(
    res => res.json()
  ).then(cards => {
    setCategories(cards.data.categories)

  })


}

export const getCurrencies = () => {
  let query = ` query{
        currencies{
   label
   symbol
   
 }
}   `

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query
    })
  })


}

export const getProductById = (id) => {
  let query = `  query getProduct($id:String!){
        product(id:$id){
      
id
name
inStock
gallery
  

description
category
attributes{
  id
  name
  type
  items{
    displayValue
    id
    value
  }
}
prices{
  currency{
    label
    symbol
  }
  amount
}
brand
}
}
`

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query,
      variables: { id: id }
    })
  })


}

export const getCategoryByTitle = (title) => {
  let query = `    query getCategoryByTitle($input:CategoryInput!){
        category(input:$input){
      name
      products{
        id
        description
        inStock
        name
        gallery
        category
        brand
        attributes{
          id
          name
          type
          items{
            value
            displayValue
            id
          }
          
          
        }
        prices{
          amount
          currency{
            label
            symbol
          }
        }
      }

}
  }
`

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query,
      variables: { input: { title: title } }
    })
  })


}




