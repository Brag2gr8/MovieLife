// Import the necessary dependency and function
import { redirect } from "react-router-dom";
import { currentUser } from "../utils/firebase";

export async function requireAuth() {
  // Extract the pathname from the request URL
  const pathname = new URL(request.url).pathname;

  // Retrieve the current user using the currentUser function from Firebase authentication
  const user = currentUser();

  // If there is no user (i.e., user is not authenticated)
  if (!user) {
    // Construct the redirect URL that includes a login message and the path to redirect after login
    const redirectUrl = `/login?message=You must log in first to perform this action !&redirectTo=${pathname}`;

    // Throw a redirect error to redirect the user to the login page with the appropriate message and redirection path
    throw redirect(redirectUrl);
  }
}
