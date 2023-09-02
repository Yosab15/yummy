//select elements
let datashow = document.getElementById("datashow");
let searchBody = document.getElementById("searchBody");
let submitBtn =document.getElementById("submitBtn");

//!!!!!! functions
//* first calling function
closeNav()

// lodding screen
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
    })
})
// open and close nav
function openNav() {
    $(".nav-menu").animate({left: 0}, 1000)
    $(".openicon").removeClass("fa-align-justify");
    $(".openicon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({top: 0}, (i + 5) * 100)
    }
}
function closeNav() {
    let boxWidth = $(".nav-menu .nav-tab").outerWidth()
    $(".nav-menu").animate({left: -boxWidth}, 1000)
    $(".openicon").addClass("fa-align-justify");
    $(".openicon").removeClass("fa-x");
    $(".links li").animate({top: 500}, 500)
}

// display meals from api
function displayMeals(meals) {
    let cartoona = "";
    for (let i = 0; i < meals.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealid('${meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100 img-fluid" src="${meals[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>`
    }
    datashow.innerHTML = cartoona
}
// get random mealdetalis from api
async function getMealid(mealID) {
    closeNav()
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    searchBody.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".loading-screen-section").fadeOut(500)
}
// get categories from api
async function getCategories() {
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    searchBody.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    $(".loading-screen-section").fadeOut(500)
}
// display categories from api
function displayCategories(mealcategories) {
    let cartoona = "";
    for (let i = 0; i < mealcategories.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategorytyep('${mealcategories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100 img-fluid" src="${mealcategories[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${mealcategories[i].strCategory}</h3>
                        <p>${mealcategories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>`
    }
    datashow.innerHTML = cartoona
}
// get random catagorytyep from api
async function getCategorytyep(category) {
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen-section").fadeOut(500)
}
// get area from api
async function getArea() {
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    searchBody.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    // console.log(respone.meals);
    displayArea(respone.meals)
    $(".loading-screen-section").fadeOut(500)
}
// display area from api
function displayArea(areas) {
    let cartoona = "";
    for (let i = 0; i < areas.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreatyep('${areas[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${areas[i].strArea}</h3>
                </div>
        </div>`
    }
    datashow.innerHTML = cartoona
}
// get random areatyep from api
async function getAreatyep(area) {
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen-section").fadeOut(500)
}
// get ingredients from api
async function getIngredients() {
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    searchBody.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    // console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
    $(".loading-screen-section").fadeOut(500)
}
// display ingredients from api
function displayIngredients(arringredients) {
    let cartoona = "";
    for (let i = 0; i < arringredients.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientstyep('${arringredients[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arringredients[i].strIngredient}</h3>
                        <p>${arringredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>`
    }
    datashow.innerHTML = cartoona
}
// get random ingredientstyep from api
async function getIngredientstyep(ingredients) {
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen-section").fadeOut(500)
}

// display random mealdetalis from api
function displayMealDetails(meal) {
    searchBody.innerHTML = "";
    let boxing = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            boxing += `<li class="alert alert-info m-2 p-1">
            ${meal[`strMeasure${i}`]}
            ${meal[`strIngredient${i}`]}
            </li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">
        ${tags[i]}
        </li>`
    }
    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${boxing}</ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
            datashow.innerHTML = cartoona
}
// desplay search inputs
function showSearchInputs() {
    searchBody.innerHTML = `
    <div class="row py-4 ">
    <!-- search with name -->
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <!-- search with 1 letter -->
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    datashow.innerHTML = ""
}
// search by name
async function searchByName(term) {
    closeNav()
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen-section").fadeOut(500)
}
// search by first letter
async function searchByLetter(term) {
    closeNav()
    datashow.innerHTML = ""
    $(".loading-screen-section").fadeIn(500)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen-section").fadeOut(500)
}
// show contacts inputs
function showContacts() {
    datashow.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name" fdprocessedid="i66jch">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email" >
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone" >
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age" >
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password" >
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword" >
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>`
}
// validation name
function namevalidat() {
    let name = $("#nameInput").val()
    let nameRegex = /^[a-zA-Z0-9]{3,50}$/;
    if (nameRegex.test(name)) {
        $("#nameInput").removeClass("is-invalid")
        $("#nameInput").addClass("is-valid")
        $("#nameAlert").addClass("d-none")
        $("#nameAlert").removeClass("d-block")
        return true
    } else {
        $("#nameInput").removeClass("is-valid")
        $("#nameInput").addClass("is-invalid")
        $("#nameAlert").addClass("d-block")
        $("#nameAlert").removeClass("d-none")
        return false
    }
}
// validation email
function emailvalidat() {
    let email = $("#emailInput").val()
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
        $("#emailInput").removeClass("is-invalid")
        $("#emailInput").addClass("is-valid")
        $("#emailAlert").addClass("d-none")
        $("#emailAlert").removeClass("d-block")
        return true
    } else {
        $("#emailInput").removeClass("is-valid")
        $("#emailInput").addClass("is-invalid")
        $("#emailAlert").addClass("d-block")
        $("#emailAlert").removeClass("d-none")
        return false
    }

}
// validation phone
function phonevalidat() {
    let phone = $("#phoneInput").val()
    let phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (phoneRegex.test(phone)) {
        $("#phoneInput").removeClass("is-invalid")
        $("#phoneInput").addClass("is-valid")
        $("#phoneAlert").addClass("d-none")
        $("#phoneAlert").removeClass("d-block")
        return true
    } else {
        $("#phoneInput").removeClass("is-valid")
        $("#phoneInput").addClass("is-invalid")
        $("#phoneAlert").addClass("d-block")
        $("#phoneAlert").removeClass("d-none")
        return false
    }
}
// validation age
function agevalidat() {
    let age = $("#ageInput").val()
    let ageRegex = /^[0-9]{1,2}$/;
    if (ageRegex.test(age)) {
        $("#ageInput").removeClass("is-invalid")
        $("#ageInput").addClass("is-valid")
        $("#ageAlert").addClass("d-none")
        $("#ageAlert").removeClass("d-block")
        return true
    } else {
        $("#ageInput").removeClass("is-valid")
        $("#ageInput").addClass("is-invalid")
        $("#ageAlert").addClass("d-block")
        $("#ageAlert").removeClass("d-none")
        return false
    }
}
// validation password
function passwordvalidat() {
    let password = $("#passwordInput").val()
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
        $("#passwordInput").removeClass("is-invalid")
        $("#passwordInput").addClass("is-valid")
        $("#passwordAlert").addClass("d-none")
        $("#passwordAlert").removeClass("d-block")
        return true
    } else {
        $("#passwordInput").removeClass("is-valid")
        $("#passwordInput").addClass("is-invalid")
        $("#passwordAlert").addClass("d-block")
        $("#passwordAlert").removeClass("d-none")
        return false
    }
}
// validation repassword
function repasswordvalidat() {
    let password = $("#passwordInput").val()
    let repassword = $("#repasswordInput").val()
    if (password == repassword) {
        $("#repasswordInput").removeClass("is-invalid")
        $("#repasswordInput").addClass("is-valid")
        $("#repasswordAlert").addClass("d-none")
        $("#repasswordAlert").removeClass("d-block")
        return true
    } else {
        $("#repasswordInput").removeClass("is-valid")
        $("#repasswordInput").addClass("is-invalid")
        $("#repasswordAlert").addClass("d-block")
        $("#repasswordAlert").removeClass("d-none")
        return false
    }
}
// validation all inputs
function inputsValidation() {
    if (namevalidat() && emailvalidat() && phonevalidat() && agevalidat() && passwordvalidat() && repasswordvalidat()) {
        $("#submitBtn").removeAttr("disabled")
    } else {
        $("#submitBtn").attr("disabled", true)
    }
}
// submit user
function submit() {
    let name = $("#nameInput").val()
    let email = $("#emailInput").val()
    let phone = $("#phoneInput").val()
    let age = $("#ageInput").val()
    let password = $("#passwordInput").val()
    let repassword = $("#repasswordInput").val()
    let user = {
        name,
        email,
        phone,
        age,
        password,
        repassword
    }
    localStorage.setItem("user", JSON.stringify(user))
}
//!!!!!! end functions
//events listeners
$('.links li').click(function () {
    closeNav()
})
$(".nav-menu i.openicon").click(() => {
    if ($(".nav-menu").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})



