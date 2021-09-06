import axios from 'axios';

describe('Bookish application', () => {
  before(() => clearBooks())

  beforeEach(() => setBooks())
  
  afterEach(() => clearBooks())

  after(() => setBooks())
  
  const clearBooks = () => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch(err => err);
  }

  const setBooks = () => {
    const books = [
      {
        "name": "Refactoring", 
        "id": 1, 
        "description": "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
      },
      {
        "name": "Domain-driven design", 
        "id": 2, 
        "description": "Explains how to incorporate effective domain modeling into the software development process."
      },
      {
        "name": "Building Microservices", 
        "id": 3, 
        "description": "Author Sam Newman provides you with a firm grounding in the concepts while diving into current solutions for modeling, integrating, testing, deploying, and monitoring your own autonomous services."
      },
      {
        "name": "Acceptance Test Driven Development with React", 
        "id": 4,
        "description": "This book describes how to apply the Acceptance Test Driven Development when developing a Web Application named bookish with React / Redux and other tools in react ecosystem."
      }
    ];
  
    return books.map(item =>
      axios.post('http://localhost:8080/books', item,
        { headers: { 'Content-Type': 'application/json' } }
      )
    );
  }

  it('Visits the bookish', () => {
    gotoApp();
    checkAppTitle();
  });

  it('Shows a book list', () => {
    gotoApp();
    cy.get('div[data-test="book-list"]').should('exist');
    cy.get('div.book-item').should((books) => {
      expect(books).to.have.length(4);
      const titles = [...books].map(x => x.querySelector('h2').innerHTML);
      expect(titles).to.deep.equal(['Refactoring', 'Domain-driven design', 'Building Microservices', 'Acceptance Test Driven Development with React']);
    });
  });
  
  it('Goes to the detail page', () => {
    gotoApp();
    cy.get('div.book-item').contains('View Details').eq(0).click();
    cy.url().should('include', '/books/1');
    cy.get('h2.book-title').contains('Refactoring');
  });
  
  it('Searches for a title', () => {
    gotoApp();
    cy.get('div.book-item').should('have.length', 4);
    cy.get('[data-test="search"] input').type('design');
    cy.get('div.book-item').should('have.length', 1);
    cy.get('div.book-item').eq(0).contains('Domain-driven design');
  });

  const gotoApp = () => {
    cy.visit('http://localhost:3000/');
  }
  
  const checkAppTitle = () => {
    cy.get('h2[data-test="heading"]').contains('Bookish');
  }
});

