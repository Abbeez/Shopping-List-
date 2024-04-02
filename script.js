const shoppingform = document.getElementById('item-form');
const shoppingItem = document.getElementById('item-input');
const shoppingItemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

// Event Handler

function addItem(e) {
  e.preventDefault();

  // Validate Input
  const newItem = shoppingItem.value;
  if (shoppingItem.value === '') {
    alert('Please add an item');
    return;
  }

  //   Create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);
  console.log(li);

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

function removeItem(e) {
  // console.log(e.target.parentElement.classList.contains('remove-item'));
  console.log(e.target.parentElement);
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

function clearItem(e) {
  while (shoppingItemList.firstChild) {
    console.log('remove mo');
    shoppingItemList.removeChild(shoppingItemList.firstChild);
  }
}

shoppingform.addEventListener('submit', addItem);
shoppingItemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItem);
