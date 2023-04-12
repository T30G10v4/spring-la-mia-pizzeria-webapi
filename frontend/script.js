const PIZZAS_URL = `http://localhost:8080/api/v1/pizzas`;

const pizzasListDom = document.getElementById("pizzas-list");
const formDom = document.getElementById("form");

/* API */
const getPizzaList = async () => {

    const response = await fetch(PIZZAS_URL);
    const jsonify = await response.json();
    
    loadPizzaList(jsonify);
    return response;
    
}

const postPizza = async (jsonData) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
    const response = await fetch(PIZZAS_URL, fetchOptions);
    return response;
  };



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

const savePizza = async (event) => {
    // prevent default
    event.preventDefault();
    // read input values
    const formData = new FormData(event.target);
    console.log(formData)
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj)
    // VALIDATION
    // produce a json
    const formDataJson = JSON.stringify(formDataObj);
    console.log(formDataJson)
    // send ajax request
    const response = await postPizza(formDataJson);
    console.log(response)
    // parse response
    const responseBody = await response.json();
    if (response.ok) {
      // reload data
      loadData();
      // reset form
      event.target.reset();
    } else {
      // handle error
      console.log('ERROR');
      console.log(response.status);
      console.log(responseBody);
    }
  };

formDom.addEventListener('submit', savePizza);
getPizzaList();