import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Meal from '../Meal/Meal';
import OrderList from '../OrderList/OrderList';
import './Restaurant.css';

const Restaurant = () => {
    const [meals, setMeals] = useState([]);
    const [order, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=fish')
            .then(res => res.json())
            .then(data => setMeals(data.meals));
    }, []);
   

        useEffect( () =>{
            const storedOrder = getStoredCart();
            const savedOrder = [];

            for(const id in storedOrder){
                const addedMeal = meals.find(meal => meal.idMeal === id);
                if(addedMeal){
                    const quantity = storedOrder[id];
                    addedMeal.quantity = quantity;
                    savedOrder.push(addedMeal);
                }
            }
            setOrders(savedOrder);
        }, [meals])
    
    const handleAddToOrder = meal => {
        meal.quantity = 1;
        const newOrder = [...order, meal];
        setOrders(newOrder);
        console.log(meal)
        addToDb(meal.idMeal)
    }


    return (
        <div className="restaurant-menu">
            <div className="meals-container">
                {
                    meals.map(meal => <Meal
                        key={meal.idMeal}
                        meal={meal}
                       handleAddToOrder={handleAddToOrder}
                    ></Meal>)
                }
            </div>
            <div className="order-list">
                <OrderList orders={order}></OrderList>
            </div>
        </div>

    );
};

export default Restaurant;