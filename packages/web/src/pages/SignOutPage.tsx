import { SignOutButton } from "../components/auth/SignOutButton"
import { SignOutWithGoogleButton } from "../components/auth/SignOutWithGoogleButton"

export const SignOutPage = () => {
  return (
    <div>
      <h1>Sign Out</h1>
      <SignOutButton />
      <SignOutWithGoogleButton />
    </div>
  )
}