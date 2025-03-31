# sky_saver

## To-Do 

The main goal of sky_saver is to be able to find the cheapest package deals when flying and going on holiday. 
Sky_saver looks through data, finds the cheapest pairings and recommends them to the user. 
As well as finding the cheapest flights for user-determined routes, sky_saver also creates a feed of the cheapest holidays/destinations one can travel and stay at.

### Backend


- Master the Duffel API and use it to it's full potential
    - Manage to limit the size of and get high-quality responses.
    - Cache and organise responses, common routes should also check the API if 2 stop 
    routes are more cost effective
    - Implement a booking system using the duffel api. Let the user pick seats etc.

- Find solution for getting event info in the App.
- Figure a solution for caching certain info regarding popular cities (events in paris etc).
- Get 'sign in with google' intergration.

### Frontend

- Create splash page, with info about the site, a login and registration route.
- Create Login

---

Completed steps are below

- ~~Get info from Amadeus API regarding flight/hotel info~~ (Duffel is now the main provider of flight info) 
    - ~~Get the Auth Key via the api in AuthoriseSession.~~
    - ~~Get flight data dynamically and quickly via location, and destination and team.~~
    - ~~Get Hotel info from the same amount of info as the plane price (amadeus has this, but maybe look elsewhere)~~
- ~~Get Go working with the remote server for database access.~~
- ~~Change auth to JWT or something else.~~


---



## Abandoned goals

__Why the Feed isn't happening__

Even when taking into consideration the restricted scope, there exists 238 separate airports that you can fly to from the UK, and 36 separate international airports in the UK.

This combined is 8568 possible routes. So even polling just one flight per day for each possible route it leaves me with 3,127,320 distinct flights per year (unlikely all flights will be flying every day, but I'd still need to check to find deals).

This amount of regular API calling will likely leave me with a ban from using the duffel API.
But outside of that implication, it would take 608 hours to complete the search, which is 
impossible to be useful for the project.

Unless there's some other way to find the cheapest deals, this will have to be parked.


### The feed - goals, strategies, research and scope

It's worth outlining what I'm able to do as a solo developer, and what would be outside the scope of a personal project.

__Constraints__

- Only viable for UK audience for now. 
- Only shows holidays in the next year, doesn't pay attention to anything after that point.

__Goals__
- filter desired destination via geographical categories "med", "eastern europe", "Western Europe", "City Breaks" etc.
- Have a feed that presents itself to each user with the cheapest holidays
- Total Europe coverage for flying 
- Partial Europe coverage for hotelsH
- Have a hot "Hot deal/Bad deal" type of tag if a flight goes above/below

__Strategy__
- Have a part of the server which is regularly pinging the duffel API with
different origin/destinations in different time frames. Origins will all be UK
airports, popular destinations are given first priority.
- Results are cached in the database with an expiry time, this then triggers a repull of the price of that destination
- Flights to searched upon destinations are delivered fresh from the provider.

__Research goals__
- How often flight prices change
- Where can you fly to from the in the UK?
- What are the most common routes from each airport


__Nice to have__
- Bespoke feeds for each user, which takes into account their holiday preferences.
- Buying tickets in the website for flights
- Outside of Europe flying
