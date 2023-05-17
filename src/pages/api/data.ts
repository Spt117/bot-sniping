import connectMongo from "@/library/mongodb";
import Datas from "@/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    connectMongo();
    console.log(req.body);

    if (req.method === "GET") {
        try {
            const datas: string[] = await Datas.find();
            res.status(200).json(datas);
        } catch (error: any) {
            res.status(500).json({ error: error });
        }
    } else if (req.method === "POST") {
        try {
            const newData = new Datas(req.body);
            if (newData.save) await newData.save();
            res.status(201).json({ message: "Data enregistrée" });
        } catch (error: any) {
            res.status(500).json({ error: error });
        }
    }
};
