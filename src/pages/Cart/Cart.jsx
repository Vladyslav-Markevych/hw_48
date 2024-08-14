import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { addMoreProduct, delMoreProduct } from "../../store/slices/cartSlice";
import { removeMealById } from "../../store/slices/cartSlice";

import "./style.css";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.meals);
  const objItem = Object.values(cartItems);
  let totalIngredients = {};

  const dispatch = useDispatch();

  if (objItem.length === 0) {
    return <div>No items in the cart.</div>;
  }

  const handleClickAddMore = (idMeal) => {
    dispatch(addMoreProduct(idMeal));
  };
  const handleClickDelMore = (idMeal) => {
    dispatch(delMoreProduct(idMeal));
  };

  const removeFromCart = (idMeal) => {
    dispatch(removeMealById(idMeal));
  };

  return (
    <div>
      {objItem.map((item) => {
        const ingredients = [];

        for (let i = 1; i < 20; i++) {
          let ing = "strIngredient" + i;
          let ingCount = "strMeasure" + i;
          if (item[ing] && item[ingCount]) {
            // ingredients.push(`${item[ing]} + ${item[ingCount]}`);

            const match = item[ingCount].match(/^(\d+\.?\d*)(\D+)$/);
            // console.log("match", match);
            if (match) {
              let quantity = parseFloat(match[1]);
              const lastText = match[2].trim();
              const product = item[ing];
              // const lastText = elseText.join(" ");
              if (item.forCountIngredients >= 0) {
                quantity = quantity * item.forCountIngredients;
                console.log("quantity", quantity);
                const photoAndIng = {
                  photo: product,
                  ing: `${product} - ${quantity}  ${lastText}`,
                };
                ingredients.push(photoAndIng);
              }

              if (
                totalIngredients[product] &&
                totalIngredients[product].lastText == lastText
              ) {
                totalIngredients[product].quantity += quantity;
              } else if (totalIngredients[product]) {
                totalIngredients[product + " " + "another format"] = {
                  quantity: quantity,
                  lastText: lastText,
                  forImage: product,
                };
              } else if (item.forCountIngredients == 0) {
                delete totalIngredients[product];
              } else {
                totalIngredients[product] = {
                  quantity: quantity,
                  lastText: lastText,
                };
              }
            }
          }
        }
        console.log("totalIngredients", totalIngredients);
        console.log("ingredients", ingredients);

        console.log("id", item.idMeal);
        console.log("id", item.strMeal);
        console.log("id", item.strMealThumb);
        return (
          <>
            <div className='wrapper_Meal'>
              <div
                className={
                  item.forCountIngredients == 0
                    ? "cartBlock grayback"
                    : "cartBlock"
                }
              >
                <div className='poster-info'>
                  <img
                    className='image-product-cart'
                    src={item.strMealThumb}
                    alt={item.idMeal}
                  />
                  <p>{item.strMeal}</p>
                  <p className='countMeal'>{item.forCountIngredients}</p>
                </div>
                <ul className='ulList'>
                  {ingredients.map((listProd) => (
                    <li className='itemList'>
                      <img
                        className='ingImage'
                        src={`https://www.themealdb.com/images/ingredients/${listProd.photo}-Small.png`}
                        alt={listProd.ing}
                      />
                      {listProd.ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {" "}
                <Button onClick={() => handleClickAddMore(item.idMeal)}>
                  +1
                </Button>
                <Button onClick={() => handleClickDelMore(item.idMeal)}>
                  -1
                </Button>
                <Button onClick={() => removeFromCart(item.idMeal)}>
                  Delete
                </Button>
              </div>
            </div>
          </>
        );
      })}
      <div>
        <p>Total ingredients list: </p>
        <ul>
          {Object.entries(totalIngredients).map(
            ([product, { quantity, lastText, forImage }]) => {
              return (
                <li>
                  <img
                    className='productTotalImage'
                    src={`https://www.themealdb.com/images/ingredients/${
                      forImage ? forImage : product
                    }-Small.png`}
                    alt={product}
                  />{" "}
                  {product} - {quantity} {lastText}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
  //   return <div>Cart Page</div>;
};
