import { Webhook } from "svix";
import User from "../models/User";
import { errorHandler } from "../utils/errorHandler";

export const clerkWebhooks = async (req, res, next) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    whook.verify(payload, headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        console.warn(`Unhandled event type: ${type}`);
        break;
    }

    res
      .status(200)
      .json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    next(errorHandler(400, "Webhook verification or processing failed"));
  }
};
