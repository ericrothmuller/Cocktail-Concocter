// TheCocktailDB API

// Universal Variables

var searchButton = document.getElementById("searchbutton"); // Search Button ID

var ingredientForm = document.getElementById("addingredientform"); // Ingredient Form

var ingredientTextInput = document.getElementById("addingredienttext"); // Ingredient Text Input Area

var ingredientListArea = document.getElementById("ingredientlist"); // Ingredient List Area

    // Recipe 1 Variables

var recipeListArea1 = document.getElementById("recipelist1"); // Recipe Header and Image List Area

var recipeListArea1Ingredients = document.getElementById("recipelist1ingredients"); // Recipe Ingredients List Area

var recipeListArea1recipe = document.getElementById("recipelist1recipe"); // Recipe List Area

    // Recipe 2 Variables

var recipeListArea2 = document.getElementById("recipelist2"); // Recipe Header and Image List Area

var recipeListArea2Ingredients = document.getElementById("recipelist2ingredients"); // Recipe Ingredients List Area

var recipeListArea2recipe = document.getElementById("recipelist2recipe"); // Recipe List Area

    // Recipe 3 Variables

var recipeListArea3 = document.getElementById("recipelist3"); // Recipe Header and Image List Area

var recipeListArea3Ingredients = document.getElementById("recipelist3ingredients"); // Recipe Ingredients List Area

var recipeListArea3recipe = document.getElementById("recipelist3recipe"); // Recipe List Area

    // Recipe 4 Variables

var recipeListArea4 = document.getElementById("recipelist4"); // Recipe Header and Image List Area

var recipeListArea4Ingredients = document.getElementById("recipelist4ingredients"); // Recipe Ingredients List Area

var recipeListArea4recipe = document.getElementById("recipelist4recipe"); // Recipe List Area

    // Recipe 5 Variables

var recipeListArea5 = document.getElementById("recipelist5"); // Recipe Header and Image List Area

var recipeListArea5Ingredients = document.getElementById("recipelist5ingredients"); // Recipe Ingredients List Area

