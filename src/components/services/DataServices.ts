// [
//     {
//       "id": 1,
//       "question": "Vilket av dessa år var ett skottår?",
//       "options": [2002, 2004, 2006],
//       "answer": 2004
//     },
//     {
//       "id": 2,
//       "question": "Vilket land har flest öar i världen?",
//       "options": ["Filippinerna", "Kanada", "Sverige"],
//       "answer": "Sverige"
//     },
//     {
//       "id": 3,
//       "question": "Vilken är den femte planeten i vårat solsystem?",
//       "options": ["Uranus", "Jupiter", "Saturnus"],
//       "answer": "Jupiter"
//     },
//     {
//       "id": 4,
//       "question": "Vad är 53+21?",
//       "options": [77, 74, 72],
//       "answer": 74
//     },
//     {
//       "id": 5,
//       "question": "Vilken av dessa huvudstäder ligger sydligast?",
//       "options": ["Wellington", "Kapstaden", "Buenos Aires"],
//       "answer": "Wellington"
//     },
//     {
//       "id": 6,
//       "question": "Vad är kvadratroten av 121",
//       "options": [9, 10, 11],
//       "answer": 11
//     }
//   ]
import axios from "axios";
import { IQuestion } from "../interfaces/IQuestion";

export const fetchData = async () => {
  const data: IQuestion[] = await axios
    .get("./data.json")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return data;
};
