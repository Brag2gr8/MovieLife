import React from "react"
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    console.log(error)
    
    return (
        <div className="error-page" >
        <h1>Error: {error.message}</h1>
        <pre>404 - {error.statusText}</pre>
        </div>
    )
}