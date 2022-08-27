/**
 * @Imports 
 */
const { getEventAccessToken } = require("../services/get-access-token-service");

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
const accessTokenValidator = async (uri, clientAccessToken) => {
  try {
    // Query database for event document specified by uri
    const eventAccessToken = await getEventAccessToken(uri);
    // Compare event accessToken with client's accessToken
    return (eventAccessToken === clientAccessToken);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { accessTokenValidator }