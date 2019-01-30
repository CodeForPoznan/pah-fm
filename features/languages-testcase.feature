Feature: Languages

Scenario Outline: User is able to change the language
           Given User sees <country-flag> flag on the pah-fm website
            When User clicks on <country-flag> flag
            Then The language on the page changes to <chosen-language>

Examples:
  | country-flag   | chosen-language |
  | Ukraine        | Ukrainian       |
  | United Kingdom | English         |
  | Poland         | Polish          |

Scenario Outline: Language is retained after attempt to login
            Given User is on the pah-fm website
              And <chosen-language> language has been chosen
             When User log in <status>
             Then The language is still <outcome-language>

Examples:
  | chosen-language | outcome-language | status         |
  | Ukrainian       | Ukrainian        | successfully   |
  | English         | English          | successfully   |
  | Polish          | Polish           | successfully   |
  | Ukrainian       | Ukrainian        | unsuccessfully |
  | English         | English          | unsuccessfully |
  | Polish          | Polish           | unsuccessfully |


 Scenario Outline: Language is retained after refreshing pah-fm page
            Given User is on the pah-fm website
              And <chosen-language> language has been chosen
             When User refreshes the pah-fm website
             Then The language is still <outcome-language>

Examples:
  | country-flag   | chosen-language |
  | Ukraine        | Ukrainian       |
  | United Kingdom | English         |
  | Poland         | Polish          |
