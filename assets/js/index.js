import functions from './functions.js';
let apiURL = 'assets/js/amazing.json';
let array = []
let arrayCategories = []

async function fetchData(){
  try{
    const response = await fetch(apiURL);
    const data = await response.json();
    array = data.events;

    //Llamamos la funcion cards cuando inicia la pagina
    functions.createCards(array, "template", "cards");

    //Crear los Checkbox de Categorias de forma dinámica 
    arrayCategories = functions.createCategories(array);
    functions.createChecbox(arrayCategories, $filters);
  }
  catch(error){
    console.log(error);
  }
}
fetchData();

//Filtrar por categoría
let filteredData = array
let filteredData2 = filteredData

const $filters = document.getElementById('filters');

$filters.addEventListener("change", function(){
  let $checkbox = $filters.getElementsByTagName("input")
  let text = ""
  for (let i = 0; i < $checkbox.length; i++) {
    if($checkbox[i].checked){
      text += $checkbox[i].id.toLocaleLowerCase()
    }
  }
  if (!text == ""){
    filteredData = functions.filterByCategory(array,text)
  }
  else{
    filteredData = array
  }
  filteredData2 = functions.filterByWord(filteredData, $search.value)
  functions.createCards(filteredData2, "template", "cards")
})

//Filtrar por Nombre
const $search = document.getElementById("search");

$search.addEventListener("keyup", function(e){
  if (e.key === "Escape")
  {$search.value = ""
  filteredData2 = filteredData
  }
  filteredData2 = functions.filterByWord(filteredData, $search.value)
  functions.createCards(filteredData2, "template", "cards")
})

//Crear Cards Filtradas en Submit
const $formSearch = document.getElementById("formSearch");

$formSearch.addEventListener("submit", function(e){
  e.preventDefault()
  functions.createCards(filteredData2, "template", "cards")
})