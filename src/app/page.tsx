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
    </main>
  )
}
