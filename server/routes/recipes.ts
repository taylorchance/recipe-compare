import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const findMatches = (arr1: IParsedIngedient[], arr2: IParsedIngedient[]) => {
  let ignoreWords = ['chopped', 'red', 'white', ')', '(', 'fresh', 'freshly', 'powder', 'ground']

  arr1.forEach(item1 => {
    const wordsArray1 = item1.ingredient.toLowerCase().split(" ")
    arr2.forEach(item2 => {
      const wordsArray2 = item2.ingredient.toLowerCase().split(" ")
      // const matches = wordsArray2.filter(word => wordsArray1.includes(word))
      const matches = wordsArray2.filter((word: string) => wordsArray1.includes(word) && !ignoreWords.includes(word))
      const partials = wordsArray2.filter((word: string) => wordsArray1.includes(word) && ignoreWords.includes(word))

      matches.forEach((word: string) => ignoreWords.push(word))
      if (matches.length) {
        item1.matches = matches
        item2.matches = matches
      }
      if (partials.length) {
        item1.partials = partials
        item2.partials = partials
      }
    })
  })

  return [arr1, arr2]
}

const sortMatches = (arr: IParsedIngedient[]) => {
  return arr.sort((a, b) => {
    const aMatchCount = !a.matches ? 0 : a.matches.reduce((total: number, string: string) => total + string.length, 0)
    const bMatchCount = !b.matches ? 0 : b.matches.reduce((total: number, string: string) => total + string.length, 0)
    if (bMatchCount !== aMatchCount) {
      return bMatchCount - aMatchCount
    } else if (bMatchCount && aMatchCount) {
      return a.matches[0].localeCompare(b.matches[0])
    } else {
      return 0
    }
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

  const ingredients1 = recipe1.recipeIngredient.map(ingredient => parseIngredient(ingredient.replace('/', 'or'), 'en'))
  const ingredients2 = recipe2.recipeIngredient.map(ingredient => parseIngredient(ingredient.replace('/', 'or'), 'en'))

  // return [
  //   { ...recipe1, ingredients: ingredients1 },
  //   { ...recipe2, ingredients: ingredients2 },
  // ]

  const [matchedIngredients1, matchedIngredients2] = findMatches(ingredients1, ingredients2)
  
  sortMatches(matchedIngredients1)
  sortMatches(matchedIngredients2)

  return [
    { ...recipe1, ingredients: matchedIngredients1 },
    { ...recipe2, ingredients: matchedIngredients2 }
  ]
})
