import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { stripe } from "../../../lib/stripe";
import admin from "../../../firebase/server";
const db = admin.firestore();

export const GET = async (req) => {
  const uid = cookies().get("session-cookie").value;
  console.log(uid);
  const url = new URL(req.url);
  const session_id = url.searchParams.get("session_id");
  console.log(session_id);

  const session = await stripe.checkout.sessions.retrieve(session_id);
  const subscription = await stripe.subscriptions.retrieve(session.subscription);

  const userRef = db.collection("users").doc(uid);
  const userData = (await userRef.get()).data() || null;

  if (session.status === 'complete' && userData) {
    await userRef.update({
      subscription: subscription.id
    });
  }

  redirect("/subscribe");
}