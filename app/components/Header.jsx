import React from "react";
import Link from "next/link";

function Header(){
    return(
        <>
        <div className="todo-header bg-orange-600 p-3">
            <ul className="flex items-center gap-2 text-white">
                <li><Link href="/">Tasks</Link></li>
                <li><Link href="/users">Users</Link></li>
            </ul>
        </div>
        </>
        
    )
}

export default Header;