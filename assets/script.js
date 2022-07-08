// TheCocktailDB API

function fetchRandomRecipe() {
    var randomCocktailUrl = "www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(randomCocktailUrl).then(function(response) {
        return response.json();
    }).then (function (data) {
        console.log(data);
    })
}

fetchRandomRecipe();

// Spoonacular API

function fetchNewRandomRecipe() {
    var randomRecipeUrl = "https://api.spoonacular.com/recipes/random?apiKey=617cbeaaaaed4784b11395a671e20554";

    fetch(randomRecipeUrl).then(function(response) {
        return response.json();
    }).then (function (data) {
        console.log(data);
    })
}

fetchNewRandomRecipe();

// nutritionix API

function fetchIngredient() {
    var ingredientURL = "https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=e7329152&appKey=cdcdcd716488b6541ff443f49fc0a39d";

    fetch(ingredientURL).then(function(response) {
        return response.json();
    }).then (function (data) {
        console.log(data);
    })
}

fetchIngredient()