import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";


beforeEach(function(){    
    cy.fixture('example').then((data) =>
    {
        this.data= data
    })               
})

Given('User opens culture page', () =>
{
  cy.visit(Cypress.env('url')+"culture");
})

When('User clicks the Hamburger navigation button', () => {
    cy.get("label.navigation__button").click();
})

Then('Culture hamburger menu button is yellow', () => {
    cy.get("ul>li.top-user__item:nth-child(3)>a").should('have.css', 'color', 'rgb(254, 240, 53)')
})

Then('API feed call should have correct response', () => {
    cy.socialMediaFeedRequest().then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body).to.be.not.null             
        })   
})

Then('The loaded feeds are not older then 3 months', () => {
    cy.getListOfSocialMediaDatesViaAPI().then((response)=>{           
       cy.verifySocialMediaDateAPIOlderThen(response, 'YYYY-MM-DD', '3')
    })    
})

And('Clicks the hamburger close button', () => {
    cy.get("label").click();   
})

Then('The hamburger menu will be closed', () => {
    cy.get("nav>ul>li").should('not.be.visible');
})

Then('Navigation culture button is yellow', () => {
    cy.get("ul>li.top-user__item:nth-child(3)>a").should('have.css', 'color', 'rgb(254, 240, 53)');
})

Then('9 Gallery items are loaded', () => {
    cy.get("div.item").should('have.length', 9);
})

And('User clicks the TO TOP button', () => {
    cy.get("footer>div>section:nth-child(2)").click();
    cy.wait(3000) 
})

Then('User is redirected to the top of the page', () => {
    cy.window().then(($window) => {
        expect($window.scrollY).to.be.equal(0)
      });
})

When('User clicks the back button on the culture page', () => {
    cy.get("section:nth-child(1)>div>div>p").click();
})

Then('User is redirected to the career page', () => {
    cy.url().should('eq', Cypress.env('url')+"career");
})

When('User clicks the next button on the culture page', () => {
    cy.get("section:nth-child(3)>div>div>p").click();
})

Then('User is redirected to the contact page', () => {
    cy.url().should('eq', Cypress.env('url')+"contact");
})

When('User clicks the privacy policy button on the culture page', () => {
    cy.get("footer>div>a").invoke("removeAttr","target").click();
})

Then('User is redirected to the privacy policy page', () => {
    cy.url().should('eq', Cypress.env('url')+"privacy");
})

Then('The culture header label is correct', function(){       
    cy.get("h2.header__title").contains(this.data.NovaliteCulture, { matchCase: false });
})

Then('The culture sub header label is correct', function(){      
    cy.get("p.header__text").contains(this.data.TheWayWeAre, { matchCase: false });
})

Then('The social medial updates header label is correct', function(){     
    cy.get("h2.heading__left").contains(this.data.SocialMediaUpdates, { matchCase: false });
})

Then('The gallery label is correct', function(){        
    cy.get("h2.heading__right").contains(this.data.Gallery, { matchCase: false });
})

Then('The gallery paragraph label is correct', function(){      
    cy.get("p.paragraph").contains(this.data.GalleryAbout, { matchCase: false });
})




