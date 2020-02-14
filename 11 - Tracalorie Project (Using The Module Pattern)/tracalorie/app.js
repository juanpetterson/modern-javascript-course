// Storage Controller
const StorageController = (function() {
  return {
    storeItem: function(item) {
      let items = [];
      // check if any items in LocalStorage
      if (localStorage.getItem('items') === null) {
        // Push new item
        items.push(item);
        // Set LocalStorage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in LocalStorage
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set LocalStorage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items = [];
      if (localStorage.getItem('items') !== null) {
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemStorage: function(deletedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (deletedItem.id === item.id) {
          items.splice(index, 1);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsStorage: function() {
      localStorage.removeItem('items');
    }
  };
})();

// Item Controller
const ItemController = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const state = {
    // items: [
    //   // { id: 0, name: 'Steak Dinner', calories: 1200 },
    //   // { id: 1, name: 'Cookie', calories: 400 },
    //   // { id: 2, name: 'Eggs', calories: 300 }
    // ],
    items: StorageController.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function() {
      return state.items;
    },
    addItem: function(name, calories) {
      let id;
      // Create ID
      if (state.items.length > 0) {
        id = state.items[state.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      const newItem = new Item(id, name, calories);

      state.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      // Loop through items
      state.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    getCurrentItem: function() {
      return state.currentItem;
    },
    setCurrentItem: function(item) {
      state.currentItem = item;
    },
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      state.items.forEach(item => {
        if (item.id === state.currentItem.id) {
          item.name = name;
          item.calories = calories;

          found = item;
        }
      });

      return found;
    },
    deleteItem: function(id) {
      // Get ids
      ids = state.items.map(item => item.id);

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      state.items.splice(index, 1);
    },
    clearAllItems: function() {
      state.items = [];
    },
    getTotalCalories: function() {
      let total = 0;
      state.items.forEach(item => (total += item.calories));

      state.totalCalories = total;

      return state.totalCalories;
    },
    logData: function() {
      return state;
    }
  };
})();

// UI Controller
const UIController = (function() {
  const UISelectors = {
    itemList: 'item-list',
    addButton: 'add-btn',
    updateButton: 'update-btn',
    deleteButton: 'delete-btn',
    backButton: 'back-btn',
    clearButton: 'clear-btn',
    itemNameInput: 'item-name',
    itemCaloriesInput: 'item-calories',
    totalCalories: 'total-calories'
  };

  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}:</strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>
        `;
      });

      // Insert lis items
      const list = document.getElementById(UISelectors.itemList);
      list.innerHTML = html;
    },

    getItemInput: function() {
      return {
        name: document.getElementById(UISelectors.itemNameInput).value,
        calories: document.getElementById(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      document.getElementById(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `
        <strong>${item.name}:</strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;

      const list = document.getElementById(UISelectors.itemList);
      list.insertAdjacentElement('beforeend', li);
      // list.appendChild(li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll('li');

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemId = listItem.getAttribute('id');

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
            <strong>${item.name}:</strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          `;
        }
      });

      this.clearEditState();
    },
    deleteListItem: function(id) {
      const itemId = `item-${id}`;
      const item = document.getElementById(itemId);
      item.remove();
    },
    clearInput: function() {
      document.getElementById(UISelectors.itemNameInput).value = '';
      document.getElementById(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      const currentItem = ItemController.getCurrentItem();

      const nameInput = document.getElementById(UISelectors.itemNameInput);
      nameInput.value = currentItem.name;

      const caloriesInput = document.getElementById(
        UISelectors.itemCaloriesInput
      );

      caloriesInput.value = currentItem.calories;

      UIController.showEditState();
    },
    removeItems: function() {
      let listItems = document.querySelectorAll('li');

      listItemsArr = Array.from(listItems);
      listItemsArr.forEach(item => {
        item.remove();
      });
    },
    hideList: function() {
      document.getElementById(UISelectors.itemList).style.display = 'none';
    },
    updateTotalCalories: function(totalCalories) {
      document.getElementById(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      this.clearInput();
      document.getElementById(UISelectors.addButton).style.display = 'inline';
      document.getElementById(UISelectors.updateButton).style.display = 'none';
      document.getElementById(UISelectors.deleteButton).style.display = 'none';
      document.getElementById(UISelectors.backButton).style.display = 'none';
      console.log('asd123123213sa');
    },
    showEditState: function() {
      document.getElementById(UISelectors.addButton).style.display = 'none';
      document.getElementById(UISelectors.updateButton).style.display =
        'inline';
      document.getElementById(UISelectors.deleteButton).style.display =
        'inline';
      document.getElementById(UISelectors.backButton).style.display = 'inline';
      console.log('asdsa');
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// App Controller
const AppController = (function(
  ItemController,
  UIController,
  StorageController
) {
  // Load event lsiteners
  const laodEventListeners = function() {
    const UISelectors = UIController.getSelectors();

    // Add item event
    const addButton = document.getElementById(UISelectors.addButton);
    addButton.addEventListener('click', itemAddHandler);

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();

        return false;
      }
    });

    // Edit icon click event
    document
      .getElementById(UISelectors.itemList)
      .addEventListener('click', itemEditHandler);

    // Update item event
    document
      .getElementById(UISelectors.updateButton)
      .addEventListener('click', itemUpdateHandler);

    // Delete event event
    document
      .getElementById(UISelectors.deleteButton)
      .addEventListener('click', itemDeleteHandler);

    // Back buttom event
    document
      .getElementById(UISelectors.backButton)
      .addEventListener(
        'click',
        UIController.clearEditState.bind(UIController)
      );

    // Clear items event
    document
      .getElementById(UISelectors.clearButton)
      .addEventListener('click', clearAllItemsHandler);
  };

  const itemAddHandler = function(e) {
    e.preventDefault();

    // Get form input from UI Controller
    const input = UIController.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);

      // Add item to UI list
      UIController.addListItem(newItem);

      updateCalories();

      // Store in LocalStorage
      StorageController.storeItem(newItem);

      // Clear inputs
      UIController.clearInput();
    }
  };

  // Edit item handler
  const itemEditHandler = function(e) {
    e.preventDefault();

    if (e.target.classList.contains('edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemController.getItemById(id);

      // Set current item
      ItemController.setCurrentItem(itemToEdit);

      // Add item to form
      UIController.addItemToForm();
    }
  };

  // Update item handler
  const itemUpdateHandler = function(e) {
    e.preventDefault();

    // Get item input
    const input = UIController.getItemInput();

    // Update item
    const updateItem = ItemController.updateItem(input.name, input.calories);

    // Update UI
    UIController.updateListItem(updateItem);

    // Update LocalStorage
    StorageController.updateItemStorage(updateItem);

    updateCalories();
  };

  // Delete button event
  const itemDeleteHandler = function(e) {
    e.preventDefault();

    // Get current item
    const currentItem = ItemController.getCurrentItem();

    // Delete from data structure
    ItemController.deleteItem(currentItem.id);

    // Delete from UI
    UIController.deleteListItem(currentItem.id);

    // Delete from LocalStorage
    StorageController.deleteItemStorage(currentItem);

    updateCalories();

    UIController.clearEditState();
  };

  // Clear all items event
  const clearAllItemsHandler = function() {
    // Delete all items from data structure
    ItemController.clearAllItems();

    // Remove from UI
    UIController.removeItems();

    StorageController.clearItemsStorage();

    updateCalories();
  };

  const updateCalories = function() {
    // Get total calories
    const totalCalories = ItemController.getTotalCalories();

    // Add total calories to UI
    UIController.updateTotalCalories(totalCalories);
  };

  return {
    init: function() {
      // Clear edit state / set initial state
      UIController.clearEditState();

      const items = ItemController.getItems();

      // Check if any items
      if (items.length === 0) {
        UIController.hideList();
      } else {
        UIController.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      // Add total calories to UI
      UIController.updateTotalCalories(totalCalories);

      // Load event listeners
      laodEventListeners();
    }
  };
})(ItemController, UIController, StorageController);

// Initialize App
AppController.init();
