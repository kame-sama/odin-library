const myLibrary = [
  {
    title: 'To kill a mockingbird',
    author: 'Harper Lee',
    pages: '323',
    read: true
  },
  {
    title: 'Hobbit',
    author: 'John R. R. Tolkien',
    pages: '318',
    read: false
  }
];

populateDisplay(myLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// function addBookToLibrary() {
//   const title = 'Hobbit';
//   const author = 'John R. R. Tolkien';
//   const pages = '318';
//   const read = true;

//   myLibrary.push(new Book(title, author, pages, read));
// }

function populateDisplay(library) {
  library.forEach(populateBookCard);
}

function populateBookCard(book) {
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