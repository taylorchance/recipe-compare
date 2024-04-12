<script setup>
const array1 = [
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
  "Freshly grated parmigiano-reggiano cheese at the table",
  "2  garlic cloves"
]

const array2 = [
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
console.log('array2 length', array2.length)

import { parseIngredient } from '@jlucaspains/sharp-recipe-parser'

const parsedIngredients1 = array1.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})
// .slice(0, 6)
// console.log('parsedIngredients1', parsedIngredients1)

const parsedIngredients2 = array2.map(ingredient => {
  return parseIngredient(ingredient, 'en')
})
// .slice(0, 6)
console.log('parsedIngredients2', parsedIngredients2)



const reorderArraysByIngredient = (array1, array2) => {
  const ignoreList = ['for', 'or', 'and', 'chopped', 'mince']
  
  const matchingItems1 = []
  const matchingItems2 = []
  const remainingItems1 = []
  const remainingItems2 = []

  array1.forEach(item1 => {
    const ingredientPattern = new RegExp(item1.ingredient.split(' ')
      .filter(word => !ignoreList.includes(word))
      .join(' '), 'i')

    // Find the corresponding item in the second array by searching for the matching word in the ingredient key
    const matchingItemIndex = array2.findIndex(item2 => item1.ingredient.includes(item2.ingredient.split(' ')[0]));
    
    // const match =  ingredientPattern.test(item2.ingredient)
    // console.log('match', match)


    
    // const matchingString = item2.ingredient.match(ingredientPattern)[0];


    if (matchingItemIndex !== -1) {
      const matchingItem = array2.find(item2 => ingredientPattern.test(item2.ingredient))
      console.log('matchingItem', matchingItem)
      
      matchingItems1.push(item1)
      matchingItems2.push(array2[matchingItemIndex])
      // Remove the matched item from the second array to avoid duplicates
      array2.splice(matchingItemIndex, 1)
    } else {
      // If no matching item is found, push it into the remaining items array
      remainingItems1.push(item1)
    }
  })
  // Push any remaining items from the second array into the remaining items array
  remainingItems2.push(...array2)

  return [
    matchingItems1.concat(remainingItems1),
    matchingItems2.concat(remainingItems2)
  ]
}





// function reorderArraysByIngredient2(array1, array2) {
//     // Create arrays to hold matching and non-matching items
//     const matchingItems1 = [];
//     const matchingItems2 = [];
//     const remainingItems1 = [];
//     const remainingItems2 = [];

//     // Iterate over each item in the first array
//     array1.forEach(item1 => {
//         // Find the corresponding item in the second array by searching for the matching word in the ingredient key
//         const matchingItemIndex = array2.findIndex(item2 => item1.ingredient.includes(item2.ingredient.split(' ')[0]));

//         if (matchingItemIndex !== -1) {
//             // If a matching item is found, push it into the matching items array
//             const matchingWord = item1.ingredient.split(' ')[0];
//             item1.match = matchingWord;
//             matchingItems1.push(item1);
//             matchingItems2.push({
//                 ...array2[matchingItemIndex],
//                 match: matchingWord
//             });
//             // Remove the matched item from the second array to avoid duplicates
//             array2.splice(matchingItemIndex, 1);
//         } else {
//             // If no matching item is found, push it into the remaining items array
//             remainingItems1.push(item1);
//         }
//     });

//     // Push any remaining items from the second array into the remaining items array
//     remainingItems2.push(...array2);

//     // Concatenate the matching and remaining items arrays
//     const reorderedArray1 = matchingItems1.concat(remainingItems1);
//     const reorderedArray2 = matchingItems2.concat(remainingItems2);

//     // Return the reordered arrays
//     return [reorderedArray1, reorderedArray2];
// }



const [reorderedArray1, reorderedArray2] = reorderArraysByIngredient(parsedIngredients1, parsedIngredients2)

console.log('reorderedArray2', reorderedArray2)

</script>

<template>
  
  <h1 class="title has-text-centered mb-3">Original:</h1>
  <div class="columns">
    <div class="column">
      <!-- <List :list="array1" /> -->
      <!-- <Parse
        v-for="ingredient in parsedIngredients1"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      /> -->
      <p v-for="ingredient in array1" :key="ingredient" class="ingredient">
        {{ ingredient }}
      </p>
    </div>
    <div class="column">
      <!-- <List :list="array2" /> -->
      <!-- <Parse
        v-for="ingredient in parsedIngredients2"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      /> -->
      <p v-for="ingredient in array2" :key="ingredient" class="ingredient">
        {{ ingredient }}
      </p>
    </div>
  </div>

  <h1 class="title has-text-centered mb-3">Reordered:</h1>
  <div class="columns">
    <div class="column">
      <Parse
        v-for="ingredient in reorderedArray1"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      />
    </div>
    <div class="column">
      <Parse
        v-for="ingredient in reorderedArray2"
        :key="ingredient.ingredient"
        :parsed="ingredient"
      />
    </div>
  </div>
</template>