// src/lib/fetchAndSyncEvents.js
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { events } from './stores';

export const fetchAndSyncEvents = async () => {
    const eventsCollection = collection(db, 'events');

    // Fetch initial data
    const querySnapshot = await getDocs(eventsCollection);
    const initialEvents:any = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    events.set(initialEvents);

    // Set up real-time listener
    onSnapshot(eventsCollection, (snapshot) => {
        const updatedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        events.set((updatedEvents) as any);
    });
};
