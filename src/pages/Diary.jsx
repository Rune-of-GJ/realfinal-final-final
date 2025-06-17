import { useParams, useNavigate} from "react-router-dom"
import useDiary from "../hooks/useDiary"
import Button from "../components/Button"
import Header from "../components/Header"
import Viewer from "../components/Viewer"
import { getFormattedDate } from "../utils"

const Diary = () => {
    const {id} = useParams()
    const data = useDiary(id)
    const navigate = useNavigate()

    const goBack = () => {
        navigate (-1)
    }
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    if(!data) {
        return <div>데이타를 불러오는 중입니다.</div>
    } else {
        const {date, emotionId, content} = data
        const title = `${getFormattedDate(new Date(Number(date)))}의 기록`
        return (
            <div>
                <Header title = {title} leftChild ={<Button text={"뒤로가기"} onClick={goBack} />}  rightChild = {<Button text={"수정하기"} onClick={goEdit} />}></Header>
                <Viewer content={content} emotionId={emotionId} />
            </div>
        )
    }
}

export default Diary