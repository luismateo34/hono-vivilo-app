import * as z from "zod";
/*
 {
 "id": 12345,
 "live_mode": true,
 "type": "payment",
 "date_created": "2015-03-25T10:04:58.396-04:00",
 "user_id": 44444,
 "api_version": "v1",
 "action": "payment.created",
 "data": {
     "id": "999999999"
 }
}
 */

export const paymentWebhook = z.object({
  id: z.number(),
  live_mode: z.boolean(),
  type: z.string(),
  date_created: z.string(),
  user_id: z.number(),
  api_version: z.string(),
  action: z.string(),
  data: z.object({
    id: z.string(),
  }),
});
