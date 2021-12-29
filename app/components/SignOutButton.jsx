import {useClerk} from "@clerk/clerk-react";
import React from "react";

const SignOutButton = () => {
    const { signOut } = useClerk();
    return (
        <button className="text-yellow-400 border-yellow-400 font-semibold cursor-pointer border-2 p-2" onClick={() => signOut()} >
            Se déconnecter
        </button>
    );
};

export default SignOutButton