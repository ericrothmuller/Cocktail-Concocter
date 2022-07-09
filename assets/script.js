// TheCocktailDB API

// Universal Variables

var searchButton = document.getElementById("searchbutton"); // Search Button ID

var ingredientForm = document.getElementById("addingredientform"); // Ingredient Form

var ingredientTextInput = document.getElementById("addingredienttext"); // Ingredient Text Input Area

var ingredientListArea = document.getElementById("ingredientlist"); // Ingredient List Area

var recipeListArea1 = document.getElementById("recipelist1"); // Recipe List Area


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

    console.log (randomCocktailUrl); // Console.log's the generated URL based on user input

    fetch(randomCocktailUrl).then(function(response) { // Fetch request for the recipe data based on user input
        return response.json();
    }).then (function (data) {
        console.log(data); // Console.log's the recipe data
        // recipeListArea.innerHTML = " "; // Clears recipe area

        function displayCocktails(cocktail) { //Function that get's the cocktails data and displays it
            var cocktailName = cocktail.drinks[0].strDrink; // grabs cocktail drink 1's name
            var cocktailImage = cocktail.drinks[0].strDrinkThumb; // grabs cocktail drink 1's image url
            var cocktailId = cocktail.drinks[0].idDrink; // grabs cocktail drink 1's product ID

            recipeListArea1.innerHTML = '<h2>' + cocktailName + '</h2> <br /> <br /> <img src="' + cocktailImage + '" />'; // displays recipe 1 in the recipe list area


        }
        displayCocktails(data); // runs the display cocktails function
    })
}



// Search Button Event Listener

searchButton.addEventListener("click", executeSearch);
