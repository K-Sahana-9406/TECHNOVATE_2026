// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

/**
 * Submit registration data to Google Sheets
 * Each member is added as a separate row for easy counting
 * @param {Object} rowData - Single row of data for one member
 */
export const submitToGoogleSheets = async (rowData) => {
  try {
    // If no Google Script URL configured, throw error to trigger fallback
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('Google Script URL not configured');
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Google Sheets submission error:', error);
    throw error;
  }
};

/**
 * Submit multiple rows (for team registrations)
 * Each member gets their own row
 * @param {Array} rowsArray - Array of row data objects
 */
export const submitMultipleRows = async (rowsArray) => {
  const results = [];
  for (const row of rowsArray) {
    try {
      const result = await submitToGoogleSheets(row);
      results.push({ success: true, result });
    } catch (error) {
      // Store locally if submission fails
      storeRegistrationLocally(row);
      results.push({ success: false, error: error.message });
    }
  }
  return results;
};

/**
 * Fallback: Store in localStorage if Google Sheets is not configured
 * @param {Object} rowData - Single row of data
 */
export const storeRegistrationLocally = (rowData) => {
  const registrations = JSON.parse(localStorage.getItem('technovate_registrations') || '[]');
  registrations.push({
    ...rowData,
    storedAt: new Date().toISOString()
  });
  localStorage.setItem('technovate_registrations', JSON.stringify(registrations));
  console.log('Stored locally:', rowData);
  return { success: true, storedLocally: true };
};

/**
 * Get all locally stored registrations
 * Useful for syncing when Google Sheets becomes available
 */
export const getLocalRegistrations = () => {
  return JSON.parse(localStorage.getItem('technovate_registrations') || '[]');
};

/**
 * Clear locally stored registrations after successful sync
 */
export const clearLocalRegistrations = () => {
  localStorage.removeItem('technovate_registrations');
};
