import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const Route = createLazyFileRoute("/order")({
  component: Order,
});
function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);
  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    setCart([]);
    setLoading(false);
  }
  useEffect(() => {
    async function fetchPizzaTypes() {
      const pizzaRes = await fetch("/api/pizzas");
      const pizzaJson = await pizzaRes.json();
      setPizzaTypes(pizzaJson);
      setLoading(false);
    }
    fetchPizzaTypes();
  }, []);
  let price, selectedPizza;
  if (loading) {
    return <div>Loading...</div>;
  } else {
    selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    price = intl.format(selectedPizza.sizes[pizzaSize]);
    console.log(selectedPizza);
  }
  function addToCart() {
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price: price }]);
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        action={addToCart}
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              {["S", "M", "L"].map((size) => (
                <span key={size}>
                  <input
                    checked={pizzaSize === size}
                    onChange={(e) => setPizzaSize(e.target.value)}
                    type="radio"
                    name="pizza-size"
                    value={size}
                    id={`pizza-${size.toLowerCase()}`}
                  />
                  <label htmlFor={`pizza-${size.toLowerCase()}`}>
                    {size === "S" ? "Small" : size === "M" ? "Medium" : "Large"}
                  </label>
                </span>
              ))}
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {selectedPizza && (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              desp={selectedPizza.description}
              img={selectedPizza.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
      {loading ? (
        <h2>Loading ... </h2>
      ) : (
        <Cart checkout={checkout} cart={cart} />
      )}
    </div>
  );
}
