import { adminPaths } from "@/config/constants";
import { redirect } from "next/navigation";

const Contact = () => {
  redirect(`${adminPaths.numbers}`);
};

export default Contact;
