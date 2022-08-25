/**
 * @Imports
 */
const Event = require("../schema/Event.js");

/**
 * @brief Given an array of user objects, username,
 *        and password, try to find a user with
 *        matching credentials
 * 
 * @param userArray Array of user objects
 *                  (refer to schema/Event.js)
 * @param username 
 * @param password
 * @return integer - status code (-1, 0, 1)
 * 
 * @require entries in userArray are of user type
 *          (refer to schema/Event.js)
 * @ensure -1: User found, but invalid credentials given
 *          0: User not found, new user
 *          1: User found, and valid credentials given
 */
const findMatchingUser = async (userArray, username, password) => {
  for (let i = 0; i < userArray.length; i++) {
    const currUser = userArray[i];
    // User match and correct credentials: 1
    if (currUser["username"] === username && currUser["password"] === password) {
      return 1;
    // User match but incorrect credentials: -1
    } else if (currUser["username"] === username && currUser["password"] !== password) {
      return -1;
    }
  }
  // No match found, return 0
  return 0;
}

/**
 * @brief Given event URI, username, and password
 *        checks whether the specified user for 
 *        event is valid or not.
 * 
 * @param uri URI specifying the event
 * @param username username specific to the event
 * @param password password specific to the event
 * @return integer - status code (-1, 0, 1)
 * 
 * @require uri != null, all args are well-formatted
 * @ensure -1: Valid user, but invalid credentials
 *          0: New user
 *          1: Valid user, valid credentials
 */
const getUserType = async (uri, username, password) => {
  try {
    const eventDoc = await Event.findById(uri);
    const userArray = eventDoc["users"];
    return findMatchingUser(userArray, username, password);
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { getUserType }