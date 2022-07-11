// TheCocktailDB API

// Universal Variables

var searchButton = document.getElementById("searchbutton"); // Search Button ID

var resetButton = document.getElementById("reset"); // Reset Button ID

var ingredientForm = document.getElementById("addingredientform"); // Ingredient Form

var ingredientTextInput = document.getElementById("addingredienttext"); // Ingredient Text Input Area

var ingredientListArea = document.getElementById("ingredientlist"); // Ingredient List Area

var videoResultsArea = document.getElementById("videoresults"); // Video Results Area

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

// Add Ingredient List

function ingredientListAdd(event) {
    event.preventDefault();
    if (ingredientTextInput.value){
        var inputKey = ingredientTextInput.value
        var makeList = document.createElement("li");
        var listIngredientn = document.createTextNode(inputKey);
        makeList.setAttribute("id", "LI")
        
        makeList.appendChild(listIngredientn);
        document.getElementById("ingredientlist").append(makeList);
        ingredientTextInput.value = '';
    }
}

/* function removeIngredients(event) {
    event.preventDefault();
    if (ingredientListArea.value) {
        var makeList = document.createElement("li");
        var removeItem = document.getElementById(makeList.value);
        document.getElementById("LI").remove(eleven)

    }
} */

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
ingredientForm.addEventListener("submit", ingredientListAdd);
/* resetButton.addEventListener("click", removeIngredients) */







// This gets recipes based on search results

