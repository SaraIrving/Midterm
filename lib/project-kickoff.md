


## W5D5 Mid-term Project Kickoff
## Pick a Project
<!-- <!-- - Wiki Map -->
- Quiz App
- Story Creator\
- Decision MakerC
- PasswordKeepR
- Smart TODO List
- Resource Wall
- Buy/Sell Listing Website
- Schoodle
- Food Pick-up Ordering
- User Stories
- A user story describes how users will interact - with your application

- They have the form: As a ___, I want to _, because ____.
- eg. As a user, I want to be able to save posts, because I want to review them later.
- User stories can also be negated: \s a __, I shoul
dn't be able to _, because ___.
- eg. As a user, I shouldn't be able to edit other users posts, because I don't own those posts.

## RESTAURANT DETAILS\
- Name Captain Clucks
- Menu
  - Chicken Drums x 2
  - Chicken Wings x 10
  - Chicken Sandwich
  - Popcorn Chicken x 15
  - Chicken and Waffles 
  - Coleslaw 
  - Macaroni salad 
  - Tater Tots
  - Root Beer 
  - Lemonade
  - Pepsi
  - Bottled Water



## User Scenarios
- A user scenario is a syntactic alternative to user stories
- They have the form: Given __, when _, then ____.
- eg. Given that I am logged in, when I click favourite on a post, then it is added to my favourites.
- You can also chain on an and to user stories/scenarios
- eg. Given that I am logged in, when I click favourite on a post, then it is added to my favourites and the save icon will change to indicate success.

## OUR SCENARIOS
- As a user I want to view the menu.
- As a user I want to then choose which menu items, and quantity.
- As a user I want to be able to change my menu items before I order.
- As a user I can see my order total before I order / when I update my order.
- As a user I want to put in my contact info, and press order to order my food.
- As a user I want to receive order confirmation, and time for pickup.
- As an admin, I want to receive an SMS when an order is placed.
- As a user I don't want to accidentally order more than once.
 - they click place order, the form replaced with thank you message.
 - change banner to read: Please wait while order is being confirmed.. 
 - It would be nice for banner to have . . . loading animation
- As an admin, I can login to my dashboard and view a list of pending and past orders.
- As an admin, I can specify wait time, which will confirm the order.
- responsive

### Stretch Scenarios
- As an admin, I want to send an SMS to the app containing the pickup time AND then, the app conveys the confirmation and pickup time to the user VIA SMS.
- As a user it would be ideal to have a cancel SMS command feature, if I want to cancel my order
- As an admin, would be necessary to add or edit the menu ****
- As an admin, would be nice to offer specials ****
- Change formatting of how drinks are displayed **
- actually add google maps instead of a photo of a map **
- create a filter for results in dashboard 

## Tables
- Menu
  - id | SERIAL PRIMARY KEY
  - name
  - price
  - description
  - picture

- Menu_Orders
  - id 
  - menu_id | FK
  - order_id | FK

- Orders
  - id | 
  - user_name
  - user_phone
  - total



## ERD
- The user stories provide you with nouns (eg. user, posts, favourites)
- Use these nouns/entities to build out your database (ie. tables are the nouns from the stories)
## Routes
- Once you know the resources that you'll have, write out the routes that you'll need to perform BREAD operations on those resources
- Remember RESTful conventions (they make it much easier)

MENU PAGE
- send get to /menu
- request info from db menu

PLACE ORDER
POST to /orders
- insert new order into orders with name, phone, total, status, pickup time
- insert line items into order_details table
- then send POST to twilio to send SMS to restaurant
- set interval to ajax listen to db order status change / as soon as the change is registered, redirect the page to confirmation page
- triggers pending notification banner
- form success page


ajax on the menu page inside interval which constantly returns the status from the order table matching the current order
- routes/orders --> we have access to current order_id --> render and insert order data into banner 

- OR from routes page, redirect to confirmation page and insert data? BUT seems like we can't perform ajax call on route page

- on the scripts/menu.js page, which our menu is linking to. BUT we don't seem to have access to the current order ID, since it's generated after we submit the order (from route)

- on the scripts/menu.js page, ajax a call to /order-status route which then queries for the db change, 

- menu page when user clicks place order, set a cookie with their order_id 
- order confirmation page, check db, for 

Confirmation page
- request all tables info to display on page
  IF response status from restaurant is > 30 mins
  - display longer than usual notification

ADMIN USER
- send get to /login to go to login page
- send post to /login to redirect to dashboard
- send get to /dashboard requests order and order_details from db to display orders on page, and renders dashboard page
- send post on /order-update which updates the order status from to value of pickup wait time.
- send post to twilio to SMS customer

## List it out
- create views ejs skeletons
- jquery up the menu form
- route it up, aside from twilio
- tackle twilio
- design




