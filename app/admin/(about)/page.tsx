import { redirect } from "next/navigation";

const AboutPage = async () => {
  redirect("/admin/about");
};

export default AboutPage;
