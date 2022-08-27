/**
 * @Imports 
 */
const User = require("../schema/User.js");
const Event = require("../schema/Event.js");
const { getEventAccessToken } = require("./get-access-token-service");

/**
 * @brief Creates a new user document given
 *        username and password
 * 
 * @param username 
 * @param password
 * @return user object document 
 * 
 * @require username, password != null
 * @ensure returns valid user object containing
 *         username, password
 */
const createNewUserDoc = (username, password) => {
  const userDoc = new User({
    username: username,
    password: password
  })
  return userDoc; 
}

/**
 * @brief Given new user document, write it 
 *        to event specified by URI
 * 
 * @param userDoc User document to write to event
 * @param uri Specifies event to write to
 * 
 * @require userDoc != null, well-formatted,
 *          uri is valid
 * @ensure Writes userDoc to event specified
 *         by URI
 */
const writeNewUserDoc = async (userDoc, uri) => {
  try {
    const eventQuery = { _id: uri };
    const appendOperation = { $push: { users: userDoc }};

    await Event.findOneAndUpdate(
      eventQuery,
      appendOperation,
      { new: true }
    );
    
  } catch (e) {
    console.log(e.message);
    throw new Error("ERROR: Could not register to specified event.");
  }
}

/**
 * @brief Creates a new user doc and writes it
 *        to database under specified event. 
 * 
 * @param uri Specifies event document
 * @param body Request body
 * @return Login token for current session
 * 
 * @require uri, body != null, and body specifies
 *          new user object to write to event
 * @ensure New user written to specified event,
 *         and returns JWT for current session
 */
const createNewUserService = async (uri, body) => {
  try {
    const newUserDoc = await createNewUserDoc(body.username, body.password);
    await writeNewUserDoc(newUserDoc, uri);
    const eventAccessToken = await getEventAccessToken(uri);
    return eventAccessToken;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { createNewUserService }