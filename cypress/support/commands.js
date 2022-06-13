import dayjs from "dayjs"
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("socialMediaFeedRequest", () => { 
    cy.request('GET', `${Cypress.env('url')}api/feed`).as('SocialMediaRequest')            
})

Cypress.Commands.add("getListOfSocialMediaDatesViaAPI", () => {    
    cy.socialMediaFeedRequest().get('@SocialMediaRequest').then((response) => {                    
                    const arrayJSON = JSON.parse(response.body)                   
                    var listOfDates = []           
                    for (let index = 0; index < arrayJSON.length; index++) {                
                        var element = arrayJSON[index]                                              
                        var data = JSON.stringify(element['created_time']).slice(1, 11)
                        listOfDates.push(data)                                          
                    }
                    return listOfDates                                                                        
                }) 
})

Cypress.Commands.add("verifySocialMediaDateAPIOlderThen", (listOfDates, dateFormat, numberOfMonths ) => { 
    const todaysDate =  dayjs()       
        const numberOfMonthsBefore = dayjs().subtract(numberOfMonths,'months')                 
        for (let index = 0; index < listOfDates.length; index++) { 
            var value = dayjs(listOfDates[index], dateFormat)            
            expect(value.isBetween(numberOfMonthsBefore, todaysDate ),`${value.format('DD.MM.YYYY')}
            should be between ${numberOfMonthsBefore.format('DD.MM.YYYY')} and ${todaysDate.format('DD.MM.YYYY')} `).to.be.true
        };
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';
