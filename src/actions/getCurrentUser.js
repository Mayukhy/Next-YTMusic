
import connectDB from '../libs/connectdb'
import getSession from "./getSession";
import User from "../model/User";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    await connectDB()
    const currentUser = await User.findOne({
        email: session?.user?.email
      });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;