var executeSearch = function fetchFoundRecipe() {

    var ingredientArrayString = ingredientLocalStorageArr.join(); // joins the ingredientLocalStorageArr array into a string
    var ingredientForRecipeURL = ingredientArrayString.replace(/ /g,"_") // replaces spaces with _ for the Recipe URL API Query

    var searchCocktailUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + ingredientForRecipeURL; // URL to fetch cocktail recipes based on user input

    fetch(searchCocktailUrl).then(function(response) { // Fetch request for the recipe data based on user input
        return response.json();
    }).then (function (data) {

        if (data.drinks[0]) { // Checks to see if there are drinks to display based on the search

            // Displays Cocktails

            function displayCocktails(cocktail) { //Function that get's the cocktails data and displays it

                // Displays Cocktail 1
    
                var cocktailName1 = cocktail.drinks[0].strDrink; // grabs cocktail drink 1's name
                var cocktailImage1 = cocktail.drinks[0].strDrinkThumb; // grabs cocktail drink 1's image url
                var cocktailId1 = cocktail.drinks[0].idDrink; // grabs cocktail drink 1's product ID
    
                recipeListArea1.innerHTML = '<hr />' + '<h2>' + cocktailName1 + '</h2> <br /> <img src="' + cocktailImage1 + '" /> <br /> <button id="videos1Button" class="button">View Videos</button> <br /> <button id="recipe1buttonarea" class="button">View Recipe</button>'; // displays recipe 1 in the recipe list area
    
                var recipe1Button = document.getElementById("recipe1buttonarea"); // targets the recipe 1 button
                recipe1Button.addEventListener("click", displayRecipe1); // event listener for the recipe 1 button
                var recipe1Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId1; // URL for recipe 1

                // Displays Cocktail 1 Videos

                var videos1Button = document.getElementById("videos1Button"); // targets the videos button
                videos1Button.addEventListener("click", displayVideos); // event listener for the videos button

                var videosSearchURLOne = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&videoLicense=creativeCommon&topicId=cocktail&q=" + cocktailName1 + "+cocktail+recipes&key=AIzaSyBYoIu73MgoqyQ-u7uw0g46li87sdWTl2o" // URL for YouTube API Fetch                
                

                function displayVideos() { // function to fetch YouTube API Data based off a search of the cocktail name
                    fetch(videosSearchURLOne).then(function(response) {
                        return response.json();
                    }).then (function(videoData) {
                        console.log(videoData);
                        videoId1 = videoData.items[0].id.videoId;
                        videoId2 = videoData.items[1].id.videoId;
                        videoId3 = videoData.items[2].id.videoId;
                        videoId4 = videoData.items[3].id.videoId;
                        videoId5 = videoData.items[4].id.videoId;
                        videoResultsArea.innerHTML = '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId1 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId2 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId3 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId4 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId5 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>'; // Adds video embeds to video section
                    })
                }

                // Displays Recipe 1

                function displayRecipe1() {
                    fetch(recipe1Url).then(function(response) { // Fetch request for the full recipe data
                        return response.json();
                    }).then (function(recipe) { // function to display recipe
                        
                        recipe1Button.disabled = true;
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

                if (data.drinks[1]) {

                            // Displays Cocktail 2
    
                var cocktailName2 = cocktail.drinks[1].strDrink; // grabs cocktail drink 2's name
                var cocktailImage2 = cocktail.drinks[1].strDrinkThumb; // grabs cocktail drink 2's image url
                var cocktailId2 = cocktail.drinks[1].idDrink; // grabs cocktail drink 2's product ID
    
                recipeListArea2.innerHTML = '<hr />' + '<h2>' + cocktailName2 + '</h2> <br /> <img src="' + cocktailImage2 + '" /> <br /> <button id="videos2Button" class="button">View Videos</button> <br /> <button id="recipe2buttonarea2" class="button">View Recipe</button>'; // displays recipe 2 in the recipe list area
    
                var recipe2Button = document.getElementById("recipe2buttonarea2"); // targets the recipe 2 button
                recipe2Button.addEventListener("click", displayRecipe2); // event listener for the recipe 2 button
                var recipe2Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId2; // URL for recipe 2
    
                // Displays Cocktail 2 Videos

                var videos2Button = document.getElementById("videos2Button"); // targets the videos button
                videos2Button.addEventListener("click", displayVideos); // event listener for the videos button

                var videosSearchURLTwo = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&videoLicense=creativeCommon&topicId=cocktail&q=" + cocktailName2 + "+cocktail+recipes&key=AIzaSyBYoIu73MgoqyQ-u7uw0g46li87sdWTl2o" // URL for YouTube API Fetch                
                

                function displayVideos() { // function to fetch YouTube API Data based off a search of the cocktail name
                    fetch(videosSearchURLTwo).then(function(response) {
                        return response.json();
                    }).then (function(videoData) {
                        console.log(videoData);
                        videoId1 = videoData.items[0].id.videoId;
                        videoId2 = videoData.items[1].id.videoId;
                        videoId3 = videoData.items[2].id.videoId;
                        videoId4 = videoData.items[3].id.videoId;
                        videoId5 = videoData.items[4].id.videoId;
                        videoResultsArea.innerHTML = '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId1 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId2 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId3 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId4 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId5 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>'; // Adds video embeds to video section
                    })
                }

                // Displays Recipe 2

                function displayRecipe2() {
                    fetch(recipe2Url).then(function(response) { // Fetch request for the full recipe data
                        return response.json();
                    }).then (function(recipe) { // function to display recipe
    
                        recipe2Button.disabled = true;
                        var individualIngredientsOne = recipe.drinks[0].strMeasure1 + ": " + recipe.drinks[0].strIngredient1; // creates the text for the ingredient 2 and it's amount
                        var ingredientListItems1 = document.createTextNode(individualIngredientsOne); // stores the ingredient 2 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems1); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
    
    
    
                        if (recipe.drinks[0].strIngredient2) {
    
                        var individualIngredientsTwo = recipe.drinks[0].strMeasure2 + ": " + recipe.drinks[0].strIngredient2; // creates the text for the ingredient 2 and it's amount
                        var ingredientListItems2 = document.createTextNode(individualIngredientsTwo); // stores the ingredient 2 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems2); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                    }
    
    
                        if (recipe.drinks[0].strIngredient3) {
    
                        var individualIngredientsThree = recipe.drinks[0].strMeasure3 + ": " + recipe.drinks[0].strIngredient3; // creates the text for the ingredient 2 and it's amount
                        var ingredientListItems3 = document.createTextNode(individualIngredientsThree); // stores the ingredient 2 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems3); // adds ingredient to list
                        recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                        }
    
    
                        if (recipe.drinks[0].strIngredient4) {
    
                            var individualIngredientsFour = recipe.drinks[0].strMeasure4 + ": " + recipe.drinks[0].strIngredient4; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems4 = document.createTextNode(individualIngredientsFour); // stores the ingredient 2 string
        
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems4); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient5) {
    
                            var individualIngredientsFive = recipe.drinks[0].strMeasure5 + ": " + recipe.drinks[0].strIngredient5; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems5 = document.createTextNode(individualIngredientsFive); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems5); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient6) {
    
                            var individualIngredientsSix = recipe.drinks[0].strMeasure6 + ": " + recipe.drinks[0].strIngredient6; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems6 = document.createTextNode(individualIngredientsSix); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems6); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient7) {
    
                            var individualIngredientsSeven = recipe.drinks[0].strMeasure7 + ": " + recipe.drinks[0].strIngredient7; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems7 = document.createTextNode(individualIngredientsSeven); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems7); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient8) {
    
                            var individualIngredientsEight = recipe.drinks[0].strMeasure8 + ": " + recipe.drinks[0].strIngredient8; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems8 = document.createTextNode(individualIngredientsEight); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems8); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient9) {
    
                            var individualIngredientsNine = recipe.drinks[0].strMeasure9 + ": " + recipe.drinks[0].strIngredient9; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems9 = document.createTextNode(individualIngredientsNine); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems9); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient10) {
    
                            var individualIngredientsTen = recipe.drinks[0].strMeasure10 + ": " + recipe.drinks[0].strIngredient10; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems10 = document.createTextNode(individualIngredientsTen); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems10); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient11) {
    
                            var individualIngredientsEleven = recipe.drinks[0].strMeasure11 + ": " + recipe.drinks[0].strIngredient11; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems11 = document.createTextNode(individualIngredientsEleven); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems11); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient12) {
    
                            var individualIngredientsTwelve = recipe.drinks[0].strMeasure12 + ": " + recipe.drinks[0].strIngredient12; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems12 = document.createTextNode(individualIngredientsTwelve); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems12); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient13) {
    
                            var individualIngredientsThirteen = recipe.drinks[0].strMeasure13 + ": " + recipe.drinks[0].strIngredient13; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems13 = document.createTextNode(individualIngredientsThirteen); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems13); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient14) {
    
                            var individualIngredientsFourteen = recipe.drinks[0].strMeasure14 + ": " + recipe.drinks[0].strIngredient14; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems14 = document.createTextNode(individualIngredientsFourteen); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems14); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient15) {
    
                            var individualIngredientsFifteen = recipe.drinks[0].strMeasure15 + ": " + recipe.drinks[0].strIngredient15; // creates the text for the ingredient 2 and it's amount
                            var ingredientListItems15 = document.createTextNode(individualIngredientsFifteen); // stores the ingredient 2 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems15); // adds ingredient to list
                            recipeListArea2Ingredients.appendChild(createLi); // appends li to the page
                            }
    
                        var cocktail2Instructions = recipe.drinks[0].strInstructions; // grabs cocktail drink 2's instructions
                        recipeListArea2recipe.innerHTML = cocktail2Instructions; // Displays recipe 2 instructions
                    })
                }
            }
    

            if (data.drinks[2]) {
                            // Displays Cocktail 3
    
                var cocktailName3 = cocktail.drinks[2].strDrink; // grabs cocktail drink 3's name
                var cocktailImage3 = cocktail.drinks[2].strDrinkThumb; // grabs cocktail drink 3's image url
                var cocktailId3 = cocktail.drinks[2].idDrink; // grabs cocktail drink 3's product ID
    
                recipeListArea3.innerHTML = '<hr />' + '<h2>' + cocktailName3 + '</h2> <br /> <img src="' + cocktailImage3 + '" /> <br /> <button id="videos3Button" class="button">View Videos</button> <br /> <button id="recipe3buttonarea3" class="button">View Recipe</button>'; // displays recipe 3 in the recipe list area
    
                var recipe3Button = document.getElementById("recipe3buttonarea3"); // targets the recipe 3 button
                recipe3Button.addEventListener("click", displayRecipe3); // event listener for the recipe 3 button
                var recipe3Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId3; // URL for recipe 3

                // Displays Cocktail 3 Videos

                var videos3Button = document.getElementById("videos3Button"); // targets the videos button
                videos3Button.addEventListener("click", displayVideos); // event listener for the videos button

                var videosSearchURLThree = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&videoLicense=creativeCommon&topicId=cocktail&q=" + cocktailName3 + "+cocktail+recipes&key=AIzaSyBYoIu73MgoqyQ-u7uw0g46li87sdWTl2o" // URL for YouTube API Fetch                
                

                function displayVideos() { // function to fetch YouTube API Data based off a search of the cocktail name
                    fetch(videosSearchURLThree).then(function(response) {
                        return response.json();
                    }).then (function(videoData) {
                        console.log(videoData);
                        videoId1 = videoData.items[0].id.videoId;
                        videoId2 = videoData.items[1].id.videoId;
                        videoId3 = videoData.items[2].id.videoId;
                        videoId4 = videoData.items[3].id.videoId;
                        videoId5 = videoData.items[4].id.videoId;
                        videoResultsArea.innerHTML = '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId1 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId2 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId3 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId4 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId5 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>'; // Adds video embeds to video section
                    })
                }

                // Displays Recipe 3
    
                function displayRecipe3() {
                    fetch(recipe3Url).then(function(response) { // Fetch request for the full recipe data
                        return response.json();
                    }).then (function(recipe) { // function to display recipe
    
                        recipe3Button.disabled = true;
                        var individualIngredientsOne = recipe.drinks[0].strMeasure1 + ": " + recipe.drinks[0].strIngredient1; // creates the text for the ingredient 3 and it's amount
                        var ingredientListItems1 = document.createTextNode(individualIngredientsOne); // stores the ingredient 3 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems1); // adds ingredient to list
                        recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
    
    
    
                        if (recipe.drinks[0].strIngredient2) {
    
                        var individualIngredientsTwo = recipe.drinks[0].strMeasure2 + ": " + recipe.drinks[0].strIngredient2; // creates the text for the ingredient 3 and it's amount
                        var ingredientListItems2 = document.createTextNode(individualIngredientsTwo); // stores the ingredient 3 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems2); // adds ingredient to list
                        recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                    }
    
    
                        if (recipe.drinks[0].strIngredient3) {
    
                        var individualIngredientsThree = recipe.drinks[0].strMeasure3 + ": " + recipe.drinks[0].strIngredient3; // creates the text for the ingredient 3 and it's amount
                        var ingredientListItems3 = document.createTextNode(individualIngredientsThree); // stores the ingredient 3 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems3); // adds ingredient to list
                        recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                        }
    
    
                        if (recipe.drinks[0].strIngredient4) {
    
                            var individualIngredientsFour = recipe.drinks[0].strMeasure4 + ": " + recipe.drinks[0].strIngredient4; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems4 = document.createTextNode(individualIngredientsFour); // stores the ingredient 3 string
        
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems4); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient5) {
    
                            var individualIngredientsFive = recipe.drinks[0].strMeasure5 + ": " + recipe.drinks[0].strIngredient5; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems5 = document.createTextNode(individualIngredientsFive); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems5); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient6) {
    
                            var individualIngredientsSix = recipe.drinks[0].strMeasure6 + ": " + recipe.drinks[0].strIngredient6; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems6 = document.createTextNode(individualIngredientsSix); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems6); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient7) {
    
                            var individualIngredientsSeven = recipe.drinks[0].strMeasure7 + ": " + recipe.drinks[0].strIngredient7; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems7 = document.createTextNode(individualIngredientsSeven); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems7); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient8) {
    
                            var individualIngredientsEight = recipe.drinks[0].strMeasure8 + ": " + recipe.drinks[0].strIngredient8; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems8 = document.createTextNode(individualIngredientsEight); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems8); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient9) {
    
                            var individualIngredientsNine = recipe.drinks[0].strMeasure9 + ": " + recipe.drinks[0].strIngredient9; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems9 = document.createTextNode(individualIngredientsNine); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems9); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient10) {
    
                            var individualIngredientsTen = recipe.drinks[0].strMeasure10 + ": " + recipe.drinks[0].strIngredient10; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems10 = document.createTextNode(individualIngredientsTen); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems10); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient11) {
    
                            var individualIngredientsEleven = recipe.drinks[0].strMeasure11 + ": " + recipe.drinks[0].strIngredient11; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems11 = document.createTextNode(individualIngredientsEleven); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems11); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient12) {
    
                            var individualIngredientsTwelve = recipe.drinks[0].strMeasure12 + ": " + recipe.drinks[0].strIngredient12; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems12 = document.createTextNode(individualIngredientsTwelve); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems12); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient13) {
    
                            var individualIngredientsThirteen = recipe.drinks[0].strMeasure13 + ": " + recipe.drinks[0].strIngredient13; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems13 = document.createTextNode(individualIngredientsThirteen); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems13); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient14) {
    
                            var individualIngredientsFourteen = recipe.drinks[0].strMeasure14 + ": " + recipe.drinks[0].strIngredient14; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems14 = document.createTextNode(individualIngredientsFourteen); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems14); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient15) {
    
                            var individualIngredientsFifteen = recipe.drinks[0].strMeasure15 + ": " + recipe.drinks[0].strIngredient15; // creates the text for the ingredient 3 and it's amount
                            var ingredientListItems15 = document.createTextNode(individualIngredientsFifteen); // stores the ingredient 3 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems15); // adds ingredient to list
                            recipeListArea3Ingredients.appendChild(createLi); // appends li to the page
                            }
    
                        var cocktail3Instructions = recipe.drinks[0].strInstructions; // grabs cocktail drink 3's instructions
                        recipeListArea3recipe.innerHTML = cocktail3Instructions; // Displays recipe 3 instructions
                    })
                }
            }


            if (data.drinks[3]) {

                            // Displays Cocktail 4
    
                var cocktailName4 = cocktail.drinks[3].strDrink; // grabs cocktail drink 4's name
                var cocktailImage4 = cocktail.drinks[3].strDrinkThumb; // grabs cocktail drink 4's image url
                var cocktailId4 = cocktail.drinks[3].idDrink; // grabs cocktail drink 4's product ID
    
                recipeListArea4.innerHTML = '<hr />' + '<h2>' + cocktailName4 + '</h2> <br /> <img src="' + cocktailImage4 + '" /> <br /> <button id="videos4Button" class="button">View Videos</button> <br /> <button id="recipe4buttonarea4" class="button">View Recipe</button>'; // displays recipe 4 in the recipe list area
    
                var recipe4Button = document.getElementById("recipe4buttonarea4"); // targets the recipe 4 button
                recipe4Button.addEventListener("click", displayRecipe4); // event listener for the recipe 4 button
                var recipe4Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId4; // URL for recipe 4
    
                // Displays Cocktail 4 Videos

                var videos4Button = document.getElementById("videos4Button"); // targets the videos button
                videos4Button.addEventListener("click", displayVideos); // event listener for the videos button

                var videosSearchURLFour = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&videoLicense=creativeCommon&topicId=cocktail&q=" + cocktailName4 + "+cocktail+recipes&key=AIzaSyBYoIu73MgoqyQ-u7uw0g46li87sdWTl2o" // URL for YouTube API Fetch                
                

                function displayVideos() { // function to fetch YouTube API Data based off a search of the cocktail name
                    fetch(videosSearchURLFour).then(function(response) {
                        return response.json();
                    }).then (function(videoData) {
                        console.log(videoData);
                        videoId1 = videoData.items[0].id.videoId;
                        videoId2 = videoData.items[1].id.videoId;
                        videoId3 = videoData.items[2].id.videoId;
                        videoId4 = videoData.items[3].id.videoId;
                        videoId5 = videoData.items[4].id.videoId;
                        videoResultsArea.innerHTML = '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId1 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId2 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId3 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId4 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId5 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>'; // Adds video embeds to video section
                    })
                }

                // Displays Recipe 4


                function displayRecipe4() {
                    fetch(recipe4Url).then(function(response) { // Fetch request for the full recipe data
                        return response.json();
                    }).then (function(recipe) { // function to display recipe
    
                        recipe4Button.disabled = true;
                        var individualIngredientsOne = recipe.drinks[0].strMeasure1 + ": " + recipe.drinks[0].strIngredient1; // creates the text for the ingredient 4 and it's amount
                        var ingredientListItems1 = document.createTextNode(individualIngredientsOne); // stores the ingredient 4 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems1); // adds ingredient to list
                        recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
    
    
    
                        if (recipe.drinks[0].strIngredient2) {
    
                        var individualIngredientsTwo = recipe.drinks[0].strMeasure2 + ": " + recipe.drinks[0].strIngredient2; // creates the text for the ingredient 4 and it's amount
                        var ingredientListItems2 = document.createTextNode(individualIngredientsTwo); // stores the ingredient 4 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems2); // adds ingredient to list
                        recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                    }
    
    
                        if (recipe.drinks[0].strIngredient3) {
    
                        var individualIngredientsThree = recipe.drinks[0].strMeasure3 + ": " + recipe.drinks[0].strIngredient3; // creates the text for the ingredient 4 and it's amount
                        var ingredientListItems3 = document.createTextNode(individualIngredientsThree); // stores the ingredient 4 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems3); // adds ingredient to list
                        recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                        }
    
    
                        if (recipe.drinks[0].strIngredient4) {
    
                            var individualIngredientsFour = recipe.drinks[0].strMeasure4 + ": " + recipe.drinks[0].strIngredient4; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems4 = document.createTextNode(individualIngredientsFour); // stores the ingredient 4 string
        
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems4); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient5) {
    
                            var individualIngredientsFive = recipe.drinks[0].strMeasure5 + ": " + recipe.drinks[0].strIngredient5; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems5 = document.createTextNode(individualIngredientsFive); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems5); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient6) {
    
                            var individualIngredientsSix = recipe.drinks[0].strMeasure6 + ": " + recipe.drinks[0].strIngredient6; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems6 = document.createTextNode(individualIngredientsSix); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems6); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient7) {
    
                            var individualIngredientsSeven = recipe.drinks[0].strMeasure7 + ": " + recipe.drinks[0].strIngredient7; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems7 = document.createTextNode(individualIngredientsSeven); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems7); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient8) {
    
                            var individualIngredientsEight = recipe.drinks[0].strMeasure8 + ": " + recipe.drinks[0].strIngredient8; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems8 = document.createTextNode(individualIngredientsEight); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems8); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient9) {
    
                            var individualIngredientsNine = recipe.drinks[0].strMeasure9 + ": " + recipe.drinks[0].strIngredient9; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems9 = document.createTextNode(individualIngredientsNine); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems9); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient10) {
    
                            var individualIngredientsTen = recipe.drinks[0].strMeasure10 + ": " + recipe.drinks[0].strIngredient10; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems10 = document.createTextNode(individualIngredientsTen); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems10); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient11) {
    
                            var individualIngredientsEleven = recipe.drinks[0].strMeasure11 + ": " + recipe.drinks[0].strIngredient11; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems11 = document.createTextNode(individualIngredientsEleven); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems11); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient12) {
    
                            var individualIngredientsTwelve = recipe.drinks[0].strMeasure12 + ": " + recipe.drinks[0].strIngredient12; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems12 = document.createTextNode(individualIngredientsTwelve); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems12); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient13) {
    
                            var individualIngredientsThirteen = recipe.drinks[0].strMeasure13 + ": " + recipe.drinks[0].strIngredient13; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems13 = document.createTextNode(individualIngredientsThirteen); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems13); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient14) {
    
                            var individualIngredientsFourteen = recipe.drinks[0].strMeasure14 + ": " + recipe.drinks[0].strIngredient14; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems14 = document.createTextNode(individualIngredientsFourteen); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems14); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient15) {
    
                            var individualIngredientsFifteen = recipe.drinks[0].strMeasure15 + ": " + recipe.drinks[0].strIngredient15; // creates the text for the ingredient 4 and it's amount
                            var ingredientListItems15 = document.createTextNode(individualIngredientsFifteen); // stores the ingredient 4 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems15); // adds ingredient to list
                            recipeListArea4Ingredients.appendChild(createLi); // appends li to the page
                            }
    
                        var cocktail4Instructions = recipe.drinks[0].strInstructions; // grabs cocktail drink 4's instructions
                        recipeListArea4recipe.innerHTML = cocktail4Instructions; // Displays recipe 4 instructions
                    })
                }
            }


            if (data.drinks[4]) {

                            // Displays Cocktail 5
    
                var cocktailName5 = cocktail.drinks[4].strDrink; // grabs cocktail drink 5's name
                var cocktailImage5 = cocktail.drinks[4].strDrinkThumb; // grabs cocktail drink 5's image url
                var cocktailId5 = cocktail.drinks[4].idDrink; // grabs cocktail drink 5's product ID
    
                recipeListArea5.innerHTML = '<hr />' + '<h2>' + cocktailName5 + '</h2> <br /> <img src="' + cocktailImage5 + '" /> <br /> <button id="videos5Button" class="button">View Videos</button> <br /> <button id="recipe5buttonarea5" class="button">View Recipe</button>'; // displays recipe 5 in the recipe list area
    
                var recipe5Button = document.getElementById("recipe5buttonarea5"); // targets the recipe 5 button
                recipe5Button.addEventListener("click", displayRecipe5); // event listener for the recipe 5 button
                var recipe5Url = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + cocktailId5; // URL for recipe 5
    
                // Displays Cocktail 5 Videos

                var videos5Button = document.getElementById("videos5Button"); // targets the videos button
                videos5Button.addEventListener("click", displayVideos); // event listener for the videos button

                var videosSearchURLFive = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&videoLicense=creativeCommon&topicId=cocktail&q=" + cocktailName5 + "+cocktail+recipes&key=AIzaSyBYoIu73MgoqyQ-u7uw0g46li87sdWTl2o" // URL for YouTube API Fetch                
                

                function displayVideos() { // function to fetch YouTube API Data based off a search of the cocktail name
                    fetch(videosSearchURLFive).then(function(response) {
                        return response.json();
                    }).then (function(videoData) {
                        console.log(videoData);
                        videoId1 = videoData.items[0].id.videoId;
                        videoId2 = videoData.items[1].id.videoId;
                        videoId3 = videoData.items[2].id.videoId;
                        videoId4 = videoData.items[3].id.videoId;
                        videoId5 = videoData.items[4].id.videoId;
                        videoResultsArea.innerHTML = '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId1 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId2 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId3 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId4 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>' + '&nbsp;' + '<iframe width="800" height="450" src="https://www.youtube.com/embed/' + videoId5 + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>'; // Adds video embeds to video section
                    })
                }

                // Displays Recipe 5

                function displayRecipe5() {
                    fetch(recipe5Url).then(function(response) { // Fetch request for the full recipe data
                        return response.json();
                    }).then (function(recipe) { // function to display recipe
    
                        recipe5Button.disabled = true;
                        var individualIngredientsOne = recipe.drinks[0].strMeasure1 + ": " + recipe.drinks[0].strIngredient1; // creates the text for the ingredient 5 and it's amount
                        var ingredientListItems1 = document.createTextNode(individualIngredientsOne); // stores the ingredient 5 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems1); // adds ingredient to list
                        recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
    
    
    
                        if (recipe.drinks[0].strIngredient2) {
    
                        var individualIngredientsTwo = recipe.drinks[0].strMeasure2 + ": " + recipe.drinks[0].strIngredient2; // creates the text for the ingredient 5 and it's amount
                        var ingredientListItems2 = document.createTextNode(individualIngredientsTwo); // stores the ingredient 5 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems2); // adds ingredient to list
                        recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                    }
    
    
                        if (recipe.drinks[0].strIngredient3) {
    
                        var individualIngredientsThree = recipe.drinks[0].strMeasure3 + ": " + recipe.drinks[0].strIngredient3; // creates the text for the ingredient 5 and it's amount
                        var ingredientListItems3 = document.createTextNode(individualIngredientsThree); // stores the ingredient 5 string
    
                        var createLi = document.createElement("li"); // creates a List Item
                        createLi.appendChild(ingredientListItems3); // adds ingredient to list
                        recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                        }
    
    
                        if (recipe.drinks[0].strIngredient4) {
    
                            var individualIngredientsFour = recipe.drinks[0].strMeasure4 + ": " + recipe.drinks[0].strIngredient4; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems4 = document.createTextNode(individualIngredientsFour); // stores the ingredient 5 string
        
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems4); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient5) {
    
                            var individualIngredientsFive = recipe.drinks[0].strMeasure5 + ": " + recipe.drinks[0].strIngredient5; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems5 = document.createTextNode(individualIngredientsFive); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems5); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient6) {
    
                            var individualIngredientsSix = recipe.drinks[0].strMeasure6 + ": " + recipe.drinks[0].strIngredient6; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems6 = document.createTextNode(individualIngredientsSix); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems6); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient7) {
    
                            var individualIngredientsSeven = recipe.drinks[0].strMeasure7 + ": " + recipe.drinks[0].strIngredient7; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems7 = document.createTextNode(individualIngredientsSeven); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems7); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient8) {
    
                            var individualIngredientsEight = recipe.drinks[0].strMeasure8 + ": " + recipe.drinks[0].strIngredient8; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems8 = document.createTextNode(individualIngredientsEight); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems8); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient9) {
    
                            var individualIngredientsNine = recipe.drinks[0].strMeasure9 + ": " + recipe.drinks[0].strIngredient9; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems9 = document.createTextNode(individualIngredientsNine); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems9); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient10) {
    
                            var individualIngredientsTen = recipe.drinks[0].strMeasure10 + ": " + recipe.drinks[0].strIngredient10; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems10 = document.createTextNode(individualIngredientsTen); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems10); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient11) {
    
                            var individualIngredientsEleven = recipe.drinks[0].strMeasure11 + ": " + recipe.drinks[0].strIngredient11; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems11 = document.createTextNode(individualIngredientsEleven); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems11); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient12) {
    
                            var individualIngredientsTwelve = recipe.drinks[0].strMeasure12 + ": " + recipe.drinks[0].strIngredient12; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems12 = document.createTextNode(individualIngredientsTwelve); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems12); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient13) {
    
                            var individualIngredientsThirteen = recipe.drinks[0].strMeasure13 + ": " + recipe.drinks[0].strIngredient13; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems13 = document.createTextNode(individualIngredientsThirteen); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems13); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient14) {
    
                            var individualIngredientsFourteen = recipe.drinks[0].strMeasure14 + ": " + recipe.drinks[0].strIngredient14; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems14 = document.createTextNode(individualIngredientsFourteen); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems14); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
    
                        if (recipe.drinks[0].strIngredient15) {
    
                            var individualIngredientsFifteen = recipe.drinks[0].strMeasure15 + ": " + recipe.drinks[0].strIngredient15; // creates the text for the ingredient 5 and it's amount
                            var ingredientListItems15 = document.createTextNode(individualIngredientsFifteen); // stores the ingredient 5 string
            
                            var createLi = document.createElement("li"); // creates a List Item
                            createLi.appendChild(ingredientListItems15); // adds ingredient to list
                            recipeListArea5Ingredients.appendChild(createLi); // appends li to the page
                            }
    
                        var cocktail5Instructions = recipe.drinks[0].strInstructions; // grabs cocktail drink 5's instructions
                        recipeListArea5recipe.innerHTML = cocktail5Instructions; // Displays recipe 5 instructions
                    })
                }
            }
                
            };
            displayCocktails(data); // runs the display cocktails function
        } else {
            recipelist1.innerHTML = "No cocktails were found. Please modify your ingredients and try again."
        };
    })
};



// Search Button Event Listener

searchButton.addEventListener("click", executeSearch);



// YouTube API

// YouTube API Key: AIzaSyBYoIu73MgoqyQ-u7uw0g46li87sdWTl2o



// cocktailNameOfClicked = 

// videoSearchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=" + cocktailNameOfClicked + "&key=AIzaSyBYoIu73MgoqyQ-u7uw0g46li87sdWTl2o"


// fetch(videoSearchURL).then(function(response) {
//     return response.json();
// }).then function(data) {
//     console.log(data);
// }