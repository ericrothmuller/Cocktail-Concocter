// TheCocktailDB API

// Universal Variables

var searchButton = document.getElementById("searchbutton"); // Search Button ID

var ingredientForm = document.getElementById("addingredientform"); // Ingredient Form

var ingredientTextInput = document.getElementById("addingredienttext"); // Ingredient Text Input Area

var ingredientListArea = document.getElementById("ingredientlist"); // Ingredient List Area

var ingredientLocalStorageArr = [];

// var ingredientForRecipeURL // Holds ingredient value for TheCocktailDB API URL

// Duplicate remover
function removeDuplicate(arr){
    var exists = {};
    var resultArr = [];
    for (var j = 0; j < arr.length; j++){
        var index = arr[j];
        if(!exists[index]){
            resultArr.push(index);
            exists[index] = true;
        }
    }
    return resultArr;
}

// Function to add ingredients

function addIngredient(event) {
    event.preventDefault();
    if (ingredientTextInput.value){ // Checks if there's something typed into the ingredient text field
        console.log(ingredientTextInput.value); // console.log's the input value
        var inputKey = ingredientTextInput.value; // Will be the localStorage Key
        var inputValue = ingredientTextInput.value; // Will be the localStorage Value
        localStorage.setItem(inputKey, inputValue); // Saves the localStorage Key and Value
        ingredientLocalStorageArr.push(inputValue); // Adds ingredient to ingredientLocalStorageArr
        ingredientLocalStorageArr = removeDuplicate(ingredientLocalStorageArr); // removed duplicates from ingredientLocalStorageArr


    }

}


















// function clearAndAddIngredients() { // clears the ingredient list and reprints it with a new one added.
//     ingredientListArea.innerHTML = "";
//     ingredientListArea.innerHTML = addIngredientList;
//     console.log(addIngredientList);
// };

// if (localStorage.getItem(inputKey)) { // checks it here is items
// clearAndAddIngredients();
// }









// Add Ingredient Button

ingredientForm.addEventListener("submit", addIngredient);


// This gets recipes based on search results

var executeSearch = function fetchRandomRecipe() {

    var ingredientArrayString = ingredientLocalStorageArr.join(); // joins the ingredientLocalStorageArr array into a string
    var ingredientForRecipeURL = ingredientArrayString.replace(/ /g,"_") // replaces spaces with _ for the Recipe URL API Query

    var randomCocktailUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + ingredientForRecipeURL; // URL to fetch cocktail recipes based on user input

    console.log (randomCocktailUrl);

    fetch(randomCocktailUrl).then(function(response) {
        return response.json();
    }).then (function (data) {
        console.log(data);
    })
}

// Search Button Event Listener

searchButton.addEventListener("click", executeSearch);

























// // Spoonacular API

// function fetchNewRandomRecipe() {
//     var randomRecipeUrl = "https://api.spoonacular.com/recipes/random?number=1&tags=cocktail&apiKey=617cbeaaaaed4784b11395a671e20554&intolerances";

//     var searchRecipeUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=alcohol,rum,+sugar,+pineapple&number=20&apiKey=617cbeaaaaed4784b11395a671e20554&tags=cocktail,alcohol";

//     var complexSearchUrl = "https://api.spoonacular.com/recipes/complexSearch?query=cocktail&type=drink&includeIngredients=alcohol&apiKey=617cbeaaaaed4784b11395a671e20554";

//     fetch(complexSearchUrl).then(function(response) {
//         return response.json();
//     }).then (function (data) {
//         console.log(data);
//     })
// }

// fetchNewRandomRecipe();

// https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert