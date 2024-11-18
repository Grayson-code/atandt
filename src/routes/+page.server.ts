import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { fail } from '@sveltejs/kit';

import { db } from "$lib/firebase";



export const actions = {
	// Checks if the email is already in the database, if not, adds it to the earlyaccess collection
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get("email") as string | null;
		if (!email) {
			throw new Error("Email is required");
		}
		const docRef = doc(db, "earlyaccess", email);
		let docSnap;
		try {
			docSnap = await getDoc(docRef);
		} catch (e) {
			console.log(e)
		}
		if (docSnap!.exists()) {
			return fail(400, { email, reason:"Already Exists"});
		} else {
			await setDoc(doc(db, "earlyaccess", email), {
				date: new Date().toISOString()
			  });
		}
	}
};