import { createHmac } from "node:crypto";
import { loadEnvFile } from "node:process";
try{
loadEnvFile("./.env");
}catch{
  console.info("serverles environment file not found" )
}

/**
*@param xSignature string  - headers['x-signature']
*@param xRequestId string - headers['x-request-id']
*@param dataID string - query param related to the request URL
* */
export const webhook = (xSignature: string, xRequestId: string, dataID:string): boolean => {
  const parts: string[] = xSignature.split(",");
  // Initializing variables to store ts and hash
  let ts;
  let hash;
  // Iterate over the values to obtain ts and v1
  parts.forEach((part) => {
    // Split each part into key and value
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });
  //----------
  const secret = process.env.MP_SECRET_KEY;
  // Generate the manifest string
  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
  // Create an HMAC signature
  const hmac = createHmac("sha256", secret);
  hmac.update(manifest);
  // Obtain the hash result as a hexadecimal string
  const sha = hmac.digest("hex");
  if (sha === hash) {
    return true;
  } else {
    return false;
  }
};
