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

const ignoreWords = ['1', '1/2', 'cup', '(or', '2', 'fresh', 'dry', 'chopped'];

import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const parsedIngredients1 = ingredients1.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})

const parsedIngredients2 = ingredients2.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})

const reorder = (arr1, arr2) => {
  console.log('arr1', arr1)
  // return [
  //   [],
  //   []
  // ]

  arr1.forEach(item1 => {
    const wordsArray1 = item1.ingredient.toLowerCase().split(" ")
    arr2.forEach(item2 => {
      const wordsArray2 = item2.ingredient.toLowerCase().split(" ")
      const intersection = wordsArray2.filter(word => wordsArray1.includes(word))
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

  return [
    arr1.sort((a, b) => {
        // Check if 'matches' property exists in each object
        const aHasMatches = a.matches && a.matches.length > 0;
        const bHasMatches = b.matches && b.matches.length > 0;

        // Objects with 'matches' come first
        if (aHasMatches && !bHasMatches) {
            return -1;
        } else if (!aHasMatches && bHasMatches) {
            return 1;
        } else {
            return 0; // Maintain order if both have or don't have matches
        }
    }),
        arr2.sort((a, b) => {
        // Check if 'matches' property exists in each object
        const aHasMatches = a.matches && a.matches.length > 0;
        const bHasMatches = b.matches && b.matches.length > 0;

        // Objects with 'matches' come first
        if (aHasMatches && !bHasMatches) {
            return -1;
        } else if (!aHasMatches && bHasMatches) {
            return 1;
        } else {
            return 0; // Maintain order if both have or don't have matches
        }
    })
  ]
}

const [reorderedIngredients1, reorderedIngredients2] = reorder(parsedIngredients1, parsedIngredients2);
console.log('reorderedIngredients1', reorderedIngredients1)
console.log('reorderedIngredients2', reorderedIngredients2)
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
      <!-- <p v-for="{ ingredient } in reorderedIngredients1" :key="ingredient" class="ingredient">
        {{ ingredient }}
      </p> -->
      <Parse
        v-for="ingredient in reorderedIngredients1"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      />
    </div>
    <div class="column">
      <!-- <p v-for="{ ingredient } in reorderedIngredients2" :key="ingredient" class="ingredient">
        {{ ingredient }}
      </p> -->
      <Parse
        v-for="ingredient in reorderedIngredients2"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      />
    </div>
  </div>

  <!-- <Reorder
    :array1="array1"
    :array2="array2"
  /> -->
</template>