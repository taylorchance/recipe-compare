<script setup>
const ingredients1 = [
  "1 tablespoon vegetable oil",
  "3 tablespoons butter plus 1 tablespoon for tossing the pasta",
  "1/2 cup chopped onion",
  "2/3 cup chopped celery",
  "2/3 cup chopped carrot",
  "3/4 pound ground beef chuck (or you can use 1 part pork to 2 parts beef)",
  "Salt",
  "Black pepper, ground fresh from the mill",
  "1 cup whole milk",
  "Whole nutmeg",
  "1 cup dry white wine",
  "1 1/2 cups canned imported Italian plum tomatoes, cut up, with their juice",
  "1 1/4 to 1 1/2 pounds pasta",
  "Freshly grated parmigiano-reggiano cheese at the table"
]

const ingredients2 = [
  "1 1/2 tbsp olive oil",
  "2  garlic cloves (, minced)",
  "1  onion (, finely chopped (brown, yellow or white))",
  "1 lb / 500g   beef mince (ground beef) (OR half pork, half beef (Note 1))",
  "1/2 cup (125 ml)  dry red wine ((sub water or beef broth/stock))",
  "2  beef bouillon cubes (, crumbled OR granulated beef bouillon (Note 2))",
  "800g / 28 oz  can crushed tomato ((or tomato passata))",
  "2 tbsp tomato paste",
  "2 tsp white sugar (, if needed (Note 3))",
  "2 tsp Worcestershire sauce",
  "2  dried bay leaves",
  "2  sprigs fresh thyme ((or 1/2 tsp dried thyme or oregano))",
  "Salt and pepper",
  "400 g / 13 oz   spaghetti (, dried)",
  "Parmesan cheese (and finely chopped parsley (optional))"
]

import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const parsedIngredients1 = ingredients1.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})

const parsedIngredients2 = ingredients2.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})

console.log('parsedIngredients2', parsedIngredients2)



const reorder = (arr1, arr2) => {
  let ignoreWords = ['chopped', 'red', 'white']

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

  return [
    arr1,
    arr2
  ]
}

const [reorderedIngredients1, reorderedIngredients2] = reorder(parsedIngredients1, parsedIngredients2)
</script>

<template>
  
  <h1 class="title has-text-centered mb-3">Original:</h1>
  <div class="columns">
    <div class="column">
      <p v-for="ingredient in ingredients1" :key="ingredient" class="ingredient">
        {{ ingredient }}
      </p>
    </div>
    <div class="column">
      <p v-for="ingredient in ingredients2" :key="ingredient" class="ingredient">
        {{ ingredient }}
      </p>
    </div>
  </div>

  <h1 class="title has-text-centered mb-3">Reordered:</h1>
  <div class="columns">
    <div class="column">
      <!-- <Parse
        v-for="ingredient in reorderedIngredients1"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      /> -->

      <List :list="reorderedIngredients1" />
    </div>
    <div class="column">
      <List :list="reorderedIngredients2" />

      <!-- <Parse
        v-for="ingredient in reorderedIngredients2"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      /> -->
    </div>
  </div>
</template>