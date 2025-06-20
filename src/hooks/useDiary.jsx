import { useContext, useEffect, useState } from "react"
import {DiaryStateContext} from '../App'
import { useNavigate } from "react-router-dom"

const useDiary = (id) => {
    const data = useContext(DiaryStateContext)
    const [diary, setDiary] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id))
        if(matchDiary) setDiary(matchDiary)
        else {
            alert('없어')
            navigate("/", {replace:true})
        }
    }, [id, data, navigate])

    return diary
}

export default useDiary