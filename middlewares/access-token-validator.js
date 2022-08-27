/**
 * @Imports 
 */
const { getEventAccessToken } = require("../services/get-access-token-service.js");

/**
 * @brief Given event URI and access token, 
 *        verifies whether access token is 
 *        correct for specified event
 * 
 * @param uri Specifies event to check token for
 * @param accessToken access token for the event
 * @return boolean - true/false
 * 
 * @require uri, accessToken != null, accessToken
 *          is in Mongo ObjectID format, uri
 *          exists in database
 * @ensure Return true iff accessToken is valid for 
 *         specific URI
 */
const accessTokenHelper = async (uri, clientAccessToken) => {
  try {
    // Query database for event document specified by uri
    const eventAccessToken = await getEventAccessToken(uri);
    // Compare event accessToken with client's accessToken
    return (eventAccessToken === clientAccessToken);
  } catch (e) {
    console.log(e.message);
  }
}


/**
 * @brief Wrapper function for validating
 *        whether given access token corresponds
 *        to event specified by uri
 * 
 * @param accessToken access token sent by client for event
 * @param uri Specifies event document
 * @returns boolean true/false
 * 
 * @require accessToken, uri != null and well-formatted
 * @ensure Returns true iff access token is valid for given
 *         uri. Raises error otherwise
 */
const accessTokenValidator = async (uri, accessToken) => {
  const isValidToken = 
    await accessTokenHelper(uri, accessToken);

  if (isValidToken) {
    return true;
  } else {
    throw new Error("Invalid event or access token.");
  }
}

module.exports = { accessTokenValidator }