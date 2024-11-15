
import { NextResponse } from "next/server";
import {auth} from "../src/auth"
import {publicRoute,DEFAULT_LOGIN_ROUTE,authRoute} from '../src/lib/routes'


export default auth((req)=>{
    const {nextUrl}=req

    const isLoggedIn=!!req.auth;

    const userPublicRoute=publicRoute.includes(nextUrl.pathname)

    const userAuthRoute=authRoute.includes(nextUrl.pathname)

    if(userPublicRoute){
        return null
    }

    if(userAuthRoute){
        if(isLoggedIn){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_ROUTE,nextUrl))

        }

        return null
       
    }
    if(!isLoggedIn && DEFAULT_LOGIN_ROUTE){
        return NextResponse.redirect(new URL('/auth/login',nextUrl))

    }

 return null

})
export const config = {
    matcher: [
      
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }