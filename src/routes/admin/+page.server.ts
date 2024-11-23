// Copyright (c) 2024 Adwaith
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import type { PageServerLoad } from "./$types";
import { collection, getDocs } from "firebase/firestore";
import { db } from '$lib/firebase';

export const load =  (async () => {
  
  type Data = {
    id: any,
    name: string,
    of: string,
    deadline: string,
    author: string,
    type: string
  }[]

  let items:Data = []
  const querySnapshot = await getDocs(collection(db, "events"));
  querySnapshot.forEach((doc) => {
    if (!doc.exists()) console.error("Event documents could not be fetched");
    const data = doc.data();
    let deadline = data.deadline;
    if (deadline && deadline.toDate) {
      deadline = deadline.toDate().getTime();
    } else if (deadline instanceof Date) {
      deadline = deadline.getTime();
    } else if (typeof deadline === 'number') {
      deadline = new Date(deadline).getTime();
    }
    items.push({ 
      id: doc.id, 
      name: data.name, 
      of: data.of, 
      deadline, 
      author: data.author, 
      type: data.type 
    });
  });
  
  return { items }

}) satisfies PageServerLoad;
