/**
 * @brief Given an array of abbreviated days
 *        of the week, validates that they are
 *        all in correct MTW format
 * 
 * @param dayArray Array of abbreviated days
 * @return boolean - true/false
 * 
 * @require dayArray is a string array
 * @ensure returns true iff all day abbreviations
 *         in dayArray are valid
 */
 const validateDays = (dayArray) => {
  // Initialize map 
  const dayMap = new Map();
  dayMap.set("M", true);
  dayMap.set("T", true);
  dayMap.set("W", true);
  dayMap.set("Th", true);
  dayMap.set("F", true);
  dayMap.set("S", true);
  dayMap.set("Su", true);

  for (let i = 0; i < dayArray.length; i++) {
    if (!dayMap.has(dayArray[i])) {
      throw new Error("Invalid day(s) specified.");
    }
  }
  return true;
}

/**
 * @brief Helper function to validate if given object
 *        is well-formatted as a timeRange
 *        (refer to schema/Event.js)
 * 
 * @param timeRange JSON to verify as timeRange object
 * @return true iff valid timeRange object
 * 
 * @require timeRange != null
 * @ensure returns true iff valid timeRange object,
 *         raises an error otherwise
 */
const validateTimeRange = (timeRange) => {
  if (timeRange["day"] == null || timeRange["start"] == null
      || timeRange["end"] == null) {
    console.log("Missing day, start, or end in timeRange object.");
    throw new Error("Incorrect availability formatting.");
  }
  return true;
}

/**
 * @brief Given array, verify that it is well-formatted a
 *        array of timeRange objects (refer to schema/Event.js)
 * 
 * @param timeRangeArray Array of timeRanges to validate
 * @return boolean - true iff well-formatted
 * 
 * @require timeRangeArray != null
 * @ensure returns true iff well-formatted, raises error
 *         otherwise
 */
const validateTimesArray = (timeRangeArray) => {
  const timesArray = timeRangeArray;
  for (let i = 0; i < timesArray.length; i++) {
    // Check formatting for each timeRange
    if (validateTimeRange(timesArray[i])) {
      continue;
    }
  }
  return true;
}

module.exports = { validateDays, validateTimesArray }