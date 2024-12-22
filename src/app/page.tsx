"use client"
import Image from "next/image";
import Navbar from "./components/navbar";
import { girls, characters } from "./data/aigirls";
import { darkModeAtom } from "./components/navbar";
import { opened } from "./components/navbar";
import { modal } from "./components/navbar";
import { useAtom } from "jotai";
import Link from "next/link";
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react";

const preview = true

export default function Home() {

  const [dark] = useAtom(darkModeAtom)
  const [open] = useAtom(opened)
  const [width, setWidth] = useState<boolean>(true)
  const [modalConnect, setModalConnect] = useAtom(modal)

  const widthRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.innerWidth < 780) {
      setWidth(true)
    } else {
      setWidth(false)
    }
  }, [])

  return (
    <motion.main className={`w-full min-h-screen flex flex-col items-center ${dark ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"}`} ref={widthRef}>
      <Navbar preview={preview}></Navbar>
      <div className={`w-full h-screen backdrop-blur flex flex-col justify-center items-center transition delay-300 ${modalConnect ? "visible" : "hidden"}`}>
        <motion.div className="w-[300px] h-[250px] bg-neutral-700 rounded-md shadow-inner border-[1px] border-neutral-800 p-4 flex flex-col gap-2 text-zinc-400"
          animate={{
            scale: modalConnect ? 1.0 : 0.75,
            opacity: modalConnect ? 1.0 : 0,
            rotate: modalConnect ? 0 : 0,  
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
            delay: 0.15
          }}
        >
          <div className="flex flex-row justify-between">
            <h1 className="text-neutral-100 text-lg">Connect wallet</h1>
            <button className="text-xs p-2 px-3 rounded-md transition ease-in-out delay-150 hover:bg-neutral-800" onClick={() => setModalConnect(false)}>✖</button>
          </div>
          <div className="flex flex-col gap-1 mt-6">
            <h1 className="text-sm">Select a newtork</h1>
            <select className="bg-neutral-600 rounded-md w-full" name="">
              <option className="bg-neutral-600" value="solana">Solana</option>
            </select>
          </div>
          <div>
            <h1 className="text-sm mt-4">Select a wallet</h1>

          </div>
        </motion.div>
      </div>
      <motion.ul className={`z-[10] fixed min-h-screen inset-0 px-2 text-md pt-[60px] start-0 flex flex-col gap-2 border-[1px] overflow-hidden ${dark ? "bg-neutral-800 border-neutral-500" : "bg-neutral-200 border-neutral-300"}`}
          animate={{
            width: open ? (width ? "100%" : "300px") : "60px",
            opacity: width ? (open ? 1 : 0) : 1,
            //visibility: width ? (open ? "visible" : "hidden") : "visible",
          }}
          initial={{ opacity: width ? 0 : 1, width: open ? "300px" : "60px"}}
        >
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row items-center gap-3 ${dark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>Twitter</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md  flex gap-3 ${dark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center text-center items-center my-auto">
            <h1 className="flex justify-center text-sm w-[24px] h-[24px] font-semibold my-auto">CA</h1>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>DexScreener</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row gap-3 ${dark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M22.05 2.53l-20 7.92c-1.37.54-1.36 1.31-.25 1.65l5.13 1.6 11.81-7.45c.56-.34 1.07-.15.65.22l-9.57 8.63-.36 5.41c.53 0 .77-.24 1.07-.53l2.57-2.5 5.35 3.95c.99.54 1.69.26 1.94-.91l3.51-16.51c.36-1.43-.52-2.08-1.85-1.48z"/>
          </svg>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>Telegram</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row gap-3 ${dark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`${dark ? "" : "invert"}`} xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="white"/>
        </svg>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>GitHub</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row gap-3 ${dark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${dark ? "invert" : ""}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 13H8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17H8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 9H9H8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>Docs</h1>
        </Link>
      </motion.ul >
      <div className={`flex w-full h-[300px] mt-[50px] items-center justify-center items-center ${preview ? "bg-[url('https://cdn.discordapp.com/attachments/976997500349186119/1320170540933058703/kafkaj_1980_x_800_space_landscape_In_the_style_of_Moebius_the_a_be8a0df1-18cf-4f16-87c5-68818161ae0b.png?ex=6768a020&is=67674ea0&hm=93bc8a6adae98220b9be613534b048311e041221c22eea658b44c1f327288faf&')]" : "bg-[url('/bg.jpeg')]"} bg-contain bg-cover bg-no-repeat bg-center ${dark ? "bg-neutral- text-white" : "bg-neutral- text-white"}`}>
          <div className={`w-full h-full flex items-center justify-center inset-0 ${preview ? "header-background-preview bg-neutral-900/10" : "header-background bg-neutral-900/70"}`}>
          <h1 className="w-[400px] text-4xl sm:text-4xl font-semibold text-center">
         { preview ? <div className="flex flex-col w-fit w-[270px] gap-4"><span className="mx-auto w-fit self-left text-neutral-300 text-xs p-[4px] px-[10px] rounded-xl bg-neutral-600">AI CHAT</span> DISCOVER THE FUTURE.</div> : <div><span className="text-pink-400">AI HENTAI</span> MEMECOIN BY ECCHI</div> }
         <div className="hidden text-[11px] font-medium text-neutral-300">Experience the next generation of AI communication with our advanced agents.</div>
          </h1>
          </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="w-fit text-xl sm:text-2xl font-semibold my-8">{preview ? "MEET OUR AI AGENTS" : "MEET OUR AI HENTAI AGENTS"}</h1>
        <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-3 gap-6 w-full">
          {
            (preview ? characters : girls)?.map((e) => 
              <Link href={`${e.name == "Mika" ? "" : `/${e.name}`}`} key={e.name}>
                <motion.div className="mx-auto h-[500px] w-[300px] md:w-[350px] flex flex-col justify-between relative text-white rounded-md gradient-overlay"
                  whileTap={{ scale: 1.04 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 },
                    
                    //border: "1px solid red"
                  }}
                >
                  <div className={`${e.name == "Mika" ? "hidden" : "flex flex-row justify-between w-full z-[1]"}`}>
                    <div className="p-[4px] px-3 bg-red-500 text-white rounded-md h-fit m-2 font- text-sm shadow-sm shadow-red-500/50">● Live</div>
                    <Link className="end-0 m-2 bg-neutral- px-3 py-2 rounded-full transition ease-in-out delay-150 hover:bg-neutral-900 text-md" href={e.name}>✉</Link>
                  </div>
                  <div className={`${e.name == "Mika" ? "w-fit h-fit p-2 px-3 rounded-md bg-neutral-600 font- text-sm m-2 z-[1]" : "hidden"}`}>Beta testing</div>
                  <div className={`z-[1] text-xl font-semibold text-neutral-300 ${e.name == "Mika" ? "text-center" : "hidden"}`}></div>
                  <h1 className={`${e.name == "Mika" ? "opacity-0" : "z-[1] m-2 text-2xl font-semibold"}`}>{e.name}</h1>
                  <Image className={`${e.name == "Mika" ? "bg-neutral-800/10 rounded-md blur-sm" : "z-[0] rounded-md"}`} layout="fill" objectFit="cover" src={e.image} alt=""></Image>
                </motion.div>
              </Link>
            )
          }
        </div>
      </div>
    </motion.main>
  );
}
