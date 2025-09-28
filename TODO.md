# Task: Add Sign Up with Google to SignUp page and ensure manual sign-up shows only client name in username

## Current Work:
Enhancing the SignUp page with Google authentication option. Username display already prioritizes displayName (set during manual sign-up via updateProfile) over email, so only the entered name shows in Navbar/profile for email sign-ups. For Google, it uses Google's displayName natively.

## Key Technical Concepts:
- Firebase Auth: signInWithPopup for Google creates new users if not existing.
- React Router: Navigation post-auth.
- Shadcn UI: Button components for consistency.
- Contexts: useAuth for signInWithGoogle function.

## Relevant Files and Code:
- src/pages/SignUp.tsx: Add import for signInWithGoogle, Google button with divider, handle click with error handling and navigation.
- src/contexts/AuthContext.tsx: Existing signInWithGoogle (no changes needed).
- src/components/Navbar.tsx: Username logic already correct (displayName || email).

## Problem Solving:
- Manual sign-up: updateProfile sets displayName to entered name, ensuring username shows only name.
- Google sign-up: Uses signInWithGoogle; if new user, Firebase creates with Google's displayName.

## Pending Tasks and Next Steps:
- [x] Update src/pages/SignUp.tsx: Add "Or sign up with Google" divider and button below form; use signInWithGoogle, navigate to "/" on success, show error if fails.
- [ ] Test: Launch /signup, click Google button, verify auth popup, successful sign-up shows name in Navbar, navigates to home.
- [ ] Verify manual sign-up: Enter name/email/password, submit, confirm Navbar shows only name (not email).
