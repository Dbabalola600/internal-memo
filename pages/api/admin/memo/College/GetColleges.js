import Memo from "../../../../../model/MemoModel";
import connectMongo from "../../../../../utils/connectMongo";
import User from "../../../../../model/UserModel";






export default async function GetColleges(req, res) {
    if (req.method === "GET") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const users = await User.find()

        let MassCollege = []

        for (let i = 0; i < users.length; i++) {
            MassCollege.push(users[i].College)
        }

        const cleanStruct = [...new Set(MassCollege)]
        return res.json(cleanStruct)

    }
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');




        const { name } = JSON.parse(req.body)

        console.log(name)

        if (name === "None" ) {
            return res.status(202).json("none")
        } else {
            const memo = await Memo.find({ college: name }).sort({ createdAt: -1 })
            return res.status(200).json(memo)
        }

    }
    else {
        return res.status(400).json({
            notFound: true,
        });
    }
}


