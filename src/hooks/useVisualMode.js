import  { useState } from 'react'
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (el, replace = false) => {
    setMode(el)
    if (replace) {
/*       setHistory(prev => [prev[0]])
 */      const newHistory = history.slice(0, -1);
      setHistory(prev => ([ ...newHistory, el ])) 
    }
    else {
      setHistory(prev => ([ ...prev, el ]))
    }
  }
  const back = () => {
    if (history.length > 1){
      const newHistory = history.slice(0, -1);

        setHistory(newHistory)
        setMode(newHistory[newHistory.length-1])

      } 
    }

  
  return { mode, transition, back };
}
