/**
 * @Imports
 */


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

module.exports = { validateDays }