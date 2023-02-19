# SMS Text Message Reminders for Ada-1 Destiny 2

This code is no longer necessary due to Bungie adding the ability to grab any mod a player might want. However, before  this seasonal upgrade, players had to check an NPC daily to check and see if she was selling the mod they needed.
There were no other reminders outside of email or checking the bungie app to check in everyday after reset to see if she was selling a specific mod. Or a player could just login after 12 / 1 ET and check her manually. I found it was hard to remember to check the bungie app, or even look at my emails daily. But I never miss a text message. That is where this script comes in. It was also good practice to work with bungies API and auth.


# Python Script Portion for Bungies API
    No Installation  - This is running via AWS lambda
    * Everyday at 12 the lambda function runs the script, which sends a text to all the numbers saved for the Twilio API
    * API Secrets are stored via AWS Secrets Manager
    
        
    Installation  - If running locally
    * Please install the packages from the requirements.txt file in the folder -> bungie-vendor-text
    * Please make sure you have all of your credentials and keys set in a .env file or a creds.json file
    

# Running Locally for Client and Server
## the client folder includes a form for react that allows people to add their numbers to the Twilio SMS service to recieve text messages
* Enter client folder and install all npm packages -> will be listed below
*npm start

## the server folder includes the API backend service that makes the calls To the twilio service to recieve text messages
* Please enter your Twilio credentials to access the API's HTTP request
* Run node index.js



# Client form for the service
![github-read-me](https://user-images.githubusercontent.com/64509047/219961300-1a45014f-fc6a-4f0f-8235-be38db8b8f35.png)
