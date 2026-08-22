import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleSignInMutation } from "../authApiSlice";
import { setCredentials } from "../authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function GoogleSignin({ next }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [googleSignIn] = useGoogleSignInMutation();
  const handleSuccess = async (response) => {
    const credential = jwtDecode(response.credential);
    const data = {
      first_name: credential.given_name,
      last_name: credential.family_name,
      email: credential.email,
      avatar: credential.picture,
    };

    try {
      // Use `unwrap` to get the resolved response
      const response = await googleSignIn(data).unwrap();
      // Save tokens to localStorage and state
      dispatch(setCredentials(response));
      navigate(next);
    } catch (err) {
      console.error("Sign-In Error:", err);
    }
  };
  return (
    <GoogleLogin
      logo_alignment="center"
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
