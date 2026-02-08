import AddCategories from "@/components/modules/Admin/AddCategories";
import AllCategories from "@/components/modules/Admin/AllCategories";

import { mealServices } from "@/Services/meals.service";



export default async function Categories() {
 
  const { data: categories } = await mealServices.getAllCategories();
  return (
    <div>
      <AddCategories />
      <AllCategories data={categories} />
    </div>
  );
}
