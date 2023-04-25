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

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice


Models:
    Hat Model - contains all the hat data properties
    LocationVO Model - contains all the location properties coming from wardrobe API (location) and is foreign key to hat model

Poller Microservice:
    Hat poller - polls the data every minute from wardrobe API (location) and creates or update LocationVO model


