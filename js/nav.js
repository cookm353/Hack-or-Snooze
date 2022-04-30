"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Display form for user to submit a story */

function showStorySubmitForm() {
  $("#storySubmitForm").toggleClass("hidden");
}

$("#submit-story").on("click", showStorySubmitForm);

/** Filter for user's favorite stories */
function showFavorites() {
  // Retrieve IDs of favorite stories
  const $faveStories = $("#fave-stories-list")
  const favoriteIds = currentUser.favorites.map(story => story.storyId)

  // Get li elmeents and filter for favorites
  const lis = $("li").get()
  const faveLis = lis.filter(li => {
    const id = li.getAttribute("id");
    return favoriteIds.indexOf(id) !== -1;
  });
  
  // Add favorites stories to ul
  faveLis.map(li => $faveStories.append(li))
  
  // Switch between regular list and list of favorites
  $("ol").toggle();
  $faveStories.toggle();
}

$("#fave-stories").on("click", showFavorites);

/** Filter for uses's posted stories */
function showOwn() {
  // Get IDs of own stories
  const $ownStories = $("#own-stories-list")
  const ownIds = currentUser.ownStories.map(story => story.storyId)

  // Get li elements and filter for own stories
  const lis = $("li").get()
  const ownLis = lis.filter(li => {
    const id = li.getAttribute("id");
    return ownIds.indexOf(id) !== -1;
  });

  // Add favorites stories to ul
  ownLis.map(li => $ownStories.append(li))

  // Switch between regular list and list of favorites
  $("ol").toggle();
  $ownStories.toggle();
}

$("#own-stories").on("click", showOwn);