import * as admin from "firebase-admin";
import ServiceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
  });
}

export default admin;