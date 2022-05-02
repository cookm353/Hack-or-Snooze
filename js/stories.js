"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage("main");
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage(page) {
  console.debug("putStoriesOnPage");
  
  let currentList, stories;
  switch (page) {
    case "main":
      currentList = $allStoriesList;
      stories = storyList.stories
      break;
    case "faves":
      currentList = $faveStoriesList;
      stories = currentUser.favorites
      break;
    case "own":
      currentList = $ownStoriesList
      stories = currentUser.ownStories
      break;
  }

  currentList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of stories) {
    const $story = generateStoryMarkup(story);
    addStarsToStory($story);
    currentList.append($story);
  }

  // Hide lists other than the one indicated
  const lists = [$allStoriesList, $faveStoriesList, $ownStoriesList]
  const otherLists = lists.filter(list => currentList !== list)
  otherLists.map(list => list.hide())

  currentList.show();
}


/** Add stars to li elemnts */
function addStarsToStory(story) {
  // HTML for stars
  const $filledStar = $('<span><i class="fa-star fas"></i></span>');
  const $emptyStar = $('<span><i class="fa-star far"></i></span>');
  
  // Prepend an empty or filled star based on if a story in favorites
  const id = story[0].getAttribute("id");
  const faveIds = currentUser.favorites.map(story => story.storyId);
  if ( faveIds.indexOf(id) !== -1 ) {
    story.prepend($filledStar);
  } else {
    story.prepend($emptyStar);
  }  
}

/** 
 * Submits form and adds new story to page
*/
async function submitStory(evt) {
  evt.preventDefault();
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();
  const stories = await StoryList.getStories();
  
  let newStory = await stories.addStory(currentUser,
    {title: title, author: author, url: url});

  
  $ownStoriesList.empty();
  // makeOwnStoriesList();
  putStoriesOnPage("own")
  $("#storySubmitForm").toggle();
}

$("#storySubmitForm button").on("click", submitStory);

/** 
 * Add or remove story from favorites w/ UI 
*/
async function addRemoveFavoriteWithUI(evt) {  
  $faveStoriesList.empty();

  // Get element's class list and id of story
  const classes = evt.target.classList
  const storyId = evt.target.parentNode.parentNode.getAttribute("id")
  console.log(evt.target.parentNode.parentNode)

  // Add/remove story from favorites based on class
  if (classes.contains("far")) { // Add
    currentUser.addFavoriteStory(storyId)
  } else if (classes.contains("fas")) { // Remove
    currentUser.removeFavoriteStory(storyId)
  }

  // Switch between filled in and empty stars
  if (classes.contains("fa-star")) {
    classes.toggle("far")
    classes.toggle("fas")
  }

  // makeFavoritesList();
  putStoriesOnPage("faves")
}

$("ol, ul").on("click", $(".fa-star"), addRemoveFavoriteWithUI)