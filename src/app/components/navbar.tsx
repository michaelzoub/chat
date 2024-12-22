"use client"
import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import Link from "next/link"

export const darkModeAtom = atom(true)
export const opened = atom(false)
export const modal = atom(false)

export default function Navbar() {

    const [dark, setDark] = useAtom(darkModeAtom)
    const [open, setOpen] = useAtom(opened)
    const [modaled, setModaled] = useAtom(modal)

    useEffect(() => {
        console.log(modaled)
    }, [])

    return (
        <header className={`fixed z-[100] w-full h-[50px] flex flex-row justify-between justify-end items-center border-b-[1px] ${dark ? "bg-neutral-900 text-white border-neutral-500" : "bg-neutral-100 text-black border-neutral-300"}`}>
            <div className="flex flex-row items-center gap-6">
                <button className={`transition ease-in-out w-[60px] h-[50px] border-r-[1px] ${dark ? "bg-neutral-800 border-neutral-500" : "bg-neutral-200 border-neutral-300"}`} onClick={() => setOpen((e) => !e)}>{open? "⨉" : "☰"}</button>
                <Link href="/" className="text-2xl font-semibold text-stone-400">EcchiAI</Link>
                <button className="hidden p-2 bg-pink-400 rounded-md text-sm border-[0px] border-pink-600" onClick={() => setModaled(true)}>Connect wallet</button>
            </div>
            <button className={`h-full w-14 border-l-[1px] transition ease-in-out ${dark ? "border-neutral-500" : "border-neutral-300"}`} onClick={() => setDark((e) => !e)}>
                {
                    dark ? "☾" : "☀︎"
                }
            </button>
        </header>
    )
}