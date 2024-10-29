interface ISos {
  location: string;
  image: string[];
  postedDate: Date;
  status: "active" | "saved" | "pending";
  phoneNumber: string;
}
