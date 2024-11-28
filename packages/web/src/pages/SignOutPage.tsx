import { SignOutButton } from "../components/SignOutButton"
import { SignOutWithGoogleButton } from "../components/SignOutWithGoogleButton"

export const SignOutPage = () => {
  return (
    <div>
      <h1>Sign Out</h1>
      <SignOutButton />
      <SignOutWithGoogleButton />
    </div>
  )
}