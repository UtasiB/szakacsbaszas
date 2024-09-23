let recipes = [];

let kategoriak = [];
let selectedkategoriak = [];

function addRecipe(){
    let newRecipe={
        userID: loggedUser[0].ID,
        title: document.querySelector('#title').value,
        additions: document.querySelector('#additions').value,
        description: document.querySelector('#description').value,
        time: document.querySelector('#time').value,
        calory: document.querySelector('#calory').value
    }
    
    axios.post(`${serverUrl}/recipe`, newRecipe).then(res=>{
        alert(res.data);
        
        if(res.status == 202){
            document.querySelector('#title').value = null
            document.querySelector('#additions').value = null
            document.querySelector('#description').value = null
            document.querySelector('#time').value = null
            document.querySelector('#calory').value = null

            getRecipes()
        }
    })
}


function katFelvetel(){
    let data ={
        name:document.querySelector('#kat').value
    }

    axios.post(`${serverUrl}/categorys`, data).then(res=>{

        alert(res.data)
    })

    katLekeres();
}

function katLekeres(){

    axios.get(`${serverUrl}/categorys`).then(res=>{
        kategoriak = res.data;
        katFeltoltes()
    })
    
}

function katFeltoltes(){
    
    let categoryList = document.querySelector('#categoryList')
    categoryList.innerHTML = "";

    kategoriak.forEach(item => {
        let li = document.createElement('li')
        li.innerHTML = item.name
        li.classList.add("dropdown-item")    
        li.onclick = function () {hozzaad(item)};

        categoryList.appendChild(li)
    });
}

function hozzaad(item){

    if ((selectedkategoriak.find((ize) => item.ID == ize.ID)) != null) {
        selectedkategoriak.splice(selectedkategoriak.indexOf(selectedkategoriak.find((ize) => item.ID == ize.ID)),1)
    }
    else{
        selectedkategoriak.push(item)
    }
    kategoriadropdown();

}
function kategoriadropdown(){


    let selectedCategoryList = document.querySelector('#selectedCategoryList');
    selectedCategoryList.innerHTML = "";

    selectedkategoriak.forEach(i =>{
        let li = document.createElement('li')
        li.innerHTML = i.name
        li.classList.add("list-group-item")   
    
        selectedCategoryList.appendChild(li)
    })  

}

function getRecipes(){
    axios.get(`${serverUrl}/recipes`).then(res=>{
        recipes = res.data
        loadRecipes()
    })
}

function loadRecipes(){
    let receptek = document.querySelector("#receptek")
    receptek.innerHTML = ""
    
    recipes.forEach(recipe => {
        console.log(recipe)
        let card_div = document.createElement("div")
        card_div.classList.add("card")

        let card_body = document.createElement("div")
        card_body.classList.add("card-body")

        let h5 = document.createElement("h5")
        h5.classList.add("card-title")
        h5.innerHTML = recipe.title

        let p = document.createElement("p")
        p.classList.add("card-text")
        p.innerHTML = recipe.description

        card_body.appendChild(h5)
        card_body.appendChild(p)
        card_div.appendChild(card_body)

        accordion_div = document.createElement("div")
        accordion_div.classList.add("accordion")
        
        hozzavalok_div = document.createElement("div")
        hozzavalok_div.classList.add("accordion-item")

        hozzavalok_h2 = document.createElement("h2")
        hozzavalok_h2.classList.add("accordion-header")

        hozzavalok_btn = document.createElement("button")
        hozzavalok_btn.classList.add("accordion-button")
        hozzavalok_btn.setAttribute("data-bs-target", `#${recipe.ID}-hozzavalok`)
        hozzavalok_btn.setAttribute("data-bs-toggle", `collapse`)
        hozzavalok_btn.setAttribute("type", `button`)
        hozzavalok_btn.innerHTML = "Hozzávalók"

        hozzavalok_h2.appendChild(hozzavalok_btn)
        hozzavalok_div.appendChild(hozzavalok_h2)

        hozzavalok_szoveg_div = document.createElement("div")
        hozzavalok_szoveg_div.classList.add("accordion-collapse","collapse")
        hozzavalok_szoveg_div.setAttribute("id", `${recipe.ID}-hozzavalok`)

        hozzavalok_szoveg = document.createElement("div")
        hozzavalok_szoveg.classList.add("accordion-body")
        hozzavalok_szoveg.innerHTML = recipe.additions
        
        hozzavalok_szoveg_div.appendChild(hozzavalok_szoveg)
        hozzavalok_div.appendChild(hozzavalok_szoveg_div)

        accordion_div.appendChild(hozzavalok_div)




        card_div.appendChild(accordion_div)
        receptek.appendChild(card_div)

        
        
        




        
    });
}
