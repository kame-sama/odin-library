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

populateDisplay(library);

const addBtn = document.querySelector('.header button');
const dialog = document.querySelector("dialog");
const submitBtn = document.querySelector("#submit")

addBtn.addEventListener('click', () => {
  dialog.show();
});

submitBtn.addEventListener('click', getUserData);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function getUserData(event) {
  event.preventDefault();
  addBookToLibrary();
  populateDisplay(library);
  clearInputs();
  dialog.close();
}

function clearInputs() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.value = '';
}

function addBookToLibrary() {
  library.push(new Book(title.value, author.value, pages.value, read.value));
}

function populateDisplay(library) {
  const cards = document.querySelectorAll('.card');

  for (let i = cards.length; i < library.length; i++) {
    populateCard(library[i]);
  }
}

function populateCard(book) {
  const container = document.querySelector('.container');

  const card = document.createElement('div');
  card.classList.toggle('card');

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

  card.appendChild(titleHeading);
  card.appendChild(titleContent);
  card.appendChild(authorHeading);
  card.appendChild(authorContent);
  card.appendChild(pagesHeading);
  card.appendChild(pagesContent);
  card.appendChild(readHeading);
  card.appendChild(readContent);

  container.appendChild(card);
}