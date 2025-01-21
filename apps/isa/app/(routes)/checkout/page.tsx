'use client'

import { useEffect, useState } from "react"

import useStorage from "@repo/graphql/hooks/storage/useStorage"

const Checkout = () => {

  const {
    getItem
  } = useStorage();

  const [formD, setFormD] = useState(null)

  useEffect(() => {
    const formData = getItem('form', 'session');

    if (formData)
      setFormD(JSON.parse(formData))
  }, [])

  return (
    <div>
      {
        formD &&
        <pre>
          {JSON.stringify(formD, null, 2)}
        </pre>
      }
    </div>
  )
}

export default Checkout