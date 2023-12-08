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
  }
];

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#status');

const newBookButton = document.querySelector('.header button');
const newBookDialog = document.querySelector('dialog');
const submitButton = document.querySelector('#submit');
const closeDialogButton = document.querySelector('dialog > button');

populateDisplay();

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
    populateDisplay();
    closeNewBookDialog();
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

function populateDisplay() {
  const cards = document.querySelectorAll('.card');

  for (let i = cards.length; i < library.length; i++) {
    populateCard(library[i], i);
  }
}

function populateCard(book, index) {
  const container = document.querySelector('.container');

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
  deleteButton.textContent = 'Delete';

  const statusButton = document.createElement('button');
  statusButton.textContent = 'Change status';


  card.appendChild(titleHeading);
  card.appendChild(titleContent);
  card.appendChild(authorHeading);
  card.appendChild(authorContent);
  card.appendChild(pagesHeading);
  card.appendChild(pagesContent);
  card.appendChild(readHeading);
  card.appendChild(readContent);

  card.appendChild(deleteButton);
  card.appendChild(statusButton);

  container.appendChild(card);

  deleteButton.addEventListener('click', deleteBookFromLibrary);

  statusButton.addEventListener('click', changeReadStatus);
}

function changeReadStatus(event) {
  const card = event.target.parentNode;
  const index = card.getAttribute('data-index');
  const status = card.querySelector('p:last-of-type');

  if (status.textContent == 'read') {
    status.textContent = 'not read';
  } else {
    status.textContent = 'read';
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