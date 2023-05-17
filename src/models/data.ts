import { Schema, model, models } from "mongoose";

const dataSchema = new Schema({
    address: { type: String, required: true },
    data: { type: String, required: true },
});

// userSchema.plugin(uniqueValidator)

const Datas = models.datas || model("datas", dataSchema);

export default Datas;
