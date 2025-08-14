import { initializeApp } from "firebase/app";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	//   onAuthStateChanged,
	// signOut,
	//   sendPasswordResetEmail,
	updateProfile,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAjxD5Ag9vfh_R8WKFgsdbAI4MBHwmtrLY",
	authDomain: "medreminder-d7094.firebaseapp.com",
	projectId: "medreminder-d7094",
	storageBucket: "medreminder-d7094.firebasestorage.app",
	messagingSenderId: "380632610636",
	appId: "1:380632610636:web:9bd7ca947e14654f4141e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Register user
export const registerPatient = async (
	displayName,
	userName,
	age,
	email,
	password,
	phone,
	country
) => {
	try {
		// Create user with email and password
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		// Update user profile
		await updateProfile(userCredential.user, { displayName });

		// Add user to Firestore
		await setDoc(doc(db, "users", userCredential.user.uid), {
			name: displayName,
			userName,
			age,
			email: userCredential.user.email,
			phone,
			country,
		});

		//success
		console.log(userCredential.user);
		toast.success("User registered successfully.", { position: "top-center" });

		return userCredential.user;
	} catch (error) {
		//error
		toast.error(error.message, { position: "top-center" });
		console.error("Error registering user:", error);
	}
};

export const registerDoctor = async (
	email,
	password,
	displayName,
	age,
	country,
	city,
	phone,
	gender,
	profession,
	specialty
) => {
	try {
		// Create user with email and password
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		// Update user profile
		await updateProfile(userCredential.user, { displayName });

		// Add user to Firestore
		await setDoc(doc(db, "users", userCredential.user.uid), {
			email: userCredential.user.email,
			name: displayName,
			age,
			country,
			city,
			phone,
			gender,
			profession,
			specialty,
		});

		//success
		console.log(userCredential.user);
		toast.success("User registered successfully.", { position: "top-center" });

		return userCredential.user;
	} catch (error) {
		//error
		toast.error(error.message, { position: "top-center" });
		console.error("Error registering user:", error);
	}
};

// Sign in user
export const signInUser = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		toast.success("User registered successfully.", { position: "top-center" });
		console.log(userCredential.user);
		return userCredential.user;
	} catch (error) {
		toast.error(error.message, { position: "top-center" });
		console.error("Error registering user:", error);
	}
};

// get user data
export const fetchUserData = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			unsubscribe();
			if (!user) return reject(new Error("No authenticated user"));

			try {
				const docSnap = await getDoc(doc(db, "users", user.uid));
				if (docSnap.exists()) {
					console.log(docSnap.data());
					resolve(docSnap.data());
				} else {
					reject(new Error("User document not found"));
				}
			} catch (err) {
				reject(err);
			}
		}, reject);
	});
};

//loader for react router in profile
export async function profileLoader() {
	const user = auth.currentUser;
	if (!user) {
		throw new Response("Unauthorized", { status: 401 });
	}

	const docRef = doc(db, "users", user.uid);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		throw new Response("User data not found", { status: 404 });
	}

	return docSnap.data();
}

export async function logout() {
	try {
		await auth.signOut();
		console.log("Logged out successfully");
	} catch (error) {
		console.log("Error logging out:", error.message);
	}
}
