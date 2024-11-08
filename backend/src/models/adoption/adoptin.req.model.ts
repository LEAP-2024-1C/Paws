// urchlegdsen amitdiig home, adoption page iin urchlegdah amitdiin jagsaaltaas hasaaad urchlegdsen amitdiin page uusgeed tiish ni oruulah
// user iin adopt req ni approve hiigdchvel req ni bhgui boloh, seny hiigdvel denied gej haragdah
// user iin model dotor pets gej array oruulah, dotor ni tuhain user iin amitad ni baih
// nevtersen hereglegchiin profile baih, adoption waitlist, donation uud ni haragddag

import { model, Schema } from "mongoose";

interface IAdoptReq {
  _id: Schema.Types.ObjectId;
  petId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  status?: string;
  response?: string;
  previousPetOwnership: string;
  currentPets: string;
  householdMembers: string;
  ageRanges: {
    under5: boolean;
    age5to12: boolean;
    age13to17: boolean;
    agr18plus: boolean;
  };
  created_at: Date;
  updated_at: Date;
}

const AdoptionRequestSchema = new Schema<IAdoptReq>({
  petId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "PetProfile",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: null,
  },
  response: {
    type: String,
  },
  previousPetOwnership: {
    type: String,
  },
  currentPets: {
    type: String,
  },
  householdMembers: {
    type: String,
  },
  ageRanges: {
    type: Object,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const AdoptionRequest = model("AdoptionRequest", AdoptionRequestSchema);

export default AdoptionRequest;
