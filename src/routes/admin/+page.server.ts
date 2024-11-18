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
  console.log(items)
  return { items }

}) satisfies PageServerLoad;

// {
//   "id": "rqnlc5rl",
//   "author": "Monserrat Jones",
//   "deadline": 1728065819557,
//   "name": "Music Recital",
//   "of": "School",
//   "priorityOverride": 4,
//   "special": {
//     "content": "Annual sports day",
//     "type": "recital"
//   },
//   "type": "assignment"
// },

// {
//   name: 'MCQ - Federalism',
//   of: 'Ragitha',
//   deadline: Timestamp { seconds: 1720981800, nanoseconds: 0 },
//   author: 'Admin',
//   type: 'note'
// },