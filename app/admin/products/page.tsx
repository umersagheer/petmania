import { adminPaths } from "@/config/constants";
import { redirect } from "next/navigation";

const Product = () => {
  redirect(adminPaths.deals);
};

export default Product;
