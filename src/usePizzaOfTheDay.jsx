import { useEffect, useState, useDebugValue } from "react";
export const userPizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(
    pizzaOfTheDay
      ? `${pizzaOfTheDay.id} : ${pizzaOfTheDay.name}`
      : "loading...",
  );
  useEffect(() => {
    async function fetechPizzaOfTheDay() {
      const res = await fetch("/api/pizza-of-the-day");
      const data = await res.json();
      setPizzaOfTheDay(data);
    }
    fetechPizzaOfTheDay();
  }, []);
  return pizzaOfTheDay;
};
