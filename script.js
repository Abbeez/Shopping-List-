const shoppingform = document.getElementById('item-form');
const shoppingItem = document.getElementById('item-input');
const shoppingItemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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

  // Add LI to DOM
  shoppingItemList.appendChild(li);

  checkUi();
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
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUi();
    }
  }
}

function clearItem(e) {
  while (shoppingItemList.firstChild) {
    shoppingItemList.removeChild(shoppingItemList.firstChild);
  }

  checkUi();
}

function checkUi() {
  const items = shoppingItemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

function filterItems(e) {
  const items = shoppingItemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  console.log(text);

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

shoppingform.addEventListener('submit', addItem);
shoppingItemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItem);
itemFilter.addEventListener('input', filterItems);

checkUi();
