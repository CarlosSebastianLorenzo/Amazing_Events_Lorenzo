import functions from './functions.js';
let apiURL = '../assets/js/amazing.json';
let array = []
let pastArray = []
let upcomingArray = []
const $statistics = document.getElementById('statistics');
const $upStatistics = document.getElementById('upStatistics');
const $pastStatistics = document.getElementById('pastStatistics');
let eventsWithHighestPercentageOfAttendance = []
let eventsWithLowestPercentageOfAttendance = []
let eventsWithLargerCapacity = []

async function fetchData(){
    try{
        const response = await fetch(apiURL);
        const data = await response.json();
        array = data.events;
        pastArray = data.events.filter(e => e.date<data.currentDate);
        upcomingArray = data.events.filter(e => e.date>=data.currentDate);

        //creamos un array con los porcentajes de asistencia
        let percentageOfAttendance = array.map(e => {
            if (e.estimate){
                return Number(e.estimate/e.capacity)
            }
            else {
                return Number(e.assistance/e.capacity)
            }
            })
        
        //Usamos el spread Operator para transformar el array en una lista de números para poder usar Math
        let highestPercentageOfAttendance = Math.max(...percentageOfAttendance);
        let lowestPercentageOfAttendance = Math.min(...percentageOfAttendance);

        //Filtramos el array para obtener los que tengan mayor porcentaje de asistencia
        eventsWithHighestPercentageOfAttendance = array.filter(e => {
            if (e.estimate){
                if((e.estimate/e.capacity)==highestPercentageOfAttendance){
                    return e.name
                }
            }
            else {
                if((e.assistance/e.capacity)==highestPercentageOfAttendance){
                    return e.name
                }
            }
            }).map(e => [e.name, (highestPercentageOfAttendance*100).toFixed(2)+"%"].join(' '))

        //Filtramos el array para obtener los que tengan menor porcentaje de asistencia
        eventsWithLowestPercentageOfAttendance = array.filter(e => {
            if (e.estimate){
                if((e.estimate/e.capacity)===lowestPercentageOfAttendance){
                    return e.name
                }
            }
            else {
                if((e.assistance/e.capacity)===lowestPercentageOfAttendance){
                    return e.name
                }
            }
            }).map(e => [e.name, (lowestPercentageOfAttendance*100).toFixed(2)+"%"].join(' '))

        //creamos un array de capacidades y obtenemos la mayor capacidad
        let arrayOfCapacities = array.map(e=>e.capacity)
        let largerCapacity = Math.max(...arrayOfCapacities)

        //Filtramos el array para obtener los que tengan la mayor capcidad
        eventsWithLargerCapacity = array.filter(e=> e.capacity === largerCapacity).map(e => [e.name, largerCapacity.toLocaleString('en-US')].join(' '))

        $statistics.innerHTML += `
        <tr>
            <td class="vanish" id="td1">${eventsWithHighestPercentageOfAttendance[0]}</td>
            <td class="vanish" id="td2">${eventsWithLowestPercentageOfAttendance[0]}</td>
            <td class="vanish" id="td3">${eventsWithLargerCapacity[0]}</td>
        </tr>
        `

        //Upcoming events statistics by category
        let upcomingStatisticByCategory = functions.addyngByCategory(upcomingArray.map(e=>
            [e.category,(e.price*e.estimate),(100*e.estimate/e.capacity)]
        ))
        
        createRows(upcomingStatisticByCategory, $upStatistics)

        //Past Events statistic by category
        let pastStatisticByCategory = functions.addyngByCategory(pastArray.map(e=>
            [e.category,(e.price*e.assistance),(100*e.assistance/e.capacity)]
        ))
        createRows(pastStatisticByCategory, $pastStatistics)

    }
    catch(error){
        console.log(error);
    }
}

fetchData();

//Crear filas en base al array
function createRows(array, container){
    let text = ""
    array.forEach(e=>
        text += `
        <tr>
        <td>${e[0]}</td>
        <td>$${(e[1]).toLocaleString('en-US')}.00</td>
        <td>${(e[2])}%</td>
        </tr>
        `,
        )
    container.innerHTML += text
}

//Mostrar cada elemento del array cada 5 segundos en la primer parte de la tabla
let i = 1
function changeName (array, td){
    document.getElementById(td).innerHTML = array[i];
    if(i < array.length-1){
        i++;
    }
    else{
        i=0;
    }
}

setInterval(function(){changeName(eventsWithHighestPercentageOfAttendance,"td1")},5000);

let n = 1
function changeName2 (array, td){
    document.getElementById(td).textContent = array[n]
    if(n < array.length-1){
        n++;
    }
    else{
        n=0;
    }
}

setInterval(function(){changeName2(eventsWithLowestPercentageOfAttendance,"td2")},5000);

let m = 1
function changeName3 (array, td){
    document.getElementById(td).textContent = array[m]
    if(m < array.length-1){
        m++;
    }
    else{
        m=0;
    }
}

setInterval(function(){changeName3(eventsWithLargerCapacity,"td3")},5000);