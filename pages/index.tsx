import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import TextInput from '../components/inputs/TextInput'
import Link from 'next/link'
import Header from '../components/shared/Header'
import { useRouter } from 'next/router'
import { FormEventHandler, useEffect, useState } from 'react'
import ErrMess from '../components/shared/notify/ErrMess'
import GoodMess from '../components/shared/notify/GoodMess'

const Home: NextPage = () => {


  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const [showtoast, settoast] = useState({ message: "", show: false })
  const [showtoast2, settoast2] = useState({ message: "", show: false })

  const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })


  const connect = async () => {


    setLoading(true)
    const response = await fetch("/api/connect", { method: "GET" })
      .then(res => res.json())


    setLoading(false)
  }



  useEffect(() => {
    connect()
  }, [])



  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setLoading(true)

    const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
      matricno: HTMLInputElement
    }
    const form = e.currentTarget.elements as any

    const body = {
      user: form.item(0).value,
      password: form.item(1).value,
    }



    const response = await fetch("/api/login", { method: "POST", body: JSON.stringify(body) })
      .then(res => {
        if (res.status == 200) {
          setgoodtoast({ message: " message", show: true })
          router.push("/User/DashBoard")
        }
        if (res.status == 201) {
          setgoodtoast({ message: " message", show: true })
          router.push("/Admin/DashBoard")
        }
        if (res.status == 401) {
          settoast({ message: " message", show: true })
        }
        if (res.status == 402) {
          settoast2({ message: " message", show: true })
        }
      })

    setLoading(false)

  }

  return (
    <DefaultLayout>
      <div
        className="w-full py-20   text-black text-base md:text-xl"

      >

        <div>
          <Header
            title="LOGIN"
            desc="please provide necessary details for sign in"
          />

          <div>
            Admin login -- useername: Admin101, password: password
          </div>

          <form
            className="w-full py-20 space-y-12  text-black text-base md:text-xl"
            onSubmit={
              login
            }
          >

            {showtoast2.show && <ErrMess title="Invalid user" />}

            {showtoast.show && <ErrMess title="Invalid password" />}
            {showgoodtoast.show && <GoodMess title="login successful" />}









            <div className="mx-auto  w-full ">
              <TextInput
                placeholder="User Id"
                name="User Id"
                type='text'

              />
            </div>


            <div className="mx-auto w-full ">
              <TextInput
                placeholder="Password"
                name="Password"
                type='password'
              />
            </div>




            <div className=" w-full flex justify-center space-y-6">

              <button className="w-full rounded-lg bg-primaryColour btn text-white border-none "
                type="submit">
                {isLoading ? "Loading..." : "SIGN IN"}

              </button>





            </div>




          </form>

        </div>





      </div>
    </DefaultLayout>
  )
}

export default Home
