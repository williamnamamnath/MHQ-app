import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {

  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    } else {
      try {
        return JSON.parse(jsonValue) as T;
      } catch {
        console.log("Error parsing the data.");
        return JSON.parse(jsonValue)
      }
    }
  })


  useEffect(() => {
    if (value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value))
    } else {
        localStorage.removeItem(key)
    }
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}