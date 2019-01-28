         Feature: Languages

Scenario Outline: User is able to change the language
           Given User sees <country-flag> on the pah-fm website
            When User clicks on <country-flag>
            Then The language on the page changes to <chosen-language>

        Examples:
|    country-flag | chosen-language |
|         Ukraine |       Ukrainian |
|  United Kingdom |         English |
|          Poland |          Polish |

Scenario Outline: Language is retained after User login
           Given User is on the login page
             And User chooses <chosen-language> by clicking on a flag
            When User log in <status>
            Then  <outcome-language> is the same as <chosen-language>

         Examples:
 | chosen-language | outcome-language |         status |
 |       Ukrainian |        Ukrainian |   successfully |
 |         English |          English |   successfully |
 |          Polish |           Polish |   successfully |
 |       Ukrainian |        Ukrainian | unsuccessfully |
 |         English |          English | unsuccessfully |
 |          Polish |           Polish | unsuccessfully |

 Scenario Outline: Language is retained after refreshing pah-fm page
            Given User is on the pah-fm website
              And User chooses <chosen-language> by clicking on a flag
             When User refreshes the pah-fm website
             Then <outcome-language> is the same as <chosen-language>

         Examples:
 | chosen-language | outcome-language |
 |       Ukrainian |        Ukrainian |
 |         English |          English |
 |          Polish |           Polish |
