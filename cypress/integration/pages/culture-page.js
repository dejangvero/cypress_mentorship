import dayjs from "dayjs"
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

export default class CulturePage{

    getNavigationButton(){
        return cy.get("label.navigation__button")
    }
    getHamburgerCultureButton(){
        return cy.get("ul>li.delay-210:nth-child(4)>a")
    }
    getHamburgerCloseButton(){
        return cy.get("label")
    }
    getAllHamburgerNavigationButtons(){
        return cy.get("nav>ul>li")
    }
    getCultureButton(){
        return cy.get("ul>li.top-user__item:nth-child(3)>a")
    }
    getSubjectText(){
        return cy.get("h2.header__title")
    }
    getSubjectSubText(){
        return cy.get("p.header__text")
    }
    getSocialMediaUpdatesHeaderText(){
        return cy.get("h2.heading__left")
    }
    getGalleryHeaderText(){
        return cy.get("h2.heading__right")
    }
    getGalleryParagraphText(){
        return cy.get("p.paragraph")
    }
    getAllGalleryItems(){
        return cy.get("div.item")
    }    
    getFirstSocialMediaDate(){
        return cy.get("app-fb-post:nth-child(1)>article>div:nth-child(1)>span")
    }
    getAllSocialMediaDate(){
        return cy.get("app-fb-post>article>div:nth-child(1)>span")
    }    
    getListOfSocialMediaDatesViaAPI(){         
        cy.intercept('GET', 'feed').as('SocialMediaRequest')        
        cy.reload()              
        return cy.wait('@SocialMediaRequest').then((interception) => {
                    const arrayJSON = JSON.parse(interception.response.body)                   
                    var listOfDates = []           
                    for (let index = 0; index < arrayJSON.length; index++) {                
                        var element = arrayJSON[index]                                              
                        var data = JSON.stringify(element['created_time']).slice(1, 11)
                        listOfDates.push(data)                                          
                    }
                    return listOfDates                                                                        
                })                
    }
    verifySocialMediaDateAPIOlderThen(listOfDates, dateFormat, numberOfMonths){
        const todaysDate =  dayjs()       
        const numberOfMonthsBefore = dayjs().subtract(numberOfMonths,'months')                 
        for (let index = 0; index < listOfDates.length; index++) { 
            var value = dayjs(listOfDates[index], dateFormat)            
            expect(value.isBetween(numberOfMonthsBefore, todaysDate ),`${value.format('DD.MM.YYYY')}
            should be between ${numberOfMonthsBefore.format('DD.MM.YYYY')} and ${todaysDate.format('DD.MM.YYYY')} `).to.be.true
        }              
    }       
    getReturnToTopButton(){
        return cy.get("footer>div>section:nth-child(2)")
    }
    getNextButton(){
        return cy.get("section:nth-child(3)>div>div>p")
    } 
    getBackButton(){
        return cy.get("section:nth-child(1)>div>div>p")
    }
    getPrivacyButton(){
        return cy.get("footer>div>a")
    }
}