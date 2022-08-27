/**
 * @Imports
 */
const { getEventURIService } = require("../services/uri-event-service.js");


/**
 * @brief Given event's available days array, creates
 *        a new hashmap with them as entries and values as
 *        "true" (value does not matter as much, just
 *        to ensure O(1) lookup)
 * 
 * @param availDaysArray 
 * @return Map() object 
 * 
 * @require availDaysArray != null, contains valid
 *          abbreviated days of the week, i.e.
 *          "M", "T", "W", "Th", ...
 * @ensure Map() object with items of availDaysArray
 *         as keys and true (boolean) as values returned
 */
const createDayMap = (availDaysArray) => {
  const dayMap = new Map();
  for (let i = 0; i < availDaysArray.length; i++) {
    dayMap.set(availDaysArray[i], true);
  }
  return dayMap;
}

/**
 * @brief Given a Map() of available event days,
 *        event start/end time, and a timeRange object,
 *        verifies that timeRange object falls in
 *        event bounds
 * 
 * @param dayMap Map() containing available event days
 * @param startTime event's start time (military time)
 * @param endTime event's end time (military time)
 * @param timeRange timeRange object to check 
 * @return boolean - true/false 
 * 
 * @require dayMap, startTime, endTime != null,
 *          dayMap contains all valid event days,
 *          start/endtime both valid for event
 * @ensure true iff timeRange's start/end times fall
 *         in event bounds and specified day is in  
 *         dayMap
 */
const checkTimeRangeBounds = async (dayMap, startTime, endTime, timeRange) => {
  // Check if day is in map 
  const day = timeRange["day"];
  const clientStart = timeRange["start"];
  const clientEnd = timeRange["end"];

  return await (dayMap.has(day) && 
               (startTime <= clientStart 
                && clientStart < clientEnd 
                && clientEnd <= endTime));
}


/**
 * @brief Given a user's available times in
 *        times array in availabilityObj, 
 *        checks that both days they specify and
 *        time ranges fall in between event bounds
 * 
 * @IMPORTANT In order to guarantee that no race conditions
 *            arise, for each check we must directly query
 *            from the database instead of querying once
 *            and passing a copy of the event document around.
 * 
 * @param uri Specifies the event
 * @param times User's available times 
 * @return boolean - true/false
 * 
 * @require times != null, nonempty and
 *          uri specifies event that exists
 * @ensure Returns true iff all timeRange objs
 *         in times array fall in event's bounds
 */
const validateUserAvail = async (uri, times) => {
  try {
    const eventDoc = await getEventURIService(uri);
    const availDaysArray = eventDoc["days"];
    const startTime = eventDoc["startTime"];
    const endTime = eventDoc["endTime"];

    // Create a map to ensure O(1) lookup per element
    const dayMap = createDayMap(availDaysArray);

    // For each timeRange object in times, verify
    // day and start, end time fall in bounds
    for (let i = 0; i < times.length; i++) {
      // Invalid time range found
      if (!(await checkTimeRangeBounds(dayMap, startTime, endTime, times[i]))) {
        throw new Error("ERROR: User specified an invalid time range.");
      }
    }
    return true;
  } catch (e) {
    throw new Error("ERROR: Invalid availability.");
  }
}


module.exports = { validateUserAvail }