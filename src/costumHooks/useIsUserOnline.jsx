import { useEffect, useState } from "react"
import { useSelector } from "react-redux";


export const useIsUserOnline = (userId) => {
    const [isOnline, setIsOnline] = useState(false);

    const usersOnline = useSelector((store) => store.user.usersOnline);
    useEffect(() => {
        console.log(usersOnline, "userOnsfdkjslajfdksljfdsk")
        if (usersOnline.length > 0) {
            setIsOnline(true);
        }
    }, [usersOnline])

    // function name(params) {

    return isOnline;
}