const PIZZAS_URL = `http://localhost:8080/api/v1/pizzas`;

const pizzasListDom = document.getElementById("pizzas-list");

/* API */
const getPizzaList = async () => {

    const response = await fetch(PIZZAS_URL);
    const jsonify = await response.json();
    console.log(jsonify);
    loadPizzaList(jsonify);
    return response;
    
}



const loadPizzaList = (list) => {

    let content = ``;
    list.forEach(element => {
        content += `
                <div class ="col">    
                    <div class="card">
                    
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Price: ${element.price}€</li>
                            <li class="list-group-item">Ingredients:`
                            
        element.ingredients.forEach(ingredient => {

            content += `     <span>${ingredient.name},</span>` 

        })
                            
        content += `        </li>    
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>
                </div>`;
    });
    
    pizzasListDom.innerHTML = content;

}

getPizzaList();