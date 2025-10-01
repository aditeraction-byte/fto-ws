
// jsQR is a lightweight QR code scanning library.
// We import it from a CDN to avoid bundling issues.
importScripts('https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js');

self.onmessage = (e) => {
  if (e.data.type === 'DECODE_IMAGE') {
    const { imageData } = e.data;
    try {
      // Attempt to decode the QR code from the image data.
      const code = self.jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert', // Speeds up scanning
      });
      
      if (code && code.data) {
        // If a code is found, send the data back to the main thread.
        self.postMessage({ type: 'DECODE_RESULT', data: code.data });
      } else {
        // If no code is found, we don't need to do anything. The main thread will keep sending frames.
        // We could post a "not found" message, but it would be very noisy.
      }
    } catch (error) {
      // If there's an error during decoding, send it back.
      self.postMessage({ type: 'DECODE_ERROR', error: error.message });
    }
  }
};
