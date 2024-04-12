import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const findMatches = (arr1: IParsedIngedient[], arr2: IParsedIngedient[]) => {
  let ignoreWords = ['chopped', 'red', 'white', ')', '(']

  arr1.forEach(item1 => {
    const wordsArray1 = item1.ingredient.toLowerCase().split(" ")
    arr2.forEach(item2 => {
      const wordsArray2 = item2.ingredient.toLowerCase().split(" ")
      // const intersection = wordsArray2.filter(word => wordsArray1.includes(word))
      const intersection = wordsArray2.filter((word: string) => wordsArray1.includes(word) && !ignoreWords.includes(word))

      intersection.forEach((word: string) => ignoreWords.push(word))
      if (intersection.length) {
        item1.matches = intersection
        item2.matches = intersection
      }
    })
  })

  return [arr1, arr2]
}

const sortMatches = (matches: IParsedIngedient[]) => {
  return matches.sort((a, b) => {
      const aMatchCount = !a.matches ? 0 : a.matches.reduce((total: number, string: string) => total + string.length, 0)
      const bMatchCount = !b.matches ? 0 : b.matches.reduce((total: number, string: string) => total + string.length, 0)
      return bMatchCount - aMatchCount
    })
}

export default defineEventHandler(async (event ) => {
  const { url1, url2 } = getQuery(event) as { url1: string, url2: string }

  if (!url1 || !url2) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide 2 URLs.'
    })
  }

  const recipe1 = await $fetch<IRecipe>('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: url1
    }
  })

  const recipe2 = await $fetch<IRecipe>('https://recipe-scraper-pink.vercel.app/scrape', {
    params: {
      url: url2
    }
  })

  const ingredients1 = recipe1.recipeIngredient.map(ingredient => parseIngredient(ingredient, 'en'))
  const ingredients2 = recipe2.recipeIngredient.map(ingredient => parseIngredient(ingredient, 'en'))

  const [matchedIngredients1, matchedIngredients2] = findMatches(ingredients1, ingredients2)
  
  sortMatches(matchedIngredients1)
  sortMatches(matchedIngredients2)

  return [
    { ...recipe1, ingredients: matchedIngredients1 },
    { ...recipe2, ingredients: matchedIngredients2 }
  ]
})
