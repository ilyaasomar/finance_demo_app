import * as z from "zod";
export const formSchema = z.object({
  account_id: z.string().min(2),
  category_id: z.string().min(2),
  from_date: z.date(),
  to_date: z.date(),
});
