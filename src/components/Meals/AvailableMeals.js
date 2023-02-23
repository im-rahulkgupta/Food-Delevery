import { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-http-4c1ae-default-rtdb.firebaseio.com/meals.json"
        );

        // if (!response.ok) {
        //   throw new Error("Something Went Wrong !");
        // }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMeals(loadedMeals);
        localStorage.setItem("meals", JSON.stringify(loadedMeals));
      } catch (error) {
        if (!navigator.onLine) {
          const mealsStored = localStorage.getItem("meals");
          setMeals(JSON.parse(mealsStored));
          setIsOffline(true);
        } else {
          setHttpError(error.message);
          throw new Error("Something Went Wrong !");
        }
      } finally {
        setIsloading(false);
      }
    };

    fetchMeals();
    // .catch((error) => {
    //   setIsloading(false);
    //   setHttpError(error.message);
    //   console.log("error", error.message);
    // });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      title={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {isOffline ? <p className={classes.offline}>You are offline</p> : null}
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;
