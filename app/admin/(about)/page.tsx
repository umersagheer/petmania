import { redirect } from "next/navigation";
import { adminPaths } from "@/config/constants";

const AboutPage = async () => {
  return redirect(adminPaths.about);
};

export default AboutPage;
