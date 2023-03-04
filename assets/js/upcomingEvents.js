import data from './data.js';

const futureData = data.events.filter(e => e.date>=data.currentDate)
//cuando se capturan elementos HTML se usa signo $

//Funcion para crear las cards
function createCards(array, idTemplate, idDiv){
  
  const $cards = document.getElementById(idDiv);
  const $template = document.getElementById(idTemplate).content;
  const fragment = document.createDocumentFragment();
  $cards.textContent = "";
  
  if (!array.length == 0){
    for (let i = 0; i < array.length; i++) {
      $template.querySelector('section').setAttribute('id', array[i].category)
      $template.querySelector('section span').style.backgroundImage = `url(${array[i].image})`
      $template.querySelector('section h3').textContent = array[i].name
      $template.querySelector('section h5').textContent = array[i].description
      $template.querySelector('section div p').textContent = `Price $${array[i].price},00`
      $template.querySelector('section div a').style.display = "flex"
      $template.querySelector('section div a').setAttribute('href',`/pages/details.html?id=${array[i]._id}`)
      let clone = $template.cloneNode(true)
      fragment.appendChild(clone)
    }
  } else {
    let $section = document.createElement('section')
    $section.innerHTML = `<span class="img" style='background-image: url("../assets/NotFound.gif");'></span>
                          <h3>Not Result Found 😿</h3>
                          <h5>Sorry, we couldn't find any results</h5>`
    fragment.appendChild($section)
  }

  $cards.appendChild(fragment)

}

//Llamamos la funcion cards cuando inicia la pagina
createCards(futureData, "template", "cards")

//Crear los Checkbox de Categorias de forma dinámica 

let arrayCategories = futureData.map(e => e.category).reduce((acc, category)=>
{if (!acc.includes(category)){
  acc.push(category)
}
return acc;
},[]
)

const $filters = document.getElementById('filters');
const fragment2 = document.createDocumentFragment();

for (let category of arrayCategories) {
    let $label = document.createElement("label");
    $label.textContent = category
    $label.setAttribute("for",category)
    let $input = document.createElement("input");
    $input.setAttribute("type", "checkbox");
    $input.setAttribute("name", category);
    $input.setAttribute("id", category);
    fragment2.appendChild($label)
    fragment2.appendChild($input)
}

$filters.appendChild(fragment2)

//Filtrar por categoría
let filteredData = futureData

function filterByCategory(array, text){
  let dataFiltered = array.filter(e => text.toLowerCase().includes(e.category.toLowerCase()))
  return dataFiltered
}

$filters.addEventListener("change", function(){
  let $checkbox = $filters.getElementsByTagName("input")
  let text = ""
   $search.value = ""

  for (let i = 0; i < $checkbox.length; i++) {
    if($checkbox[i].checked){
      text += $checkbox[i].id.toLocaleLowerCase()
    }
  }
  if (!text == ""){
    filteredData = filterByCategory(futureData,text)
  }
  else{
    filteredData = futureData
  }
  createCards(filteredData, "template", "cards")
})

//Filtrar por palabra Clave

function filterByWord(array, keyWord){
  let dataFiltered = array.filter(e => e.name.toLowerCase().includes(keyWord.toLowerCase()))
  return dataFiltered
}

const $search = document.getElementById("search");

let filteredData2 = filteredData

$search.addEventListener("keyup", function(e){
  if (e.key === "Escape")
  {$search.value = ""
  filteredData2 = filteredData
  }
  filteredData2 = filterByWord(filteredData, $search.value)
  createCards(filteredData2, "template", "cards")
})

//Crear Cards Filtradas en Submit

const $formSearch = document.getElementById("formSearch");

$formSearch.addEventListener("submit", function(e){
  e.preventDefault()
  createCards(filteredData2, "template", "cards")
})