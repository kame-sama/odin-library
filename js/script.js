const library = [
  {
    title: 'To kill a mockingbird',
    author: 'Harper Lee',
    pages: '323',
    read: 'read'
  },
  {
    title: 'Hobbit',
    author: 'John R. R. Tolkien',
    pages: '318',
    read: 'not read'
  },
  {
    title: 'The Stranger',
    author: 'Alber Camus',
    pages: '85',
    read: 'read'
  },
  {
    title: 'The Plague',
    author: 'Alber Camus',
    pages: '200',
    read: 'not read'
  },
  {
    title: 'The Fall',
    author: 'Alber Camus',
    pages: '98',
    read: 'not read'
  },
  {
    title: 'The Lord of the Rings',
    author: 'John R. R. Tolkien',
    pages: '860',
    read: 'read'
  }
];

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#status');

const newBookButton = document.querySelector('.new-book button');
const newBookDialog = document.querySelector('dialog');
const submitButton = document.querySelector('#submit');
const closeDialogButton = document.querySelector('dialog > button');

const search = document.querySelector('#search');

populateDisplay(library);

search.addEventListener('input', performSearch);

newBookButton.addEventListener('click', () => {
  newBookDialog.show();
});

submitButton.addEventListener('click', processUserData);

closeDialogButton.addEventListener('click', closeNewBookDialog);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function processUserData(event) {
  event.preventDefault();
  if (title.value && author.value && pages.value && read.value) {
    addBookToLibrary();
    populateDisplay(library);
    closeNewBookDialog();
    search.value = '';
  }
}

function closeNewBookDialog() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.value = '';
  newBookDialog.close();
}

function addBookToLibrary() {
  library.push(new Book(title.value, author.value, pages.value, read.value));
}

function populateDisplay(library) {
  const container = document.querySelector('.container');
  const cards = library.map(populateCard);
  container.replaceChildren(...cards);
}

function populateCard(book, index) {
  const card = document.createElement('div');
  card.classList.toggle('card');
  card.setAttribute('data-index', `${index}`);

  const titleHeading = document.createElement('h3');
  titleHeading.textContent = 'Title';
  const titleContent = document.createElement('p');
  titleContent.textContent = book.title;

  const authorHeading = document.createElement('h3');
  authorHeading.textContent = 'Author';
  const authorContent = document.createElement('p');
  authorContent.textContent = book.author;

  const pagesHeading = document.createElement('h3');
  pagesHeading.textContent = 'Pages';
  const pagesContent = document.createElement('p');
  pagesContent.textContent = book.pages;

  const readHeading = document.createElement('h3');
  readHeading.textContent = 'Status';
  const readContent = document.createElement('p');
  readContent.textContent = book.read;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'Delete';

  const statusButton = document.createElement('button');
  const statusIcon = document.createElement('span');
  statusIcon.classList.add('material-symbols-outlined', 'size40');
  statusIcon.textContent = book.read == 'read' 
    ? 'toggle_on'
    : 'toggle_off';
  statusButton.appendChild(statusIcon);


  card.appendChild(titleHeading);
  card.appendChild(titleContent);
  card.appendChild(authorHeading);
  card.appendChild(authorContent);
  card.appendChild(pagesHeading);
  card.appendChild(pagesContent);
  card.appendChild(readHeading);
  card.appendChild(readContent);

  card.appendChild(statusButton);
  card.appendChild(deleteButton);

  deleteButton.addEventListener('click', deleteBookFromLibrary);
  statusButton.addEventListener('click', changeReadStatus);

  return card;
}

function changeReadStatus(event) {
  const card = event.target.localName == 'span' 
  ? event.target.parentNode.parentNode
  : event.target.parentNode;
  const index = card.getAttribute('data-index');
  const status = card.querySelector('p:last-of-type');

  if (status.textContent == 'read') {
    status.textContent = 'not read';
    event.target.textContent = 'toggle_off';
  } else {
    status.textContent = 'read';
    event.target.textContent = 'toggle_on';
  }

  library[index].read = status.textContent;
}

function deleteBookFromLibrary(event) {
  const card = event.target.parentNode;
  const index = card.getAttribute('data-index');

  library.splice(index, 1);
  card.remove();
  fixIndexOrder();
}

function fixIndexOrder() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {
    card.setAttribute('data-index', index);
  });
}

function performSearch() {
  const filteredLibrary = library.filter(book => {
    return book.author.toLowerCase().includes(search.value.toLowerCase())
    ||book.title.toLowerCase().includes(search.value.toLowerCase());
  });
  populateDisplay(filteredLibrary);
}