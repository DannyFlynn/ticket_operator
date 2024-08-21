"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'

const NavLinks = () => {

    const pathname = usePathname()
    console.log(pathname)

    const [links, setLinks] = useState([
        { id: 1, label: "Users", link: "/users", active: false},
        { id: 2,label: "Tickets", link: "/", active: false},
        { id: 3, label: "Create", link: "/createticket", active: false}
      ])


    useEffect(() => {
       

            setLinks(links.map((item, id) => {
                if(item.link === pathname){
                    return {...item, active: true}
                } else {
                    return {...item, active: false}
                }
            }))
      
     

    }, [])

 

      const activeLink = (id: number) => {
        setLinks(links.map((item) => {
            if(item.id === id){
                return {...item, active: true}
            } else {
                return {...item, active: false}
            }
        }))
      }

  return (
    <>
         {links.map(link => (
          <Link key={link.label} href={link.link} className={`px-2 lg:mr-10 ${link.active ? "border-b-4" : "border-none"}`} onClick={() => activeLink(link.id)}>{link.label}</Link>
        ))}
    </>
  )
}

export default NavLinks
