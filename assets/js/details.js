let apiURL = '../assets/js/amazing.json';

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get('id')

const $div = document.querySelector(".cardDetails")

async function fetchData(){
    try{
        const response = await fetch(apiURL);
        const data = await response.json();
        let array = data.events.map(e => {
            if (e.assistance){
                return e
            }
            else {
                return {
                    ...e,
                    assistance: e.estimate
                }
            }
        });

        const card = array.find(card => card._id == id)

        $div.innerHTML = `
            <div>
            <span style='background-image: url("${card.image}");'></span>
            <div>
                <h1>${card.name}</h1>
                <h3>Date:  ${card.date}</h3>
                <p>${card.description}</p>
                <h3>Category:  ${card.category}</h3>
                <h3>Place:  ${card.place}</h3>
                <p>Capacity:  ${card.capacity.toLocaleString()}</p>
                <p>Assistance or Estimate:  ${card.assistance.toLocaleString()}</p>
                <p>Price:  $${card.price},00</p>
            </div>
            </div>
        `
    }
    catch(error){
        console.log(error);
    }
}
fetchData();



