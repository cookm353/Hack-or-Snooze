"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage("main");

  // Hide favorited and own stories
  $("#fave-stories-list").hide();
  $("#own-stories-list").hide();
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
  putStoriesOnPage("faves")
}

$("#fave-stories").on("click", showFavorites);

/** Filter for user's posted stories */
function showMyStories() {
  putStoriesOnPage("own")
  const $trashIcon = $("<span class='remove-story'><i class='fas fa-trash'></i></span>")
  const $ownLis = $("#own-stories-list li")
  $ownLis.prepend($trashIcon)
}

$("#own-stories").on("click", showMyStories);