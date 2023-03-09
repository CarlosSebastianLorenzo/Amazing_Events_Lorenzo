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

//Funcion para crear las categorias
function createCategories(array){
    let filteredArray = array.map(e => e.category).reduce((acc, category)=>
    {if (!acc.includes(category)){
    acc.push(category)
    }
    return acc;
    },[]
    )
    return filteredArray 
}

//Funcion para crear los Checkboxes
function createChecbox(array, container){
    const fragment2 = document.createDocumentFragment();
    for (let category of array) {
        let $label = document.createElement("label");
        $label.textContent = category
        $label.setAttribute("for",category)
        let $input = document.createElement("input");
        $input.setAttribute("type", "checkbox");
        $input.setAttribute("name", category);
        $input.setAttribute("id", category);
        fragment2.appendChild($input)
        fragment2.appendChild($label)
    }
    container.appendChild(fragment2)
    }

//Funcion para filtrar por Categoria
function filterByCategory(array, text){
    let dataFiltered = array.filter(e => text.toLowerCase().includes(e.category.toLowerCase()))
    return dataFiltered
}

//Filtrar por palabra Clave
function filterByWord(array, keyWord){
    let dataFiltered = array.filter(e => e.name.toLowerCase().includes(keyWord.toLowerCase().trim()))
    return dataFiltered
}

let functions = {createCards, createCategories, createChecbox, filterByCategory, filterByWord} 
export default functions;