<script setup>
import natural from 'natural'

console.log('natural', natural)

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
  "Freshly grated parmigiano-reggiano cheese at the table"
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
];

// Function to compare two ingredients
function compareIngredients(ingredient1, ingredient2) {
  // Tokenize ingredients
  const tokens1 = natural.PorterStemmer.tokenizeAndStem(ingredient1)
  const tokens2 = natural.PorterStemmer.tokenizeAndStem(ingredient2)

  // Compare tokens
  const similarity = natural.JaroWinklerDistance(tokens1.join(' '), tokens2.join(' '))

  return similarity
}

// Function to find matching ingredients and handle differences in amounts
function findSimilarIngredients(array1, array2) {
  const similarIngredients = []
  const uniqueIngredients = []

  for (let ingredient1 of array1) {
    let maxSimilarity = 0
    let matchingIngredient = null

    for (let ingredient2 of array2) {
      const similarity = compareIngredients(ingredient1, ingredient2)

      if (similarity > maxSimilarity) {
        maxSimilarity = similarity
        matchingIngredient = ingredient2
      }
    }

    if (maxSimilarity >= 0.7) { // Adjust this threshold as needed
      similarIngredients.push({ingredient1, matchingIngredient})
    } else {
      uniqueIngredients.push(ingredient1)
    }
  }

  return {similarIngredients, uniqueIngredients}
}

// Find similar and unique ingredients
const {similarIngredients, uniqueIngredients} = findSimilarIngredients(array1, array2)

console.log("Similar Ingredients:")
similarIngredients.forEach(({ingredient1, matchingIngredient}) => {
  console.log(`- ${ingredient1} | Matched with: ${matchingIngredient}`)
})

console.log("\nUnique Ingredients in array1:");
uniqueIngredients.forEach(ingredient => {
  console.log(`- ${ingredient}`)
})


</script>

<template>
  <div>

    check console
  </div>
</template>