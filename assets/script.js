// TheCocktailDB API

// Universal Variables

var searchButton = document.getElementById("searchbutton"); // Search Button ID

var ingredientForm = document.getElementById("addingredientform"); // Ingredient Form

var ingredientTextInput = document.getElementById("addingredienttext"); // Ingredient Text Input Area

var ingredientListArea = document.getElementById("ingredientlist"); // Ingredient List Area

var recipeListArea1 = document.getElementById("recipelist1"); // Recipe Header and Image List Area

var recipeListArea1Ingredients = document.getElementById("recipelist1ingredients"); // Recipe Ingredients List Area

var recipeListArea1recipe = document.getElementById("recipelist1recipe"); // Recipe List Area



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

var executeSearch = function fetchFoundRecipe() {

    var ingredientArrayString = ingredientLocalStorageArr.join(); // joins the ingredientLocalStorageArr array into a string
    var ingredientForRecipeURL = ingredientArrayString.replace(/ /g,"_") // replaces spaces with _ for the Recipe URL API Query

    var searchCocktailUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + ingredientForRecipeURL; // URL to fetch cocktail recipes based on user input

    fetch(searchCocktailUrl).then(function(response) { // Fetch request for the recipe data based on user input
        return response.json();
    }).then (function (data) {

        function displayCocktails(cocktail) { //Function that get's the cocktails data and displays it
            var cocktailName = cocktail.drinks[0].strDrink; // grabs cocktail drink 1's name
            var cocktailImage = cocktail.drinks[0].strDrinkThumb; // grabs cocktail drink 1's image url
            var cocktailId = cocktail.drinks[0].idDrink; // grabs cocktail drink 1's product ID

            recipeListArea1.innerHTML = '<hr />' + '<h2>' + cocktailName + '</h2> <br /> <img src="' + cocktailImage + '" /> <br /> <button class="bg-teal-100 hover:bg-emerald-800 w-full rounded">View Videos</button> <br /> <button id="recipe1buttonarea" class="bg-teal-100 hover:bg-emerald-800 w-full rounded">View Recipe</button>'; // displays recipe 1 in the recipe list area

            var recipe1Button = document.getElementById("recipe1buttonarea"); // targets the recipe 1 button
            var recipe1Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId; // URL for recipe 1

            // Displays Recipe 1

            function displayRecipe1() {
                fetch(recipe1Url).then(function(response) { // Fetch request for the full recipe data
                    return response.json();
                }).then (function(recipe) { // function to display recipe
                    
                    var individualIngredientsOne = recipe.drinks[0].strMeasure1 + ": " + recipe.drinks[0].strIngredient1; // creates the text for the ingredient 1 and it's amount
                    var ingredientListItems1 = document.createTextNode(individualIngredientsOne); // stores the ingredient 1 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems1); // adds ingredient to list
                    recipeListArea1Ingredients.appendChild(createLi); // appends li to the page



                    var individualIngredientsTwo = recipe.drinks[0].strMeasure2 + ": " + recipe.drinks[0].strIngredient2; // creates the text for the ingredient 1 and it's amount
                    var ingredientListItems2 = document.createTextNode(individualIngredientsTwo); // stores the ingredient 1 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems2); // adds ingredient to list
                    recipeListArea1Ingredients.appendChild(createLi); // appends li to the page






                    var cocktailInstructions = recipe.drinks[0].strInstructions; // grabs cocktail drink 1's instructions
                    recipeListArea1recipe.innerHTML = cocktailInstructions; + '<br/>' // Displays recipe 1 instructions
                })
            } 

            recipe1Button.addEventListener("click", displayRecipe1); // event listener for the recipe 1 button

            
        }
        displayCocktails(data); // runs the display cocktails function
    })
}



// Search Button Event Listener

searchButton.addEventListener("click", executeSearch);
