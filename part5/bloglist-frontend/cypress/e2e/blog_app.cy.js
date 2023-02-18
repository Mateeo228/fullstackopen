describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Martin Joe',
      username: 'MJS',
      password: '123456789'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Sherlock',
      username: 'Sherlock',
      password: '987654321'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('MJS')
      cy.get('#password').type('123456789')
      cy.get('#login-button').click()

      cy.contains('Martin Joe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('MJS')
      cy.get('#password').type('asasdasda')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('MJS')
      cy.get('#password').type('123456789')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('THIS IS A TEST')
      cy.get('#author').type('Tester boy')
      cy.get('#url').type('www.testing.com')
      cy.get('#createBlog').click()

      cy.contains('THIS IS A TEST Tester boy')
    })

    describe('When a blog is created', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('THIS IS A TEST')
        cy.get('#author').type('Tester boy')
        cy.get('#url').type('www.testing.com')
        cy.get('#createBlog').click()
      })

      it('A blog can be liked', function() {
        cy.get('#showButton').click()
        cy.contains('0')
        cy.get('#likeButton').click()
        cy.contains('1')
      })

      it('A blog can be deleted by its owner', function() {
        cy.get('#showButton').click()
        cy.get('#removeButton').click()

        cy.get('html').should('not.contain', 'THIS IS A TEST')
      })

      it('Another user can not delete the blog', function() {
        cy.contains('logout').click()
        cy.get('#username').type('Sherlock')
        cy.get('#password').type('987654321')
        cy.get('#login-button').click()

        cy.get('#showButton').click()

        cy.get('html').should('not.contain', '#remove')
      })

      it('Blogs are sort by number of likes', function() {
        cy.wait(1000)
        cy.createBlog({ title: 'The title with the most likes', author: 'MJS', url: 'www', likes: 77 })
        cy.createBlog({ title: 'The title with the second most likes', author: 'MJS', url: 'www', likes: 49 })
        cy.createBlog({ title: 'The title with the third most likes', author: 'MJS', url: 'www', likes: 33 })

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'The title with the third most likes')
        cy.get('.blog').eq(3).should('contain', 'THIS IS A TEST')
      })
    })

  })

})