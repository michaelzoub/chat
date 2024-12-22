"use client"
import { darkModeAtom } from "../components/navbar"
import { useAtom } from "jotai"
import { useEffect, useState, useRef } from "react"
import Navbar from "../components/navbar"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { opened } from "../components/navbar"
import { girls, characters } from "../data/aigirls"
import Image from "next/image"

const preview = false

const testData = [
    {
        id: 1,
        message: preview ? "Hey!" : "Hey cutie! How are you?",
        role: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})
    },
    {
        id: 2,
        message: preview ? "Hey! I can respond in text or send you a voice message! Just select your preferred method at the top right of the chat box!" : "Hey lovely! I can respond in text or send you a voice message! Just select your preferred method at the top right of the chat box! ;)",
        role: "assistant",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
]

export default function Page() {
    const [darkMode] = useAtom(darkModeAtom)
    const [open] = useAtom(opened)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(testData)
    const url = new URL(window.location.href)
    const [width, setWidth] = useState<boolean>(true)
    const [images, setImages] = useState<string[]>([])
    const [description, setDescription] = useState("")
    const [voice, setVoice] = useState<string>("")
    const [type, setType] = useState<string>("text")
    const [age, setAge] = useState<number>(0)
    const [boobs, setBoobs] = useState<string>("")
    const [speak, setSpeak] = useState<string>("")

    const chatRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    const urlName = window.location.pathname.slice(1)
  
    useEffect(() => {
        if (window.innerWidth < 780) {
          setWidth(true)
        } else {
          setWidth(false)
        }
      }, [])

    useEffect(() => {
        const path = window.location.pathname.slice(1);
        (preview ? characters : girls).forEach((e) => {
            if (e.name === path) {
                setImages(e.images)
                setDescription(e.description)
                setVoice(e.voice)
                setAge(e.age)
                setBoobs(e.boobs)
                setSpeak(e.speak)
            }
        })
        console.log(images)
        console.log(url)
    }, [])

    useEffect(() => {
        const adjustHeight = () => {
          document.documentElement.style.setProperty(
            "height",
            `${window.innerHeight}px`
          );
        };
      
        window.addEventListener("resize", adjustHeight);
        return () => window.removeEventListener("resize", adjustHeight);
      }, [])

    async function sendToAi(message: string, speak: string) {
        const response = await fetch("/api/sendtoai", {
            method: "POST",
            body: JSON.stringify({ message: message, name: urlName, description: description, voice: voice, type: type, speak: speak })
        })
        console.log("I'm here")

        if (type == "text") {
            const body = await response.json()
            console.log("body boolean: ", body.response)
            setMessages((prev) => [...prev, 
                {
                    id: messages.length + 2,
                    message: body.response,
                    role: "assistant",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ])
        } else {
            console.log("Audio part.")
            const audio = await response.blob()
            const audioUrl = URL.createObjectURL(audio)
            const audioPlayer = audioRef.current as HTMLAudioElement
            audioPlayer.src = audioUrl
            setMessages((prev) => [...prev, 
                {
                    id: messages.length + 2,
                    message: "🎤︎",
                    role: "assistant",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ])
            audioPlayer?.play()
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>, message: string) {
        if ("key" in e && e.key !== "Enter") {
            return
        }
        e.preventDefault()
        console.log(message)
        setMessage("")
        setMessages((prev) => [
            ...prev,
            {
                id: messages.length + 1,
                message: message,
                role: "user",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ])
        await sendToAi(message, speak)

    }

    async function enterEvent(e: React.KeyboardEvent<HTMLTextAreaElement>, message: string) {
        if (e.key == "Enter") {
        e.preventDefault()
        console.log(message)
        setMessage("")
        setMessages((prev) => [
            ...prev,
            {
                id: messages.length + 1,
                message: message,
                role: "user",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ])
        await sendToAi(message, speak)
    }
    }

    useEffect(() => {
        const scrollToBottom = setTimeout(() => {
            chatRef.current?.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: "smooth"
            });
        }, 100);

        return () => clearTimeout(scrollToBottom);
    }, [messages]);

  return (
    <AnimatePresence mode='wait'>
    <motion.main className={`w-full min-h-[100dvh] overflow-scroll md:h-screen overflow- ${darkMode ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"}`}>
        <Navbar></Navbar>
        <audio src="" ref={audioRef}></audio>
        <motion.ul className={`z-[10] fixed min-h-screen inset-0 px-2 text-md pt-[60px] start-0 flex flex-col gap-2 border-[1px] overflow-hidden ${darkMode ? "bg-neutral-800 border-neutral-500" : "bg-neutral-200 border-neutral-300"}`}
          animate={{
            width: open ? (width ? "100%" : "300px") : "60px",
            opacity: width ? (open ? 1 : 0) : 1,
            //visibility: width ? (open ? "visible" : "hidden") : "visible",
          }}
          initial={{ opacity: width ? 0 : 1, width: open ? "300px" : "60px"}}
        >
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row items-center gap-3 ${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>Twitter</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md  flex gap-3 ${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center text-center items-center my-auto">
            <h1 className="flex justify-center text-sm w-[24px] h-[24px] font-semibold my-auto">CA</h1>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>DexScreener</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row gap-3 ${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M22.05 2.53l-20 7.92c-1.37.54-1.36 1.31-.25 1.65l5.13 1.6 11.81-7.45c.56-.34 1.07-.15.65.22l-9.57 8.63-.36 5.41c.53 0 .77-.24 1.07-.53l2.57-2.5 5.35 3.95c.99.54 1.69.26 1.94-.91l3.51-16.51c.36-1.43-.52-2.08-1.85-1.48z"/>
          </svg>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>Telegram</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row gap-3 ${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`${darkMode ? "" : "invert"}`} xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="white"/>
        </svg>
          </div>
          <h1 className={`${open ? "text-lg" : "hidden"}`}>GitHub</h1>
        </Link>
        <Link href="" className={`w-full h-10 items-center px-2 transition ease-in-out rounded-md flex flex-row gap-3 ${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`}>
          <div className="flex justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${darkMode ? "invert" : ""}`} xmlns="http://www.w3.org/2000/svg">
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
        <div className="mx-auto w-full md:w-[75%] h-fit md:h-[80%] flex flex-col md:flex-row items-center justify-center gap-4">
            <div className={`mt-20 md:mt-[160px] w-[90%] md:w-[50%] h-fit md:h-full rounded-md divide-y-[1px] flex flex-col justify- ${
                darkMode ? "bg-neutral-800 divide-neutral-700 text-neutral-400" : "bg-neutral-200 divide-neutral-300 text-neutral-600"
            }`}>
                <div className="grid grid-cols-2 gap-4 p-6 items-center justify-center">
                    {
                        images.map((e) => 
                            <motion.div className="aspect-square relative overflow-hidden rounded-lg" key={e} 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileTap={{ scale: 1.04 }}
                            transition={{
                                delay: 0.1,
                                type: "spring",
                                stiffness: 350,
                                damping: 20
                            }}>
                                <Image 
                                    className="object-cover"
                                    src={e} 
                                    alt="Profile image 2"
                                    fill
                                    sizes="(max-width: 768px) 45vw, 25vw"
                                    priority
                                    quality={100}
                                />
                            </motion.div>
                        )
                    }
                </div>
                <div className="p-6 flex flex-col h-fit">
                    <p>Characteristics</p>
                    <div className="mt-2 p-2 rounded-md">Age: {age}</div>
                    <div className="p-2 rounded-md">{preview ? "Processing speed:" : "Boobs:"} {boobs}</div>
                </div>
                <div className="items-center justify-end p-6 my-auto overflow-y-auto scrollbar-hide">
                    <p className="text-lg md:text-lg text-left self-end">
                        {description}
                    </p>
                </div>
            </div>
            <div className={`mb-4 md:mb-0 divide-y-[1px] mt-0 md:mt-[160px] w-[90%] md:w-[50%] h-[600px] md:h-full rounded-md ${darkMode ? "bg-neutral-800 divide-neutral-700" : "bg-neutral-200 divide-neutral-300"}`}>
                <div className={`flex items-center justify-between h-[10%] md:h-[6%] p-1 px-4 text-sm md:text-base md:p-2 md:px-4 ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                    <h1>Chat with {urlName}.</h1>
                    <div className="group relative">
                        <div className="invisible group-hover:visible absolute top-full right-0 m-2 w-[200px]">
                            <div className="flex flex-col items-center">
                                <div className={`hidden text-neutral-500`}>▼</div>
                                <div className={`-mt-1 p-2 text-xs rounded-md ${
                                    darkMode 
                                        ? "bg-neutral-700 text-neutral-200" 
                                        : "bg-neutral-300 text-neutral-700"
                                }`}>
                                    You can alternate between text and voice mode
                                </div>
                            </div>
                        </div>
                        <button className={`text-white border-[1px] border-neutral-400 p-[3px] md:p-[3px] py-[4px] text-sm rounded-full text-left w-[60px] h-fit ${
                            darkMode ? "bg-neutral-600" : "bg-neutral-500"
                        }`} onClick={() => type == "voice" ? setType("text") : setType("voice")}>
                            <motion.div 
                                className={`w-fit bg-neutral-800 rounded-full px-1 ${type == "voice" ? "text-red-500" : "text-yellow-400"}`} 
                                animate={{ translateX: type == "text" ? "1px" : "30px" }} 
                                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                            >
                                {type == "voice" ? "♬" : "✎"}
                            </motion.div>
                        </button>
                    </div>
                </div>
                <div className="overflow-y-auto gap-2 p-4 h-[76%] md:h-[82%] touch-auto scrollbar-hide" ref={chatRef}>
                    <div className="flex flex-col gap-2">
                        {
                            messages.map((item) => 
                                <div className="flex flex-col gap-2" key={item.id}>
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: 0.1,
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 20
                                    }}
                                    className={`p-2 rounded-md gap-2 w-fit max-w-[40%] ${item.message == "🎤︎" ? "" : ""} ${item.role === "user" ? `${preview ? "bg-orange-400" : "bg-blue-500"} self-end` : `${preview ? "bg-red-400" : "bg-pink-300"}`}`} 
                                >
                                    <h1 className="break-words">{item.message}</h1>
                                </motion.div>
                                <p className={`text-xs text-neutral-400 mx-2 ${item.role === "user" ? "self-end" : "self-start"}`}>{item.time}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="relative flex items-center justify-center md:h-[12%] h-[12%] px-4">
                    <form className="flex items-center justify-center w-full" onSubmit={(e) => handleSubmit(e, message)}>
                        <textarea placeholder={`Send a message to ${urlName}.`} className={`w-full rounded-md resize-none py-[10px] h-11 px-3 pr-16 scrollbar-hide  ${darkMode ? "bg-neutral-700" : "bg-neutral-300"}`} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => enterEvent(e, message)} />
                        <button className={`absolute rounded-lg text-sm right-6 p-2 bg-blue-500 ${darkMode ? "bg-neutral-" : "bg-neutral-30"}`}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    </motion.main>
    </AnimatePresence>
  )
}
