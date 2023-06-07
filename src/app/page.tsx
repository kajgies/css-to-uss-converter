'use client';

import { useState } from 'react';
import { cssProcessor } from './convert';

export default function Home() {
  
  const [css, setCss] = useState(".text-center { text-align: center; }");
  const [output, setOutput] = useState("");
  
  const convert = async () => {
    try {
      // Process the CSS
      const result = await cssProcessor.process(css, { from: undefined });

      // Get the processed CSS
      const processedCSS = result.css;

      // Set the processed CSS in the state
      setOutput(processedCSS);
    } catch (error) {
      console.error('Error processing CSS:', error);
      setOutput('Error processing CSS: ' + error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div className="prose z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col gap-10">
          <h1 className='h1'>css to Unity uss converter</h1>
          Some information about this tool
      </div>
          <div className="flex flex-row w-full items-center justify-center gap-5">
          <div className='w-full'>
          <h2>Input Css</h2>
          <textarea className="textarea w-full min-h-[500px] textarea-bordered " defaultValue=".text-center { text-align: center; }" onChange={e => setCss(e.target.value)}></textarea>
          </div>
            <button type="submit" className="btn btn-primary" onClick={convert}>Convert</button>
            <div className='w-full'>
              <h2>Output Uss</h2>
              <textarea className="textarea w-full min-h-[500px] textarea-bordered " value={output} readOnly></textarea>
            </div>
          </div>
          <a aria-label="Github" target="_blank" href="https://github.com/kajgies/css-to-uss-converter" rel="noopener, noreferrer" className="btn btn-ghost drawer-button btn-square normal-case"><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="inline-block h-5 w-5 fill-current md:h-6 md:w-6"><path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path></svg></a>
    </main>
  )
}
