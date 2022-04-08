import Book from './modules/book.js';
import displayDate from './modules/displayDate.js';

class BookCollection {
  constructor(collectionArray) {
    this.collectionArray = collectionArray;
  }

  initCollectionArray = () => {
    if (JSON.parse(localStorage.getItem('bookData'))) {
      this.collectionArray = JSON.parse(localStorage.getItem('bookData'));
    } else {
      this.collectionArray = [];
    }
  }

    render = () => {
      this.initCollectionArray();

      const listItemNav = document.querySelector('.menu-item1');
      const addItemNav = document.querySelector('.menu-item2');
      const contactItemNav = document.querySelector('.menu-item3');

      const mainContainer = document.querySelector('.main-section');

      const listContent = `   
        <section class="list">
          <h1>All awesome books</h1>
          <div class="container"
  
          </div>
        </section>`;
      mainContainer.innerHTML = '<p class="date"></p>';
      mainContainer.innerHTML += listContent;

      this.collectionArray.forEach((book) => {
        const container = document.querySelector('.container');
        const content = `<div class="book">
          <div class="left">
            <p>${book.title}</p>
            <p>by</p>
            <p>${book.author}</p>
          </div>
            <button class="remove">Remove</button>
        </div>`;
        container.innerHTML += content;
        container.addEventListener('load', this.removeBook());
      });

      listItemNav.addEventListener('click', () => {
        this.initCollectionArray();

        mainContainer.innerHTML = '<p class="date"></p>';
        mainContainer.innerHTML += listContent;
        displayDate();

        this.collectionArray.forEach((book) => {
          const container = document.querySelector('.container');
          const content = `<div class="book">
            <div class="left">
              <p>${book.title}</p>
              <p>by</p>
              <p>${book.author}</p>
            </div>
              <button class="remove">Remove</button>
          </div>`;
          container.innerHTML += content;
        });
        this.removeBook();
      });

      addItemNav.addEventListener('click', () => {
        mainContainer.innerHTML = '<p class="date"></p>';
        displayDate();
        const addContent = `
        <section class="add">
        <h2>Add a new book</h2>
        <form class="book-form" method="post" action="/">
          <input
            name="title"
            id="title"
            type="text"
            maxlength="30"
            placeholder="Title"
            required
          />
          <label for="title" hidden></label>
          <input
            name="author"
            id="author"
            type="text"
            maxlength="30"
            placeholder="Author"
            required
          />
          <label for="author" hidden></label>
          <div><button type="submit">Add</button></div>
        </form>
      </section>`;

        mainContainer.innerHTML += addContent;
        this.addBook();
      });

      contactItemNav.addEventListener('click', () => {
        mainContainer.innerHTML = '<p class="date"></p>';
        displayDate();
        const contactContent = `
        <section class="contact">
        <h2>Contact information</h2>
        <div class="contact-lower">
          <p>
            Do you have any question or you just want to say "Hello"? <br />
            You can reach out to us!
          </p>
          <ul>
            <li>Our email: mail@mail.com</li>
            <li>Our phone number: 004422335566889</li>
            <li>Our Address: Streetname 22, 84503 City, Country</li>
          </ul>
        </div>
      </section>`;

        mainContainer.innerHTML += contactContent;
      });
      displayDate();
    }

    // Add books

    addBook = () => {
      const form = document.querySelector('.book-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const { title, author } = form.elements;
        const formData = new Book(title.value, author.value);
        this.collectionArray.push(formData);
        localStorage.setItem('bookData', JSON.stringify(this.collectionArray));
        title.value = '';
        author.value = '';
      });
    }

    // Remove books

    removeBook = () => {
      const buttonsRemove = document.querySelectorAll('.remove');
      const book = document.querySelectorAll('.book');

      buttonsRemove.forEach((button, i) => {
        button.addEventListener('click', () => {
          book[i].remove();
          this.collectionArray.splice(i, 1);
          localStorage.setItem('bookData', JSON.stringify(this.collectionArray));
        });
      });
    }
}

const arrayCollection = new BookCollection(
  JSON.parse(localStorage.getItem('bookData')),
);
arrayCollection.render();
