declare global {
  interface IRecipeInstruction {
    '@type': string;
    '@context': string;
    text: string;
    name?: string;
    itemListElement?: IRecipeInstruction
  }

  interface IParsedIngedient {
    quantity: number;
    quantityText: string;
    minQuantity: number;
    maxQuantity: number;
    unit: string;
    unitText: string;
    ingredient: string;
    extra: string;
    alternativeQuantities: number[],
    matches: string[]
  }

  interface IRecipe {
    url: string;
    name: string;
    image: string | string[];
    prepTime: string;
    totalTime: string;
    recipeYield: string | string[];
    recipeCuisine: string | string[];
    recipeInstructions: IRecipeInstruction[];
    recipeIngredient: string[];
    ingredients: IParsedIngedient[]
  }
}

export {}