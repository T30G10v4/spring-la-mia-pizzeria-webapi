package me.matteogiovagnotti.springlamiapizzeria.api;


import jakarta.validation.Valid;
import me.matteogiovagnotti.springlamiapizzeria.exceptions.PizzaNotFoundException;
import me.matteogiovagnotti.springlamiapizzeria.models.Ingredient;
import me.matteogiovagnotti.springlamiapizzeria.models.Pizza;
import me.matteogiovagnotti.springlamiapizzeria.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/pizzas")
public class PizzaRestController {


    @Autowired
    private PizzaService pizzaService;

    @GetMapping
    public List<Pizza> list(@RequestParam(name = "q") Optional<String> search )  {

        if(search.isPresent()) return pizzaService.getFilteredPizzas(search.get());
        return pizzaService.getAllPizzas();

    }

    @GetMapping("/{id}")
    public Pizza getById(@PathVariable Integer id) {

        try {
            return pizzaService.getById(id);
        } catch (PizzaNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping
    public Pizza create(@Valid @RequestBody Pizza pizza) {

        return pizzaService.createPizza(pizza);

    }

    @PutMapping("/{id}")
    public Pizza update(@PathVariable Integer id, @Valid @RequestBody Pizza pizza){

        try {
            return pizzaService.updatePizza(pizza, id);
        } catch (PizzaNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch(Exception e) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());

        }

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {

        try {
            boolean success = pizzaService.deleteById(id);
            if(!success) throw new ResponseStatusException(HttpStatus.CONFLICT, "Unable to delete pizza because it has ingredients");
        } catch (PizzaNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/{id}/ingredients")
    public Set<Ingredient> getPizzaIngredients(@PathVariable("id") Integer pizzaId){

        Pizza pizza = null;

        try {
            pizza = pizzaService.getById(pizzaId);
        } catch (PizzaNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return pizza.getIngredients();


    }

}
