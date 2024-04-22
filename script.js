const shoppingform = document.getElementById('item-form');
const shoppingItem = document.getElementById('item-input');
const shoppingItemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
// const emptyResult = document.getElementById('empty-result');
const formBtn = shoppingform.querySelector('button');

let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUi();
}

// Event Handler

function onAddItemSubmit(e) {
  e.preventDefault();

  // Validate Input
  const newItem = shoppingItem.value;
  if (shoppingItem.value === '') {
    alert('Please add an item');
    return;
  }

  // Check for edit mode

  if (isEditMode) {
    const itemToEdit = shoppingItemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  }

  // Create Item DOM Element
  addItemToDom(newItem);

  // Add item to local Storage

  addItemToStorage(newItem);

  checkUi();

  shoppingItem.value = '';
}

function addItemToDom(item) {
  //   Create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);

  // Add LI to DOM
  shoppingItemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  const icon = createIcon('fa-solid fa-xmark');
  button.className = classes;
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  // Convert to JSON String

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  shoppingItemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  shoppingItem.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from the DOM
    item.remove();

    // Remove item from the local storage
    removeItemFromStorage(item.textContent);

    checkUi();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set local storage

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  checkUi();
}

function clearItem(e) {
  while (shoppingItemList.firstChild) {
    shoppingItemList.removeChild(shoppingItemList.firstChild);
  }

  checkUi();
}

function checkUi() {
  shoppingItem.value = '';
  const items = shoppingItemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

function filterItems(e) {
  const items = shoppingItemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Initialize App

function init() {
  shoppingform.addEventListener('submit', onAddItemSubmit);
  shoppingItemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItem);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUi();
}

init();
