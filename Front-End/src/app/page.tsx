"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { setCookie } from "./utils/cookieUtils"
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

import { redirect } from 'next/navigation';

export default function Home() {
  const user = useUser()  
  console.log(user)

  if (user.isLoading == true) {
    return (
      <div>Loading...</div>
    )
  } if (user.user == undefined) { 
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
      {/* Center the logo */}
      <div className="mb-4">
        {/* <Image src='/iO-logo black.svg' alt='iO-logo white' width={200} height={200} /> */}
      </div>
      <a href="/api/auth/login" className="text-center p-4 bg-BTBlue text-white rounded-lg shadow-lg hover:bg-BTBlue-dark">
        Login
      </a>
    </div>
      
    );
  } else {
    return(redirect('/Dashboard')) 
  }
}