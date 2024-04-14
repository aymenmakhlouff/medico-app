import { getDocs, collection } from 'firebase/firestore';
import { auth,DB } from '../firebase-config'; // Your Firebase configuration

export const getUser = async () => {
  try {
    const userCollectionRef = collection(DB, 'users');
    const result = await getDocs(userCollectionRef);
    const users = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })).filter((user) => user.email.toLowerCase() === auth.currentUser.email.toLowerCase());

    if (users.length === 1) {
      return users[0];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return null; // Return null or handle errors accordingly
};