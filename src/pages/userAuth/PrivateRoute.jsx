// import { Route, Redirect } from "react-router-dom";
// import { auth } from "../../utils/firebase";

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const currentUser = auth.currentUser;

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         currentUser ? 
//         <Component {...props} /> 
//         : 
//         <Redirect to="/login?message=Hello! Please login to your account to perform this action" />
//       }}
//     />
//   );
// }
