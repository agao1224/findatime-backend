/**
 * @Imports
 */
const { getUserType } = require("../middlewares/user-validator.js");


/**
 * @brief Given request body with necessary information
 *        and event URI, tries to log user in
 * 
 * @param body Availability object to update
 *                 event object with
 * @param uri URI of event object to update
 * @return boolean - true/false
 * 
 * @require body contains username, password and
 *          uri is valid for an event
 * @ensure returns true iff user is returning,
 *         false if user is new
 */
const postLoginEventService = async (body, uri) => {
  // Validate username, password are correct for
  // given event object
  let isNewUser = false;
  let isInvalidUser = false;
  let isReturningUser = false;
  const userType = await getUserType(uri, body.username, body.password)

  switch (userType) {
    case -1:
      isInvalidUser = true;
      break;
    case 0:
      isNewUser = true;
      break;
    case 1:
      isReturningUser = true;
      break;
    default:
      console.log("ERROR: An invalid user status code was encountered.");
      throw new Error("Invalid user status code.");
  }

  // If new user, return back empty timeRange array
  // (represents their own)
  if (isNewUser) {
    return false;
  }
  // If returning user, return back old timeRange array
  if (isReturningUser) {
    return true;
  }
  // If invalid user, throw error
  if (isInvalidUser) {
    throw new Error("Invalid credentials.");
  }
}

module.exports = { postLoginEventService }