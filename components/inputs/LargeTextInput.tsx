type MyProps = {
    title: string
    placholder?: string
}

export default function LargeTextInput(props: MyProps) {


    return (
        <div className="">

            <h1
                className="text-black text-3xl"
            >
                {props.title}
            </h1>



            <textarea
                className="w-full h-[400px] p-2 resize-y border rounded-md input input-bordered input-primary  "
                placeholder={props.placholder}
            />







        </div>
    )
}