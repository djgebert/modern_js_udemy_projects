// FoodItem
function FoodItem(meal, calories){
  this.id = Symbol(meal);
  this.meal = meal;
  this.calories = calories;
}

FoodItem.prototype = {
  getId: function(){
    return this.id;
  },

  setMeal: function(meal){
    this.id = Symbol(meal);
    this.meal = meal;
  },

  getMeal: function(){
    return this.meal;
  },

  setCalories: function(calories){
    this.calories = calories;
  },

  getCalories: function(){
    return this.calories;
  }
}

// Item Controller
const ItemController = (function(){
  // const FoodItem = function(id, meal, calories){
  //   this.id = id;
  //   this.meal = meal;
  //   this.calories = calories;
  // }

  /** @type {Array<FoodItem>} */
  const items = [];

  return {
    getItems: () => {return items},
    
    addItem: function(meal, calories){
      items.push(new FoodItem(meal, calories));
    },

    updateItem(id, meal, calories){
      /** @type {FoodItem} */
      const targetItem = items.find((item) => item.id === id);
      if(targetItem.meal !== meal){
        targetItem.setMeal(meal);
      }
      targetItem.setCalories(calories);
    },

    deleteItem(id){
      const targetIndex = items.find((item) => item.id === id);
      items.splice(targetIndex, 1);
    }
  };
})();

// UI Controller
const UIController = (function(){
  const addButton = document.querySelector(".add-btn");
  const nameInput = document.getElementById("item-name");
  const caloriesInput = document.getElementById("item-calories");
  const itemListUL = document.getElementById("item-list");

  // Listeners
  addButton.addEventListener("click", handleAddMeal);

  function handleAddMeal(e){
    ItemController.addItem(nameInput.value, caloriesInput.value);
    displayItems();
    e.preventDefault();
  }

  function displayItems(){
    let itemsHtml = ""
    for (const item of ItemController.getItems()) {
      itemsHtml += `
      <li class="collection-item" id="${JSON.stringify(item.getId())}">
      <strong>${item.getMeal()}: </strong> <em>${item.getCalories()} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
    </li>`
    }
    itemListUL.innerHTML = itemsHtml;
  }

  return {
    
  };
})();



// App controller
const App = (function(ItemController, UIController){

})(ItemController, UIController);

