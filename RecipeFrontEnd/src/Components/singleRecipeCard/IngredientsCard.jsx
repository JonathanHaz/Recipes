import { useState } from 'react';
import './ingredientCard.css';

export default function IngredientsCard({ recipe }) {
    let [servings, setServings] = useState(1);
    const [isMetric, setIsMetric] = useState(true);

    const toggleMetric = () => {
        setIsMetric(!isMetric);
    };


    const addServing = () => {
        setServings(prevServings => prevServings + 1);
    };

    const decreaseServing = () => {
        setServings(prevServings => prevServings - 1);
    };

    return (
        <div id="ingredientWrapper">
            <h1 id="ingredientTitle">Ingredients</h1>
            <div id="servingsMeasurmentContainer">
                <div id="servings">
                    <span id="servingLabel">servings</span>
                    <div className="servingCounter">
                        <button onClick={decreaseServing} className="servingCounterBtn">-</button>
                        <span className="servingLabelCounter">{servings}</span>
                        <button onClick={addServing} className="servingCounterBtn">+</button>
                    </div>
                </div>
                <div id="measurmentUnit">
                    <div id="metricButtons">
                        <button
                            id="metricBtnLeft"
                            className={`metricBtn ${isMetric ? 'activeMetric' : ''
                                }`}
                            onClick={toggleMetric}
                        >
                            Metric
                        </button>
                        <button
                            id="metricBtnRight"
                            className={`metricBtn ${!isMetric ? 'activeMetric' : ''
                                }`}
                            onClick={toggleMetric}
                        >
                            US
                        </button>
                    </div>
                </div>
            </div>
            <div id="line"></div>
            <div id='ingredientsContainer'>

                {recipe.ingridients?.map((ingredient) => (
                    <div key={ingredient._id} className="nameAndAmount">
                        <span className="name">{ingredient.name}</span>
                        <div className="quantity">
                            <span className="amount">{ingredient.quantity}</span>
                            <span className='ingredientMeasurment'>{ingredient.measurement}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
