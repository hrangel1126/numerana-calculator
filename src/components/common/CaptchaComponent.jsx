import React, { useEffect, useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import './CaptchaComponent.css';

/**
 * CaptchaComponent - Reusable captcha component with React 18 compatibility
 * 
 * Usage:
 *   <CaptchaComponent ref={captchaRef} />
 *   
 *   // In your submit handler:
 *   const userInput = captchaRef.current.getUserInput();
 *   if (!captchaRef.current.validate(userInput)) {
 *       alert(t('captcha.validationFailed'));
 *       return;
 *   }
 */

const CaptchaComponent = React.forwardRef((props, ref) => {
  const captchaInitialized = useRef(false);

  /**
   * Initialize captcha on mount
   * Using ref to prevent double initialization in React 18 StrictMode
   */
  useEffect(() => {
    // Only initialize once to prevent React 18 double-render issues
    if (!captchaInitialized.current) {
      try {
        loadCaptchaEnginge(4); // 4 characters as requested
        captchaInitialized.current = true;
      } catch (error) {
        console.error('Error initializing captcha:', error);
      }
    }

    // Cleanup function (optional)
    return () => {
      // Reset flag on unmount if needed
      // Don't actually unload captcha as it may affect other components
    };
  }, []); // Empty dependency array - run only on mount

  /**
   * Get user input from captcha input field
   */
  const getUserInput = () => {
    const inputElement = document.getElementById('user_captcha_input');
    return inputElement ? inputElement.value : '';
  };

  /**
   * Validate captcha (wraps the library's validateCaptcha)
   * @param {string} userInput - The user's captcha input
   * @returns {boolean} - true if valid, false if invalid
   */
  const validate = (userInput) => {
    // Use the library's validation function
    // Second parameter set to true to reload captcha on failure
    try {
      const isValid = validateCaptcha(userInput, true);
      return isValid === true;
    } catch (error) {
      console.error('Error validating captcha:', error);
      return false;
    }
  };

  /**
   * Reset captcha (clear input and reload)
   */
  const reset = () => {
    const inputElement = document.getElementById('user_captcha_input');
    if (inputElement) {
      inputElement.value = '';
    }
    try {
      loadCaptchaEnginge(4);
    } catch (error) {
      console.error('Error resetting captcha:', error);
    }
  };

  /**
   * Expose methods through ref
   */
  React.useImperativeHandle(ref, () => ({
    getUserInput,
    validate,
    reset
  }));

  return (
    <div className="captcha-wrapper">
      <div className="captcha-container">
        {/* Horizontal Layout: Canvas LEFT, Input RIGHT */}
        <div className="captcha-input-layout">
          {/* Captcha Canvas - LEFT SIDE */}
          <div className="captcha-canvas-wrapper">
            <LoadCanvasTemplate />
          </div>

          {/* Captcha Input - RIGHT SIDE */}
          <div className="captcha-input-wrapper">
            <input
              type="text"
              id="user_captcha_input"
              className="captcha-input"
              placeholder="Enter code"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Reload Link - BELOW */}
        <div className="captcha-reload">
          {/* LoadCanvasTemplate includes the reload button */}
        </div>
      </div>
    </div>
  );
});

// Display name for debugging
CaptchaComponent.displayName = 'CaptchaComponent';

export default CaptchaComponent;
