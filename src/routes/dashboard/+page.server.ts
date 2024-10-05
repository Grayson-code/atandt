// Copyright (c) 2024 Adwaith
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import type { PageServerLoad } from "./$types";

export const load = (() => {
    return {items: [
        {
          "id": "r8ot9idu",
          "author": "Monserrat Garcia",
          "deadline": 1729470507263,
          "name": "History Presentation",
          "of": "Math Class",
          "priorityOverride": 4,
          "special": {
            "content": "Annual sports day",
            "type": "event"
          },
          "type": "assignment"
        },
        {
          "id": "61eiohw4",
          "author": "Alice Jones",
          "deadline": 1729272300145,
          "name": "School Event",
          "of": "Math Class",
          "priorityOverride": 5,
          "special": {
            "content": "Create a painting",
            "type": "project"
          },
          "type": "tp"
        },
        {
          "id": "y2eil42q",
          "author": "John Smith",
          "deadline": 1728857599179,
          "name": "Art Exhibition",
          "of": "Art Class",
          "priorityOverride": 4,
          "special": {
            "content": "Create a painting",
            "type": "event"
          },
          "type": "assignment"
        },
        {
          "id": "uof7mat8",
          "author": "Silas Johnson",
          "deadline": 1727985174413,
          "name": "Math Assignment",
          "of": "History Class",
          "priorityOverride": 1,
          "special": {
            "content": "Complete the exercises on page 42",
            "type": "project"
          },
          "type": "tp"
        },
        {
          "id": "051oz07d",
          "author": "Jane Johnson",
          "deadline": 1729103067679,
          "name": "Music Recital",
          "of": "History Class",
          "priorityOverride": 1,
          "special": {
            "content": "Perform a musical piece",
            "type": "recital"
          },
          "type": "event"
        },
        {
          "id": "rqnlc5rl",
          "author": "Monserrat Jones",
          "deadline": 1728065819557,
          "name": "Music Recital",
          "of": "School",
          "priorityOverride": 4,
          "special": {
            "content": "Annual sports day",
            "type": "recital"
          },
          "type": "assignment"
        },
        {
          "id": "egjt3ybu",
          "author": "Bob Davis",
          "deadline": 1728796652826,
          "name": "Science Project",
          "of": "Art Class",
          "priorityOverride": 1,
          "special": {
            "content": "Build a model of the solar system",
            "type": "recital"
          },
          "type": "tp"
        },
        {
          "id": "n2u1rycx",
          "author": "Monserrat Davis",
          "deadline": 1729749636193,
          "name": "School Event",
          "of": "Art Class",
          "priorityOverride": 2,
          "special": {
            "content": "Perform a musical piece",
            "type": "presentation"
          },
          "type": "tp"
        },
        {
          "id": "xy9z8rkr",
          "author": "Abe Garcia",
          "deadline": 1728501924565,
          "name": "Science Project",
          "of": "History Class",
          "priorityOverride": 1,
          "special": {
            "content": "Complete the exercises on page 42",
            "type": "homework"
          },
          "type": "assignment"
        },
        {
          "id": "xj7ecaxb",
          "author": "Silas Williams",
          "deadline": 1728245766073,
          "name": "History Presentation",
          "of": "Music Class",
          "priorityOverride": 5,
          "special": {
            "content": "Annual sports day",
            "type": "recital"
          },
          "type": "tp"
        },
        {
          "id": "v6p2wsbh",
          "author": "Alice Garcia",
          "deadline": 1729018856902,
          "name": "Science Project",
          "of": "Music Class",
          "priorityOverride": 3,
          "special": {
            "content": "Annual sports day",
            "type": "exhibition"
          },
          "type": "note"
        },
        {
          "id": "cpb0un0n",
          "author": "Silas Williams",
          "deadline": 1730000590378,
          "name": "School Event",
          "of": "Art Class",
          "priorityOverride": 5,
          "special": {
            "content": "Build a model of the solar system",
            "type": "exhibition"
          },
          "type": "event"
        }
      ]};
}) satisfies PageServerLoad;