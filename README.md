# Wardrobify

Team:

* Jonathan Blazer - Shoes
* Italiz - Hats

## Design

React App:
    NAV bar will have 5 links: Home, Shoelist, HatList, CreateShoe, CreateHat
    Each item on each list will have a "delete" button next to it.
        after clicking the Delete button, list should re-render without that item.
    List view should use Bootstrap CARDS

## Shoes microservice

I used all the recommended attributes for the shoe.
I looked in Wardrobe.models and copied everything over to the BinVO that is the ForeignKey on Shoe.
In order to implement the Delete from React, I manually retrieved the id from the database and added to the JSON when returning the list.

## Hats microservice

Models:
    Hat Model - contains all the hat data properties
    LocationVO Model - contains all the location properties coming from wardrobe API (location) and is foreign key to hat model
Poller Microservice:
    Hat poller - polls the data every minute from wardrobe API (location) and creates or update LocationVO model
