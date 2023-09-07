# recycl

A hackathon project helping you recycle correctly!

## About

This project was built in a day during a hackathon (mostly - some additional work, like this readme and minor styling changes, were added after the hackathon). 

The idea behind it is using ChatGPT to determine if an object is recyclable in a specific location. If an item is not recyclable, the app will display some alternative uses. For each search, results are cached to the database. If a search has already been made (location + item name), then ChatGPT will not be called.

### Examples
Portland / Plastic
- Recyclable - YES

Greenland / Plastic:
- Recyclable - NO
- Alternative Uses - Reusing plastic items as much as possible, Reducing the amount of plastic purchased,Using biodegradable products instead

Portland / Frozen Pizza Boxes
- Recyclable - NO
- Alternative Uses - composting, use as a makeshift canvas for painting, use for craft projects, utilize for temporary storage

Portland / Cardboard
- Recyclable - YES

### Screenshots

|Not Recyclable|Recyclable|
|---|---|
|![image](https://github.com/dlinds/recycl/assets/7016167/034cc31c-9faa-491f-9010-dd37ad6e9107)|![image](https://github.com/dlinds/recycl/assets/7016167/1dcd5760-ee98-41d1-a071-712d24487897)|

## Stack

This application is a monorepo. Inside is a service package and a mobileui package

### Service

ExpressJS running a NodeJS backend, serving API requests to CanIRecycle

The database is a local Docker instance of Hasura/GraphQL.

### mobileui

The mobileui package is a React Native app that calls the service API. It's a single screen, and is not very complex.


## Setup

Pre-requisites
- OpenAI API Key
- OpenAI access to GPT4 model 
   - I haven't tested with the GPT3.5 model, but it likely will work correctly
- Install Docker on your computer
- Set up your React Native development environment (if you want to use the front end) - https://reactnative.dev/docs/environment-setup


### Service: 

1. Clone this repo
2. Navigate into the `service` package, and create a `.env` file
3. Add a line `OPENAI_API_KEY=my_open_ai_key_here` and save
4. Start Docker
5. Navigate with your terminal to `service/hasura-recycl-docker`
6. Run `docker-compose up -d` to create the Hasura Docker instance. If any of the images happen to not run, open Docker and manually start them. Hasura should automatically create with the correct structure
7. run `yarn start`
8. Test out the API by going to http://localhost:3001/CanIRecycle?state=Oregon&item=amazon%20box. You should see a JSON result

RECOMMENDED: If you plan to try this on a physical phone, ngrok can be used to forward the 3001 port to a publicly accessible URL

1. Once the service is running, run `ngrok http 3001`
2. Take note of the URL that is generated


### MobileUI 

1. Navigate to the `mobileui` package and create a `.env` file
2. Add a line: `SERVICE_URI=my_service_uri` - this will either be http://localhost:3001, or the ngrok uri generated above
3. Start the mobile app with `yarn start` and then choose `i` or `a` for iOS or Android
4. Search for an item and a location, you should see the loading spinner while ChatGPT is called
5. On subsequent searches that match previous searches, results should return near instantaneously, because ChatGPT isn't called since the results are cached
