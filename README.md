# Hack-or-Snooze

## JS Scripts
### main.js
* Code for starting the UI and other assorted tasks

### models.js
* Holds all of the classes, manages data and API connection
* `models.js` is a typical name for a script which holds these kinds of classes
* Shouldn't have any UI related code
* Story
    * Class holding story info
    * Retrieves hostname from URL
* StoryList
    * Holds stories
    * Retrieves stories from API and converts to story objects
    * Adds stories
* User
    * Stores info about user, including favorite and posted stories
    * Create new user and send to API
    * Login to API, make user isntance, and return
    * Login w/ stored credentials



### nav.js
* Show and hide elements in the nav bar
* Holds codes for handling nav bar clicks

### stories.js
* Code for UI about listing stories

### user.js
* Code for UI about logging in, creating new users, and logging out
* 