// place files you want to import through the `$lib` alias in this folder.

import { db, auth } from './firebase';
import { writable } from 'svelte/store';


export { db, auth };
