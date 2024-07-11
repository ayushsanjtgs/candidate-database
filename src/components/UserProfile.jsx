import React, { useEffect, useState } from "react";
import { storage, firestore, auth } from "../helpers/firebase";
import Loader from "./common/Loader";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem("imageUrl") || ""
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("uid") || "";
        console.log(userId);
        const docRef = doc(firestore, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const userData = docSnap.data();
          setName(userData.name || "");
          setDesignation(userData.designation || "");
          setImageUrl(userData.imageUrl || "");
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = imageUrl;

    try {
      // Upload image to Firebase Storage if an image is selected
      if (image?.name) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        url = await getDownloadURL(imageRef);
        setImageUrl(url);
        localStorage.setItem("imageUrl", url);
      }

      // Get userId from localStorage
      const userId = localStorage.getItem("uid");

      // Update Firestore document for the user
      await setDoc(doc(firestore, "users", userId), {
        name,
        designation,
        imageUrl: url,
      });

      toast.success("Updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <img
        src={
          imageUrl ||
          "https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI"
        }
        alt="Profile"
        className="w-1/2 h-15 rounded-3xl mb-4"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Profile Image:</label>
          <input type="file" onChange={handleImageChange} className="w-full" />
        </div>
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Designation:</label>
          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
