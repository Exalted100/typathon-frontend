import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {
  const [loginCopy, setLoginCopy] = useState("Type a ton with Typathon")
  const finalCopy = <p className='final-copy text-semibold h-screen w-2/5 bg-typathon-black text-typathon-grey text-5xl text-center pt-2 px-10 leading-normal font-bold'>Type a ton with <span className='text-typathon-green'>Typathon</span></p>

  const animatedText = <p className='login-copy text-semibold h-screen w-2/5 bg-typathon-black text-typathon-grey text-5xl text-center pt-20 px-10 leading-normal font-bold' aria-label={loginCopy}>
  {loginCopy.split("").map(function(char, index){
      const style = {"animation-delay": (1 + index / loginCopy.length) + "s"};
      return <span aria-hidden="true" key={index} style={style}>{char}</span>;
  })}
  </p>

  const [textToDisplay, setTextToDisplay] = useState(animatedText)

  useEffect(() => {
    setTimeout(() => {
      return setTextToDisplay(finalCopy)
    }, loginCopy.length * 100)
  }, [])

    return(
        <div>
          {textToDisplay}
        </div>
    );
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Typathon Login</title>
  //       <meta name="description" content="Log into your Typathon account." />
  //     </Head>
  //     <div>
  //       <p className='login-copy'><span>T</span><span>y</span><span>p</span><span>e</span><span> </span><span>a</span><span> </span><span>t</span><span>o</span><span>n</span><span> </span><span>w</span><span>i</span><span>t</span><span>h</span><span> </span><span>T</span><span>y</span><span>p</span><span>a</span><span>t</span><span>h</span><span>o</span><span>n</span></p>
  //     </div>
  //   </div>
  // )
}
