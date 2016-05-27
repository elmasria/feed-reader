# Project Overview

Testing the Feed Reader app using Javascript testing framework **Jasmine**.

## Installation

1. Clone / download the project
    * ``` git clone https://github.com/elmasria/feed-reader.git ```
2. Navigate to repository
    * ``` cd feed-reader```
3. select index.html file to test the project

## Covered Tests

*Tests were added in jasmine/spec/feedreader.js to test for functionality of the website*. The following **tests** are included:

1. RSS feeds are defined in allFeeds and are not empty.
    * Each feed in allFeeds has a defined and valid (simple RegExp) URL.
    * Each feed has a defined and non-blank name.
2. The menu
    * The navigation menu is hidden by default (on page load).
    * The nav. menu toggles visibility after clicking the menu icon.
3. Initial Entries
    * The first feed has at least one entry.
4. New Feed Selection
    * The feed changes content after a new feed is loaded.

## References

* [Jasmine](http://jasmine.github.io/)