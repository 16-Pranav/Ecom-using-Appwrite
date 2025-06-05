import { Client, Databases, Users } from "node-appwrite";


// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env["APPWRITE_FUNCTION_API_ENDPOINT"])
    .setProject(process.env["APPWRITE_FUNCTION_PROJECT_ID"])
    .setKey(req.headers["x-appwrite-key"] ?? "");


  const users = new Users(client);
  const databases = new Databases(client);

  const data = req.bodyJson;

  // Add debugging to see what data is received
  log("Received data:", JSON.stringify(data, null, 2));

  try {

    const user = await databases.getDocument(
      process.env["VITE_APPWRITE_DATABASE_ID"],
      process.env["VITE_APPWRITE_USERS_COLLECTION_ID"],
      data.$id,
    );

    if (user) {
      return res.json({ message: "User already exists" });
    }
  } catch (e) {
    log("User does not exist in database. Proceed with creating the user in database.")
  }
  
  try {
    // Clean phone number by removing the + sign and any non-numeric characters
    let cleanPhone = null;
    if (data.phone) {
      cleanPhone = data.phone.replace(/\+/g, '').replace(/\D/g, ''); // Remove + and any non-digits
      // Keep as string instead of converting to integer
      log("Cleaned phone number:", cleanPhone);
    }

    // Create the userData object with all fields
    const userData = {
      name: data.name,
      email: data.email,
      phone: cleanPhone, // Use cleaned phone number as string
      // Don't store password in the database for security reasons
      // password: data.password,
    };

    // Remove undefined fields to avoid issues
    Object.keys(userData).forEach(key => {
      if (userData[key] === undefined || userData[key] === null) {
        delete userData[key];
      }
    });

    log("Creating user with data:", JSON.stringify(userData, null, 2));

    // Use the userData object instead of just {name: data.name}
    await databases.createDocument(
      process.env["VITE_APPWRITE_DATABASE_ID"],
      process.env["VITE_APPWRITE_USERS_COLLECTION_ID"],
      data.$id,
      userData  // <-- This is the key change!
    );
    
    log("User created successfully");
    return res.json({ message: "User created successfully" });
  } catch (e) {
    error("Failed to create the user in the database:", e.message);
    return res.json({ message: "Failed to create the user in the database" });
  }
};