import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";


const Success = () => {


    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const {session_id} = router.query

    useEffect(async () => {
        if(!session_id) {
            return;
        }
        const data = await axios.get(`/api/payment/checkout-sessions/${session_id}`)
            .then((res) => res.status)
            .then((status) => {
                if (status == 200) {
                    return true
                }
                return false
            })
        console.log(data)
        if(data) {{
                setSuccess(true)
            }
        }
    }, [session_id]);

    return (
        <div>{success && <span>Bravo !</span>}</div>
    );
}

export default Success;