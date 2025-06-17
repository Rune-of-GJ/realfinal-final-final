import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import useDiary from "../hooks/useDiary"
import Button from "../components/button"
import Header from "../components/Header"
import Editor from "../components/Editor"
import { DiaryDispatchContext } from "../App"

const Edit = () => {
    const {id} = useParams()
    const data = useDiary(id)
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext)
    const navigate = useNavigate()

    const onClickDelete = () =>{
        if(window.confirm("삭제하시겠습니까?")) {
            onDelete(id)
            navigate("/", {replace:true})
        }
    } 
    const onSubmit = (data)=>{
        if(window.confirm("수정하시겠습니까?")) {
            const {date, content, emotionId} = data
            onUpdate(id, date, content, emotionId)
            navigate("/", {replace:true})
        }
    }

    
    const goBack = () => {
        navigate(-1)
    }
    
    if (!data) {
        return (
            <div>
                일기를 불러오는 중입니다.
            </div>
        )
    } else {
        return (
            <div>
                <Header title={"일기 수정하기"} leftChild={<Button text={"뒤로가기"} onClick={goBack} />}
                rightChild={<Button type={"negative"} text={"삭제하기"} onClick={onClickDelete} />} />
                <Editor initData={data} onSubmit={onSubmit} />
            </div>
        )   
    }
}

export default Edit