# Travel Memories API

This is the api of a mini project whereby users can create memories which come with chat rooms where they can have discussions and suggestions from others about other travel ideas.

## Installation

In your terminal, run: git clone https://github.com/sammyyOzz/travel-memories-server.git

create an app in google console [here](https://console.cloud.google.com).

create an account in stripe [here](https://stripe.com)

create an account or log into existing mongodb account [here](https://mongodb.com), create a new project and get your database connection url

In your environment variables, set the following with their correspoinding values:

MONGO_DB_CONNECTION_URL

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

STRIPE_SECRET

EMAIL_ADDRESS

EMAIL_PASSWORD

JWT_SIGNATURE

In your terminal, run the following:

npm install

npm run dev


### note:
JWT_SIGNATURE is any string of your choice and is advised not to be short.

EMAIL_ADDRESS can be any of your choice, however those ending in gmail.com may not work as expected so it is adviced to use a different email service.
