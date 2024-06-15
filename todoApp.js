function createTitle(name) {
  const title = document.createElement('h2');
  title.classList.add();
  title.textContent = name
  return title
}

function createForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  input.placeholder = 'Enter your task';
  button.textContent = 'Add';

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');

  buttonWrapper.append(button)
  form.append(input, buttonWrapper)

  return {form, input, button}
}

function createList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createListItem(task) {
  const item = document.createElement('li');
  const buttonWrapper = document.createElement('div');
  const buttonDone = document.createElement('button');
  const buttonDelete = document.createElement('button');

  item.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  )
  buttonDone.classList.add('btn', 'btn-success');
  buttonDelete.classList.add('btn', 'btn-danger');
  buttonWrapper.classList.add('btn-group', 'btn-group-sm');

  buttonDelete.textContent = 'Delete';
  buttonDone.textContent = 'Done';
  item.textContent = task;

  buttonDelete.addEventListener('click', event => {
    if (confirm('Are you sure?')) {
      item.remove();
      localStorage.setItem('myTodoList', JSON.stringify(generateArray()))
    }
  })

  buttonDone.addEventListener('click', event => {
    item.classList.toggle('list-group-item-success');
    localStorage.setItem('myTodoList', JSON.stringify(generateArray()));
  });
  buttonWrapper.append(buttonDone, buttonDelete);
  item.append(buttonWrapper);

  return {item, buttonDone, buttonDelete}
}

function generateArray() {
  const list = [];
  const listItems = document.querySelectorAll('li');
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].classList.contains('list-group-item-success')) {
      list.push({text: listItems[i].childNodes[0].textContent, done: true})
    } else {
      list.push({text: listItems[i].childNodes[0].textContent, done: false})
    }
  }
  return list;
}

function todoApp() {
  const container = document.querySelector('.container');
  const title = createTitle('My Todo Application');
  const form = createForm();
  const list = createList();
  const localList = JSON.parse
  (localStorage.getItem('myTodoList')) ? JSON.parse(localStorage.getItem('myTodoList')) : [];


  for (let i = 0; i < localList.length; i++) {
    const item = createListItem(localList[i].text);
    if (localList[i].done){
      item.item.classList.add('list-group-item-success');
    }
    list.append(item.item);
  }

  form.form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.input.value.trim()) {
      const item = createListItem(form.input.value.trim());
      list.append(item.item);
      form.input.value = '';
      localStorage.setItem('myTodoList', JSON.stringify(generateArray()))
    } else alert('Enter some value')
  })

  container.append(title, form.form, list)
}

todoApp()



