# TODO: Integrate Gemini API into AskCounsel Chatbot

## Overview
Updated the AskCounsel chatbot to use Google Gemini API directly from the frontend (no Firebase functions used as per user request).

## Tasks

### 1. Install Gemini SDK
- [x] Install @google/generative-ai in package.json

### 2. Update chatbotService.ts
- [x] Replace Firebase function call with direct Gemini API call
- [x] Set API key via VITE_GEMINI_API_KEY environment variable

### 3. Configure API Key
- [x] Create .env file with VITE_GEMINI_API_KEY

### 4. Testing and Verification
- [ ] Test chatbot responses in the application
- [ ] Verify proper error handling
- [ ] Ensure responses are accurate and follow legal guidelines

## Notes
- API key is exposed in client-side code (not secure for production)
- System prompt emphasizes that responses are not legal advice
- Direct API call for simplicity as requested

---

# TODO: Fix Videoconferencing Join Link for Cross-Device Access

## Overview
The video call join link was hardcoded to production URL, preventing cross-device joining during local testing. Need to make URL dynamic, secure token generation, and store bookings in Firebase.

## Tasks

### 1. Add Server-Side Zego Token Generation
- [x] Add `generateZegoToken` callable function in `functions/src/index.ts`
- [x] Use Firebase config for appID and serverSecret
- [x] Function takes roomID, userID, userName as params

### 2. Update VideoCall.tsx
- [x] Replace client-side token generation with call to `generateZegoToken`
- [x] Use auth UID for userID if available, else generate unique ID
- [x] Remove hardcoded appID/serverSecret

### 3. Update BookingSuccess.tsx
- [x] Change shareUrl to use `window.location.origin` instead of hardcoded production URL

### 4. Update Payments.tsx
- [x] Store booking data and roomID in Firebase Realtime DB under `/bookings/{userId}/{bookingId}`
- [x] Include lawyerId, date, time, roomID, status

### 5. Deploy and Test
- [x] Set Zego secrets in Firebase config
- [x] Deploy functions: `firebase deploy --only functions` (Requires Blaze plan upgrade)
- [x] Test local cross-device joining (use ngrok or local IP)
- [x] Verify production deployment

## Notes
- Ensures join links work in both local and production environments
- Improves security by moving secrets server-side
- Enables lawyer dashboard integration via stored bookings

---

# TODO: Fix Videoconferencing Functionality

## Overview
Update VideoCall.tsx to use Zego UIKit Prebuilt v2 API, fix mode, script version, container styling, and add leave button.

## Tasks

### 1. Update Zego Script and API
- [x] Update script src to v2.17.0
- [x] Change scenario mode to OneONoneCall
- [x] Adjust joinRoom config for v2

### 2. Fix Container Styling
- [x] Remove inline fixed style on video container
- [x] Adjust className for proper layout

### 3. Add Leave Call Button
- [x] Add end call button in the UI overlay

### 4. Improve Error Handling
- [x] Add more specific error messages
- [x] Handle token generation failures

### 5. Testing
- [x] Test video call initialization
- [x] Verify join and leave functionality
- [x] Check cross-device access
