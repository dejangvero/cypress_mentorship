Feature: Culture
  
    Scenario: Hamburger has the correct color
        Given   User opens culture page
        When    User clicks the Hamburger navigation button
        Then    Culture hamburger menu button is yellow 

    
    Scenario: Verify FEED API call
        Given   User opens culture page        
        Then    API feed call should have correct response

    
    Scenario: All FEED dates are not older then 3 months
        Given   User opens culture page             
        Then    The loaded feeds are not older then 3 months

    
    Scenario: Hamburger close button works
        Given   User opens culture page
        And     User clicks the Hamburger navigation button
        And     Clicks the hamburger close button
        Then    The hamburger menu will be closed

    
    Scenario: Navigation culture button is yellow
        Given   User opens culture page       
        Then    Navigation culture button is yellow

    
    Scenario: 9 Gallery items are loaded
        Given   User opens culture page       
        Then    9 Gallery items are loaded

    
    Scenario: "To top" of the page button works
        Given   User opens culture page
        And     User clicks the TO TOP button        
        Then    User is redirected to the top of the page

    
    Scenario: Pressing on the back button leads to career page
        Given   User opens culture page
        When    User clicks the back button on the culture page      
        Then    User is redirected to the career page

    
    Scenario: Pressing on the next button leads to contact page
        Given   User opens culture page
        When    User clicks the next button on the culture page      
        Then    User is redirected to the contact page

    
    Scenario: Pressing on the privacy policy button leads to career page
        Given   User opens culture page
        When    User clicks the privacy policy button on the culture page      
        Then    User is redirected to the privacy policy page

    
    Scenario: Verifing the culture header label
        Given   User opens culture page             
        Then    The culture header label is correct

    
    Scenario: Verifing the culture sub header label
        Given   User opens culture page             
        Then    The culture sub header label is correct

    
    Scenario: Verifing the social media updates header label
        Given   User opens culture page             
        Then    The social medial updates header label is correct

    
    Scenario: Verifing the gallery label
        Given   User opens culture page             
        Then    The gallery label is correct

    
    Scenario: Verifing the gallery paragraph
        Given   User opens culture page             
        Then    The gallery paragraph label is correct