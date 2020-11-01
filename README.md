# Confirmation Email Script with a Finnish Reference Number Generator

## Description

This Google Apps Script confirmation email sender is triggered when a new overall badge order is received from Google Forms. It takes the information from the last row of the spreadsheet and sends an email to the given email address (email validated by Google Forms; MailApp will be able to send a message). A unique reference number is generated for each order. The script calculates a price based on the number of badges (which is confirmed to be greater or equal to 1 by Google Forms).  
  
A reference number is calculated with the stem number that is always in the cell **I2**. Everytime a new reference number is generated, the value of the cell is updated. 
 
The information required for the script is presented below in the spreadsheet columns, with example values: 
 
| B                 | C                 | D                                 | E             | F             |   | I     |
|---                |---                |---                                |---            |---            |---|---    |
| Name              | Email             | Address                           | No of badges  | Confirmation  |   | Stem  |
| Tiina Teekkari    | tt@example.com    | Roadstreet 1A, 000000 Helsinki    | 3             | EMAIL_SENT    |   | 1010  |
| Teemu Teekkari    | teemu@example.com | Roadstreet 1B, 000000 Helsinki    | 10            | EMAIL_SENT    |   |       |

## Known issues

There is a case where a person tried to make an order twice (on different days) with a gmail address, but did not get the email on either try. There were no errors according to the stackdriver logs, so it might have to do with their personal spam settings, email client etc. The properties of the MailApp class were considered, however the script, and thus also MailApp.sendEmail, work with other gmail addresses. The issue is being monitored for recurrences.
