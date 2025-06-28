import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()
  // const [copied, setCopied] = useState(false)

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator  = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%&_"
    for(let i = 1; i < length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass) 

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordGenerator()}, [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center'>Password generator</h1>
      <div clasName='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='flex-glow text-center outline-none rounded-lg py-1 px-12'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='text-white bg-blue-600 px-4 py-1 rounded-lg shrink-0'
          >
            Copy
          </button>
      </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex text-sm gap-x-1'>
              <input type="range"
              min={7}
              max={21}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length - 1}</label>
            </div>
              <div className='flex text-sm gap-x-1'>
                  <input type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  className='cursor-pointer'
                  onChange={() => {setNumberAllowed((prev) => !prev);}}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex text-sm gap-x-1'>
                  <input type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  className='cursor-pointer'
                  onChange={() => {setCharAllowed((prev) => !prev);}}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
        </div>
    </div>
    </>
  );
}

export default App;
