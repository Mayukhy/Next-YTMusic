'use client'
import { Button } from '@radix-ui/themes'
import React from 'react'

export default function SignInButton({socialAction}) {
  
  return (
  <Button onClick={() =>socialAction('google')} className=' rounded-3xl lg:block hidden signinbtn bg-blue-700 hover:scale-105' variant='solid' >
    Sign In
  </Button>
  )
}
