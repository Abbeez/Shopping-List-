const shoppingform = document.getElementById('item-form');
const shoppingItem = document.getElementById('item-input');
const shoppingItemList = document.getElementById('item-list');

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

shoppingform.addEventListener('submit', addItem);
