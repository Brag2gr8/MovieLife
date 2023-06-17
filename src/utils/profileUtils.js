// Function to convert a Blob object to a Data URL
export const convertBlobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // Create a new FileReader object

    reader.onloadend = () => {
      // When the reader has finished loading the blob
      resolve(reader.result); // Resolve the promise with the result (Data URL)
    };

    reader.onerror = () => {
      // If an error occurs during reading the blob
      reject(reader.error); // Reject the promise with the error
    };

    reader.readAsDataURL(blob); // Read the blob as a Data URL
  });
};
