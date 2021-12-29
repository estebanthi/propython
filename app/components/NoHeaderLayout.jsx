import React from "react"
import Link from "next/link";


const NoHeaderLayout = ({ children }) => {
    return (
        <>
            <div className="container mx-auto px-10 mb-8">
                <div className="border-b w-full inline-block border-blue-400 py-8 flex items-center content-center justify-between">
                    <div>
                        <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            ProPython
                        </span>
                        </Link>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}

export default NoHeaderLayout