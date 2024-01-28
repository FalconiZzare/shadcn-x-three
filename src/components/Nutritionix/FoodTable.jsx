import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Card, CardTitle } from "@/components/ui/card.jsx";
import { Separator } from "@/components/ui/separator.jsx";

const FoodTable = ({ foods, avatarFallback }) => {
  const nutrientTotals = foods.reduce(
    (totals, food) => {
      totals.Calories += food.nf_calories;
      totals.Fat += food.nf_total_fat;
      totals.Cholesterol += food.nf_cholesterol;
      totals.Sodium += food.nf_sodium;
      totals.Carbohydrates += food.nf_total_carbohydrate;
      totals.Protein += food.nf_protein;
      totals.Phosphorus += food.nf_p;
      totals.Potassium += food.nf_potassium;
      return totals;
    },
    {
      Calories: 0,
      Fat: 0,
      Cholesterol: 0,
      Sodium: 0,
      Carbohydrates: 0,
      Protein: 0,
      Phosphorus: 0,
      Potassium: 0
    }
  );

  return (
    foods.length > 0 && (
      <div className={"mx-8 flex w-full flex-row items-start justify-center gap-14"}>
        <div className={"w-[900px] rounded-lg border"}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Food</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.map((food, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={food.photo.thumb} alt={food.food_name} />
                      <AvatarFallback>{avatarFallback(food.food_name)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{food.serving_qty}</TableCell>
                  <TableCell>{food.serving_unit}</TableCell>
                  <TableCell>{food.food_name}</TableCell>
                  <TableCell>{food.nf_calories}</TableCell>
                  <TableCell>{`${food.serving_weight_grams} g`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Card className={"w-2/12 p-4"}>
          <CardTitle className={"mb-4"}>Nutrition Facts</CardTitle>
          <div className={"flex flex-col gap-3"}>
            {Object.keys(nutrientTotals)
              .filter((nutrient) => nutrient !== "Phosphorus" && nutrient !== "Potassium")
              .map((item, index) => (
                <div
                  key={index}
                  className={`
                  ${item === "Calories" ? "text-lg" : "text-sm"} 
                  flex w-full flex-row items-center justify-between
                  `}
                >
                  <p>{item}</p>
                  <p>{nutrientTotals[item]}</p>
                </div>
              ))}
            <Separator />
            <div className={"flex w-full flex-col gap-3"}>
              <h2 className={"font text-lg"}>Micronutrients</h2>
              {["Phosphorus", "Potassium"].map((item, index) => (
                <div
                  key={index}
                  className={"flex w-full flex-row items-center justify-between text-sm"}
                >
                  <p>{item}</p>
                  <p>{nutrientTotals[item]}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

FoodTable.propTypes = {
  foods: PropTypes.array.isRequired,
  avatarFallback: PropTypes.func.isRequired
};

export default FoodTable;
