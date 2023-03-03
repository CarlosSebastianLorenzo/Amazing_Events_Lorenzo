import data from './data.js';

function createFutureCards(array, idTemplate, idDiv){

  const $cards = document.getElementById(idDiv);
  const $template = document.getElementById(idTemplate).content;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array.events.length; i++) {
    if (array.events[i].date >= array.currentDate){
      $template.querySelector('section span').style.backgroundImage = `url(${array.events[i].image})`
      $template.querySelector('section h3').textContent = array.events[i].name
      $template.querySelector('section h5').textContent = array.events[i].description
      $template.querySelector('section div p').textContent = `Price $${array.events[i].price},00`
      const clone = $template.cloneNode(true)
      fragment.appendChild(clone)
    }
  }

  $cards.appendChild(fragment)
  
  document.getElementById("template").remove();

}
createFutureCards(data, "template", "cards")