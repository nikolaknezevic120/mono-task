import { getDatabase, ref, onValue, push, remove, update, set } from "firebase/database";
import app from "../firebase";

export const db = getDatabase();