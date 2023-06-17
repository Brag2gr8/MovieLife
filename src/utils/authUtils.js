import { redirect } from "react-router-dom";
import { currentUser } from "../utils/firebase";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const user = currentUser()
  // const navigate = useNavigate();

  if (!user) {
    const redirectUrl = `/login?message=You must log in first to perform this action !&redirectTo=${pathname}`;
    throw redirect(redirectUrl);
  }
}
