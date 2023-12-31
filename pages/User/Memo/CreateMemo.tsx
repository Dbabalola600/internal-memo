import { FormEventHandler, useState } from "react";
import LoggedLayout from "../../../components/Layouts/LoggedLayout";
import DropDown from "../../../components/inputs/DropDown";
import LargeTextInput from "../../../components/inputs/LargeTextInput";
import TextInput from "../../../components/inputs/TextInput";
import WYSIWYG from "../../../components/inputs/WYSIWYG";
import NavButton from "../../../components/navigation/NavButton";
import Header from "../../../components/shared/Header";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";



type Data = {
    title: string,
    mail: any
}
export default function CreateMemo() {
    const [isLoading, setLoading] = useState(false)
    const [data, SetData] = useState<Data | null>(null)
    const router = useRouter()
    const token = getCookie("NormUser")


    const Department = [
        "None",
        "Accounting",
        "Biochemistry",
        "Biological Sciences",
        "Business Administration",
        "Chemistry",
        "Computer Science",
        "Economics",
        "English",
        "Industrial Relations and Personnel Management",
        "Mass Communication",
        "Mathematics",
        "Microbiology",
        "Physics",
        "Political Science",
        "Sociology",
        "Religious Studies"
    ]

    const College = [
        "None",
        "CBAS",
        "CHMS"
    ]

    const Role = [
        "None",
        "VC",
        "DSA",
        "Dean CBAS",
        "Dean CHMS",
        "HOD Accounting",
        "HOD Biochemistry",
        "HOD Biological Sciences",
        "HOD Business Administration",
        "HOD Chemistry",
        "HOD Computer Science",
        "HOD Economics",
        "HOD English",
        "HOD Industrial Relations and Personnel Management",
        "HOD Mass Communication",
        "HOD Mathematics",
        "HOD Microbiology",
        "HOD Physics",
        "HOD Political Science",
        "HOD Sociology",
        "HOD Religious Studies"
    ]

    const create: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.currentTarget.elements as any


        const body = {
            user: token,
            type: "Raw",
            title: form.item(0).value,
            refNo: form.item(1).value,
            content: form.item(2).value,
            department: form.item(3).value,
            college: form.item(4).value,
            role: form.item(5).value
        }



        const response = await fetch("/api/user/Memo/CreateMemo", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status === 200) {
                    // router.push("/User/Memo/")
                    const data = await res.json() as Data;

                    const body2 = {
                        title: form.item(0).value,
                        mail: data.mail
                    }
                    const MailRes = await fetch("/api/mail/mail", { method: "POST", body: JSON.stringify(body2) })
                        .then(res => {
                            if (res.status === 200) {
                                router.push("/User/Memo/")
                            }
                        })
                }
            })

        setLoading(false)
    }

    const [value, setValue] = useState('');



    return (
        <LoggedLayout>
            <>
                <Header
                    title="New Memo"
                    desc=" create a memo or upload a document"
                />


                <NavButton
                    title="Upload Document"
                    uLink="/User/Memo/UploadMemo"
                />
                <form
                    onSubmit={create}
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                >
                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Title"
                            name="Title"
                            type='text'

                        />
                    </div>

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="RefNo"
                            name="RefNo"
                            type='text'

                        />
                    </div>



                    <LargeTextInput
                        title="content"

                    />






                    <div
                        className="pt-5 "
                    >
                        <label>
                            <span className="label-text text-black text-3xl">Department</span>
                            <div
                                className="text-sm text-gray-500 font-bold"
                            >
                                this indicates sending a departmental wide memo
                            </div>

                        </label>
                        <select className="select select-primary w-full ">


                            {Department.map((depart, index) => (
                                <option
                                    key={index}
                                >
                                    {depart}
                                </option>
                            ))}



                        </select>


                    </div>




                    <div className="col-span-12  md:col-span-6 ">

                        <label>
                            <span className="label-text text-black text-3xl">College</span>
                            <div
                                className="text-sm text-gray-500 font-bold"
                            >
                                this indicates sending a college wide memo
                            </div>
                        </label>
                        <select className="select select-primary w-full ">


                            {College.map((coll, index) => (
                                <option
                                    key={index}
                                >
                                    {coll}
                                </option>
                            ))}
                        </select>


                    </div>


                    <div className="col-span-12  md:col-span-6 ">

                        <label>
                            <span className="label-text text-black text-3xl">Role</span>
                            <div
                                className="text-sm text-gray-500 font-bold"
                            >
                                this indicates the specific staff recieving the memo
                            </div>
                        </label>
                        <select className="select select-primary w-full ">


                            {Role.map((role, index) => (
                                <option
                                    key={index}
                                >
                                    {role}
                                </option>
                            ))}



                        </select>


                    </div>


                    <button className="w-full btn-primary btn "
                        type="submit">
                        {isLoading ? "Loading..." : "SUBMIT"}

                    </button>


                </form>

                {/* <div
                    className="w-full py-20  text-black text-base md:text-xl"

                >

                    <NavButton
                        uLink="/"
                        title="Department"
                    />

                    <NavButton
                        uLink="/"
                        title="College"
                    />

                </div> */}





            </>

        </LoggedLayout>
    )
}