var recipeListArea5recipe = document.getElementById("recipelist5recipe"); // Recipe List Area




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

            // Displays Cocktails

        function displayCocktails(cocktail) { //Function that get's the cocktails data and displays it

            // Displays Cocktail 1

            var cocktailName1 = cocktail.drinks[0].strDrink; // grabs cocktail drink 1's name
            var cocktailImage1 = cocktail.drinks[0].strDrinkThumb; // grabs cocktail drink 1's image url
            var cocktailId1 = cocktail.drinks[0].idDrink; // grabs cocktail drink 1's product ID

            recipeListArea1.innerHTML = '<hr />' + '<h2>' + cocktailName1 + '</h2> <br /> <img src="' + cocktailImage1 + '" /> <br /> <button class="bg-teal-100 hover:bg-emerald-800 w-full rounded">View Videos</button> <br /> <button id="recipe1buttonarea" class="bg-teal-100 hover:bg-emerald-800 w-full rounded">View Recipe</button>'; // displays recipe 1 in the recipe list area

            var recipe1Button = document.getElementById("recipe1buttonarea"); // targets the recipe 1 button
            var recipe1Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId1; // URL for recipe 1

            function displayRecipe1() {
                fetch(recipe1Url).then(function(response) { // Fetch request for the full recipe data
                    return response.json();
                }).then (function(recipe) { // function to display recipe
                    
                    var individualIngredientsOne = recipe.drinks[0].strMeasure1 + ": " + recipe.drinks[0].strIngredient1; // creates the text for the ingredient 1 and it's amount
                    var ingredientListItems1 = document.createTextNode(individualIngredientsOne); // stores the ingredient 1 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems1); // adds ingredient to list
                    recipeListArea1Ingredients.appendChild(createLi); // appends li to the page



                    if (recipe.drinks[0].strIngredient2) {

                    var individualIngredientsTwo = recipe.drinks[0].strMeasure2 + ": " + recipe.drinks[0].strIngredient2; // creates the text for the ingredient 1 and it's amount
                    var ingredientListItems2 = document.createTextNode(individualIngredientsTwo); // stores the ingredient 1 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems2); // adds ingredient to list
                    recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                }


                    if (recipe.drinks[0].strIngredient3) {

                    var individualIngredientsThree = recipe.drinks[0].strMeasure3 + ": " + recipe.drinks[0].strIngredient3; // creates the text for the ingredient 1 and it's amount
                    var ingredientListItems3 = document.createTextNode(individualIngredientsThree); // stores the ingredient 1 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems3); // adds ingredient to list
                    recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                    }


                    if (recipe.drinks[0].strIngredient4) {

                        var individualIngredientsFour = recipe.drinks[0].strMeasure4 + ": " + recipe.drinks[0].strIngredient4; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems4 = document.createTextNode(individualIngredientsFour); // stores the ingredient 1 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems4); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient5) {

                        var individualIngredientsFive = recipe.drinks[0].strMeasure5 + ": " + recipe.drinks[0].strIngredient5; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems5 = document.createTextNode(individualIngredientsFive); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems5); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient6) {

                        var individualIngredientsSix = recipe.drinks[0].strMeasure6 + ": " + recipe.drinks[0].strIngredient6; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems6 = document.createTextNode(individualIngredientsSix); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems6); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient7) {

                        var individualIngredientsSeven = recipe.drinks[0].strMeasure7 + ": " + recipe.drinks[0].strIngredient7; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems7 = document.createTextNode(individualIngredientsSeven); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems7); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient8) {

                        var individualIngredientsEight = recipe.drinks[0].strMeasure8 + ": " + recipe.drinks[0].strIngredient8; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems8 = document.createTextNode(individualIngredientsEight); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems8); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient9) {

                        var individualIngredientsNine = recipe.drinks[0].strMeasure9 + ": " + recipe.drinks[0].strIngredient9; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems9 = document.createTextNode(individualIngredientsNine); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems9); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient10) {

                        var individualIngredientsTen = recipe.drinks[0].strMeasure10 + ": " + recipe.drinks[0].strIngredient10; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems10 = document.createTextNode(individualIngredientsTen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems10); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient11) {

                        var individualIngredientsEleven = recipe.drinks[0].strMeasure11 + ": " + recipe.drinks[0].strIngredient11; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems11 = document.createTextNode(individualIngredientsEleven); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems11); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient12) {

                        var individualIngredientsTwelve = recipe.drinks[0].strMeasure12 + ": " + recipe.drinks[0].strIngredient12; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems12 = document.createTextNode(individualIngredientsTwelve); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems12); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient13) {

                        var individualIngredientsThirteen = recipe.drinks[0].strMeasure13 + ": " + recipe.drinks[0].strIngredient13; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems13 = document.createTextNode(individualIngredientsThirteen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems13); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient14) {

                        var individualIngredientsFourteen = recipe.drinks[0].strMeasure14 + ": " + recipe.drinks[0].strIngredient14; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems14 = document.createTextNode(individualIngredientsFourteen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems14); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient15) {

                        var individualIngredientsFifteen = recipe.drinks[0].strMeasure15 + ": " + recipe.drinks[0].strIngredient15; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems15 = document.createTextNode(individualIngredientsFifteen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems15); // adds ingredient to list
                        recipeListArea1Ingredients.appendChild(createLi); // appends li to the page
                        }

                    var cocktail1Instructions = recipe.drinks[0].strInstructions; // grabs cocktail drink 1's instructions
                    recipeListArea1recipe.innerHTML = cocktail1Instructions; + '<br/>' // Displays recipe 1 instructions
                })
            }

                        // Displays Cocktail 2

            var cocktailName2 = cocktail.drinks[1].strDrink; // grabs cocktail drink 2's name
            var cocktailImage2 = cocktail.drinks[1].strDrinkThumb; // grabs cocktail drink 2's image url
            var cocktailId2 = cocktail.drinks[1].idDrink; // grabs cocktail drink 2's product ID

            recipeListArea2.innerHTML = '<hr />' + '<h2>' + cocktailName2 + '</h2> <br /> <img src="' + cocktailImage2 + '" /> <br /> <button class="bg-teal-100 hover:bg-emerald-800 w-full rounded">View Videos</button> <br /> <button id="recipe2buttonarea2" class="bg-teal-100 hover:bg-emerald-800 w-full rounded">View Recipe</button>'; // displays recipe 2 in the recipe list area

            var recipe2Button = document.getElementById("recipe2buttonarea2"); // targets the recipe 2 button
            var recipe2Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId2; // URL for recipe 2

            function displayRecipe2() {
                fetch(recipe2Url).then(function(response) { // Fetch request for the full recipe data
                    return response.json();
                }).then (function(recipe) { // function to display recipe
                    

                    console.log(recipe2Url);

                    var individualIngredientsOne = recipe.drinks[0].strMeasure1 + ": " + recipe.drinks[0].strIngredient1; // creates the text for the ingredient 2 and it's amount
                    var ingredientListItems2 = document.createTextNode(individualIngredientsOne); // stores the ingredient 2 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems2); // adds ingredient to list
                    recipeListArea2Ingredients.appendChild(createLi); // appends li to the page



                    if (recipe.drinks[0].strIngredient2) {

                    var individualIngredientsTwo = recipe.drinks[0].strMeasure2 + ": " + recipe.drinks[0].strIngredient2; // creates the text for the ingredient 1 and it's amount
                    var ingredientListItems2 = document.createTextNode(individualIngredientsTwo); // stores the ingredient 1 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems2); // adds ingredient to list
                    recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                }


                    if (recipe.drinks[0].strIngredient3) {

                    var individualIngredientsThree = recipe.drinks[0].strMeasure3 + ": " + recipe.drinks[0].strIngredient3; // creates the text for the ingredient 1 and it's amount
                    var ingredientListItems3 = document.createTextNode(individualIngredientsThree); // stores the ingredient 1 string

                    var createLi = document.createElement("li"); // creates a List Item
                    createLi.appendChild(ingredientListItems3); // adds ingredient to list
                    recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                    }


                    if (recipe.drinks[0].strIngredient4) {

                        var individualIngredientsFour = recipe.drinks[0].strMeasure4 + ": " + recipe.drinks[0].strIngredient4; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems4 = document.createTextNode(individualIngredientsFour); // stores the ingredient 1 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems4); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient5) {

                        var individualIngredientsFive = recipe.drinks[0].strMeasure5 + ": " + recipe.drinks[0].strIngredient5; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems5 = document.createTextNode(individualIngredientsFive); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems5); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient6) {

                        var individualIngredientsSix = recipe.drinks[0].strMeasure6 + ": " + recipe.drinks[0].strIngredient6; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems6 = document.createTextNode(individualIngredientsSix); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems6); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient7) {

                        var individualIngredientsSeven = recipe.drinks[0].strMeasure7 + ": " + recipe.drinks[0].strIngredient7; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems7 = document.createTextNode(individualIngredientsSeven); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems7); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient8) {

                        var individualIngredientsEight = recipe.drinks[0].strMeasure8 + ": " + recipe.drinks[0].strIngredient8; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems8 = document.createTextNode(individualIngredientsEight); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems8); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient9) {

                        var individualIngredientsNine = recipe.drinks[0].strMeasure9 + ": " + recipe.drinks[0].strIngredient9; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems9 = document.createTextNode(individualIngredientsNine); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems9); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient10) {

                        var individualIngredientsTen = recipe.drinks[0].strMeasure10 + ": " + recipe.drinks[0].strIngredient10; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems10 = document.createTextNode(individualIngredientsTen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems10); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient11) {

                        var individualIngredientsEleven = recipe.drinks[0].strMeasure11 + ": " + recipe.drinks[0].strIngredient11; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems11 = document.createTextNode(individualIngredientsEleven); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems11); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient12) {

                        var individualIngredientsTwelve = recipe.drinks[0].strMeasure12 + ": " + recipe.drinks[0].strIngredient12; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems12 = document.createTextNode(individualIngredientsTwelve); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems12); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient13) {

                        var individualIngredientsThirteen = recipe.drinks[0].strMeasure13 + ": " + recipe.drinks[0].strIngredient13; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems13 = document.createTextNode(individualIngredientsThirteen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems13); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient14) {

                        var individualIngredientsFourteen = recipe.drinks[0].strMeasure14 + ": " + recipe.drinks[0].strIngredient14; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems14 = document.createTextNode(individualIngredientsFourteen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems14); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }


                    if (recipe.drinks[0].strIngredient15) {

                        var individualIngredientsFifteen = recipe.drinks[0].strMeasure15 + ": " + recipe.drinks[0].strIngredient15; // creates the text for the ingredient 1 and it's amount
                        var ingredientListItems15 = document.createTextNode(individualIngredientsFifteen); // stores the ingredient 1 string
        
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems15); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }

                    var cocktail2Instructions = recipe.drinks[0].strInstructions; // grabs cocktail drink 2's instructions
                    recipeListArea2recipe.innerHTML = cocktail2Instructions; // Displays recipe 2 instructions
                })
            }

            recipe1Button.addEventListener("click", displayRecipe1); // event listener for the recipe 1 button
            recipe2Button.addEventListener("click", displayRecipe2); // event listener for the recipe 2 button

            
        }
        displayCocktails(data); // runs the display cocktails function







    })
}



// Search Button Event Listener

searchButton.addEventListener("click", executeSearch);
