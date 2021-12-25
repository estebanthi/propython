import React, {useRef, useState} from 'react';
import {submitUser} from "../services";
import EmailIcon from '@mui/icons-material/Email';
import Link from "next/link"
import ContactForm from "./ContactForm";

const Contact = () => {




    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h1 className="text-xl mb-8 font-semibold border-b pb-4">Contact</h1>
            <div className="flex flex-col">
                <div className="flex">
                    <EmailIcon />
                    <Link href="mailto:contact@propython.fr">
                        <span className="text-blue-700 cursor-pointer ml-2">contact@propython.fr</span>
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <ContactForm />
            </div>
        </div>

    );
};

export default Contact;