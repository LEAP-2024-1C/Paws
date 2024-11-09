import { model, Schema, Document, Types } from "mongoose";

interface Comment {
  user: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
}

interface Donations {
  description: string;
  title: string;
  images: [string];
  totalAmount: number;
  collectedDonations: [
    {
      transactionNumber: string;
      // donationId: ;
      amount: number;
      status: string;
      paymentMethod: string;
      description: string;
      userName: string;
    }
  ];
  contributors: number;
  petId: { type: Schema.Types.ObjectId; ref: "PetProfile"; required: true };
  userId: { type: Schema.Types.ObjectId; ref: "User"; required: true }; //userId? ==> userId
  status: string; //added status
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}

const DonationsSchema = new Schema<Donations>(
  {
    title: {
      type: String,
      required: [true, "Хандивын нэрийг заавал бичнэ үү."],
    },
    description: {
      type: String,
      required: [true, "Хандив цуглуулж буй зорилгоо заавал бичнэ үү."],
    },
    images: {
      type: [String],
      default: ["img"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    collectedDonations: [
      {
        transactionNumber: {
          type: String,
        },

        amount: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
        },
        paymentMethod: {
          type: String,
        },
        description: {
          type: String,
          required: true,
        },
        userName: {
          type: String,
        },
      },
    ],
    contributors: {
      type: Number,
      default: 0,
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "PetProfle", // ref: "Pets" ==> "PetProfle"
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "done"],
    },
    comments: [
      {
        _id: {
          type: Schema.Types.ObjectId,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Donations = model<Donations>("Donations", DonationsSchema);
export default Donations;
