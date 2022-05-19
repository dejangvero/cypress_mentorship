///<reference types="Cypress" />
import CulturePage from '../../integration/pages/culture-page'

describe('Culture Test Suite', ()=>
{
    beforeEach(function(){
        cy.visit(Cypress.env('url')+"culture")
        cy.fixture('example').then(function (data) {
            this.data = data
        
        })                 
    })
    const culturePage = new CulturePage();  
    it('Testing', function(){        
        // const getName = () => {
        //     return 'Jane Lane'
        //   }
        const getName = 'Jane Lane'
          
          
        cy.wrap(getName).should('eq', 'Jane Lane')        
    })
    it('Hamburger-Navigation-Button-Yellow', function(){        
        culturePage.getNavigationButton().click()
        culturePage.getHamburgerCultureButton().should('have.css', 'color', 'rgb(254, 240, 53)')        
    })
    it('Close-Hamburger-Navigation', function(){        
        culturePage.getNavigationButton().click()
        culturePage.getHamburgerCloseButton().click()
        culturePage.getAllHamburgerNavigationButtons().should('not.be.visible')   
    })    
    it('Navigation-Button-Yellow', function(){                
        culturePage.getCultureButton().should('have.css', 'color', 'rgb(254, 240, 53)')        
    })
    it('9-Gallery-Items-Loaded', function(){                
        culturePage.getAllGalleryItems().should('have.length', 9)        
    })
    it('API-Social-Media-Feed-Call', function(){         
        cy.intercept('GET', 'feed').as('SocialMediaRequest')
        cy.reload()
        cy.wait('@SocialMediaRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            // expect(interception.response.url).to.eq(Cypress.env('url')+'api/feed')
            expect(interception.response.body).to.be.not.null     
        })
    })
    it('API-Feed-Call-Dates', function(){       
        culturePage.getListOfSocialMediaDatesViaAPI().then((response)=>{           
            culturePage.verifySocialMediaDateAPIOlderThen(response, 'YYYY-MM-DD', '5')
        })            
    })   
    it('To-Top-Button-Relocate', function(){
        culturePage.getReturnToTopButton().click()
        cy.wait(3000)
        cy.window().then(($window) => {
            expect($window.scrollY).to.be.equal(0)
          });
    })
    it('Back-Redirect-To-Career-Page', function(){
        culturePage.getBackButton().click()
        cy.url().should('eq', Cypress.env('url')+"career")
    })
    it('Next-Redirect-To-Contact-Page', function(){
        culturePage.getNextButton().click()
        cy.url().should('eq', Cypress.env('url')+"contact")
    })
    it('Privacy-Policy-Redirect', function(){
        culturePage.getPrivacyButton().invoke("removeAttr","target").click()
        cy.url().should('eq', Cypress.env('url')+"privacy")
    })
    it('Novalite-Culture-Header', function(){        
        culturePage.getSubjectText().contains(this.data.NovaliteCulture, { matchCase: false })        
    })
    it('Novalite-Culture-SubHeader', function(){        
        culturePage.getSubjectSubText().contains(this.data.TheWayWeAre, { matchCase: false })        
    })
    it('SocialMedia-Updates-Header', function(){        
        culturePage.getSocialMediaUpdatesHeaderText().contains(this.data.SocialMediaUpdates, { matchCase: false })        
    })
    it('Gallery-Header', function(){        
        culturePage.getGalleryHeaderText().contains(this.data.Gallery, { matchCase: false })        
    })
    it('Gallery-Paragraph', function(){        
        culturePage.getGalleryParagraphText().contains(this.data.GalleryAbout, { matchCase: false })        
    })
    
})