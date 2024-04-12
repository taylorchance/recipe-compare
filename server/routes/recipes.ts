// import { parseIngredient, parseInstruction } from '@jlucaspains/sharp-recipe-parser'
import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const findMatches = (arr1, arr2) => {
  let ignoreWords = ['chopped', 'red', 'white', ')', '(']

  arr1.forEach(item1 => {
    const wordsArray1 = item1.ingredient.toLowerCase().split(" ")
    arr2.forEach(item2 => {
      const wordsArray2 = item2.ingredient.toLowerCase().split(" ")
      // const intersection = wordsArray2.filter(word => wordsArray1.includes(word))
      const intersection = wordsArray2.filter(word => wordsArray1.includes(word) && !ignoreWords.includes(word))

      intersection.forEach(word => ignoreWords.push(word))

      if (intersection.length) {
        item1.matches = intersection
        item2.matches = intersection
      }
    })
  })

  return [arr1, arr2]
}

export default defineEventHandler(async (event ) => {
  const { url1, url2 } = getQuery(event) as { url1: string, url2: string }

  if (!url1 || !url2) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide 2 URLs.'
    })
  }

  const recipe1 = await $fetch('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: url1
    }
  })

  const recipe2 = await $fetch('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: url2
    }
  })

  const ingredients1 = recipe1.recipeIngredient.map(ingredient => 
    parseIngredient(ingredient, 'en')
  )
  console.log('ingredients1', ingredients1)
  
  const ingredients2 = recipe2.recipeIngredient.map(ingredient => 
    parseIngredient(ingredient, 'en')
  )

  const [matchedIngredients1, matchedIngredients2] = findMatches(ingredients1, ingredients2)  

  return [
    { ingredients: matchedIngredients1, ...recipe1 },
    { ingredients: matchedIngredients2, ...recipe2 }

  ]
})