- they click place order, the form replaced with thank you message. x .25 --
- change banner to read: Please wait while order is being confirmed.. x .000 -- 
- It would be nice for banner to have . . . loading animation x .25 --
- dashboard test orders from fresh, make sure the orders display in proper order .25 --
- responsive **** x 2hrs -- 
- As an admin, would be necessary to add or edit the menu **** x 2 - 4
- Change formatting of how drinks are displayed ** .75
- As an admin, would be nice to offer specials **** 1 - 3 -- 
- actually add google maps instead of a photo of a map ** 2 - 5 --

- presentation prep, fake presentation x .75
- presentation + briefing for tomorrow x 1

5.25 hrs
3.25 hrs

~ 8.5

ADMIN USER
- send get to /login to go to login page
- send post to /login to redirect to dashboard
- send get to /dashboard requests order and order_details from db to display orders on page, and renders dashboard page
- send post on /order-update which updates the order status from to value of pickup wait time.
- send post to twilio to SMS customer

## List it out
- create views ejs skeletons
- jquery up the menu form
- route it up, aside from twilio
- tackle twilio
- design




- they click place order, the form replaced with thank you message. x .25 --
- change banner to read: Please wait while order is being confirmed.. x .000 -- 
- It would be nice for banner to have . . . loading animation x .25 --
- dashboard test orders from fresh, make sure the orders display in proper order .25 --
- responsive **** x 2hrs -- 
- As an admin, would be necessary to add or edit the menu **** x 2 - 4
- Change formatting of how drinks are displayed ** .75
- As an admin, would be nice to offer specials **** 1 - 3 -- 
- actually add google maps instead of a photo of a map ** 2 - 5 --

- presentation prep, fake presentation x .75
- presentation + briefing for tomorrow x 1

5.25 hrs
3.25 hrs

~ 8.5

## MVP vs MVD
- There is a concept in development of an MVP, the Minimum Viable Product
- An MVP has just enough features to be useful to a user
- This concept helps streamline the development process and help keep the team on target
- For mid-terms, we want to focus on the MVD, the Minimum Viable Demo
- If you aren't going to demo it, don't build it

## Wireframes
- Draw out the structure of your web pages
- This will make it much easier to build out these pages later
- This is also a great opportunity to get input from all of the team members
- Design matters... however you are a developer, not a designer
- Get inspiration from websites you visit

## Landing Page Wireframes
- logo
- menu button
- photo
- selling props 3 column 
- text blurb 
- feature section 
- lots of chicken photos 
- map
- footer

## Menu Wireframe
- logo
- button linking to home page 
- large hero photo 
- for each item: photo, name, description, price, box with quantity and add to order button
- to the side have a "Your Order" section which live updates to reflect the order contents and total as they build it, follows down the pages as the user scrolls through the menu  
  - add special instructions to the order (need to update order table) 
  - make the order a collapsable toggle for mobile layout 
  - total will dynamically update 
  - a garbage can icon next to each item in the order in case they want to delete it 
  - error messages that drop down if they don't have name or phone number inputted 

## Confirmation Wireframe 
- logo
- menu button at top 
- blurb that order is placed and pickup in 20 min 
  - display customers name 
  - display order ID
- text saying they will get a text confirming pickup time and a second text if there is a delay 
- breakdown of the order 
- large photo of map
- 
 ## Owner login

 ## Owner Dashboad 


## User Login
- Don't do it
- Seriously, don't do it
- We know that you know how to register and login users

```js
// do this instead
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});
```
## Tech Choices
- We have made all the tech choices for you
- Back End: Node and Express
- Front End: HTML, CSS, JS, jQuery, Bootstrap
## The Mid-term Skeleton
- Use the provided node-skeleton as a template for your project
- This will get you up and running quickly
## SPA vs Multi-page App
- These concepts are not mutually exclusive
- You can choose one or the other or both
##Git
- Use Git best practices (ask a mentor for clarification if you need it)
- Use branches
- DO NOT CODE ON MASTER
- I repeat, do not code on master
## Splitting up the Work
- Horizontally - whole team working on front-end or back-end at the same time
- Vertically - divide the work between front-end and back-end
- Pair Programming - working together on the same tasks
## Communication
- Make sure to communicate with your team members
- Use Slack, iMessage, Google Hangouts, whatever... just make sure that everyone is on the same page
## Github Projects
- Github has a built-in project board (similar to a kanban board)
## Deployment
- Decide if you want/need to deploy your application to the cloud
- Ask a mentor for assistance/advice if your team decides to deploy


## Presentation

- Jeremy is the customer
- 

5 talking points

- 
- Jer starts with 
- Jer starts as customer - describing home, then menu, then adding and placing order
- comment on user experience about order placement

- Sara shows SMS


