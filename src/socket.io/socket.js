import { io } from "socket.io-client"
import { ENDPOINTS } from "../utils/axios";

const URL = ENDPOINTS;

export const socket = io(URL);