         Feature: Languages

Scenario Outline: User is able to change the language
           Given User sees <country-flag> on the pah-fm website
            When User clicks on <country-flag>
            Then The language on the page changes to <chosen-language>

            Examples:
    | country-flag | chosen-language |
    |      Ukraine |       Ukrainian |
    United Kingdom |         English |
            Poland |          Polish |

Scenario Outline: Language is retained after User login
           Given User is on the login page
             And User chooses <chosen-language> by clicking on a flag
            When User log in successfully
            Then  <outcome-language> should be the same

            Examples:
    | chosen-language | outcome-language |
    |       Ukrainian |        Ukrainian |
    |         English |          English |
               Polish |           Polish |
