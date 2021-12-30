import {SignUp} from "@clerk/nextjs";

export default function SignInPage() {
    return <SignUp path="/sign-up" routing="path" />
}