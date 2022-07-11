# Cocktail-Concocter

[Deployable Link: https://ericrothmuller.github.io/Cocktail-Concocter/](https://ericrothmuller.github.io/Cocktail-Concocter/)

<img src="assets\Screenshot 2022-07-10 214008.png">

## Description

Cocktail Concocter is a web app that helps a user find a cocktail based on specific ingredients they input. It works by having a user input ingredients on a form. The form is set up with the Awesomplete API, which brings down a list of autocomplete options for the search term. When the adjacent submit button is clicked a list is made with the chosen ingredient erasing the forms previous input. Once the user is saticfied with their choises the user may click the search button, where a list of 5 possible cocktails to make appears with 2 buttons, one which opens up its recipe and another to load tutorial videos witrh the Youtube API.


## Technologies used

Technologies used in project include: 
HTML, CSS, JavaScript, DOM, Github
CSS Framework- Tailwind
APIs- The CocktailDB API, YouTube API, Google Fonts API (croissant One & Marck Script), Awesomplete API (autofill)

On VS code and GitBash.



## Code and Functionality

### In this HTML code we use the Awsomplete API to autofill the form input, by adding in their 'awesomplete' class to the ```<input>``` :
```
<div id="ingredients">
    <h2 class="sectiontitle"><u>Your Ingredients:</u></h2>
    <form id="addingredientform" class="flex"> <!--Form Stylings-->
        <input class="awesomplete" list="mylist" id="addingredienttext"/>
            <datalist id="mylist">
``` 
<img width="50%" src="assets\Screenshot 2022-07-10 215125.png">


### Here we have some JavaScript code that fetches the cocktail API appends the ingredients to the list:
```
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
```

### With this JavaScript code the when submit is clicked the ingredients are added to a ```<li>``` and appended under the input:
```
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
```
<img width="50%" src="assets\ingredientslist.gif">


## Contact Infromation


Eric Rothmuller

[E-mail: ](mailto:)
[GitHub: ]()  
[LinkdIn: ]()


Austin Park

[E-mail: ](mailto:)
[GitHub: ]()  
[LinkdIn: ]()


Shmuel Hoffman

 [E-mail: Snyh121@gmail.com](mailto:snyh121@gmail.com)  
[GitHub: snyh212](https://r.search.yahoo.com/_ylt=AwrJ6yegl7JipfcAzB5XNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1655900193/RO=10/RU=https%3a%2f%2fgithub.com%2fsnyh212/RK=2/RS=jAFa0VbZnIusPrwj.ZmIx9gZ3AA-)  
[LinkdIn: Shmuel-Hoffman](https://www.linkedin.com/in/shmuel-hoffman-254b0223b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BS2rg0PtBTLeG2szT2ZbGmg%3D%3D)