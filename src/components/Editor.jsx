import './Editor.css'
import { useState, useEffect, useCallback } from 'react'
import { getFormattedDate, emotionList } from '../utils'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import EmotionItem from './EmotionItem'

const Editor = ({ initData, onSubmit }) => {
const navigate = useNavigate()

    const [state, setState] = useState ({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: ""
    })

    useEffect(() => {
        if(initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date)))
            })
        }
    }, [initData])

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value
        })
    }

    const handleChangeContent = (e) => {
        setState ({
            ...state,
            content: e.target.value
        })
    }

    const handleSubmit = () => {
        onSubmit(state)
    }

    const handleOnGoBack = () => {
        navigate(-1)
    }

    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId
        }))
    }, [])

    return (
        <div className='Editor'>
            <div className='editor_section'>
                <h4>오늘의 날짜</h4>
                <div className='input_wrapper'> <input type="date" value={state.date} onChange={handleChangeDate} /> </div>
            </div>
            <div className='editor_section'>
                <h4>오늘의 감정</h4>
                <div className='input_wrapper emotion_list_wrapper'>
                    {emotionList.map((it) => (
                        <EmotionItem key={it.id} {...it} onClick={handleChangeEmotion} isSelected={state.emotionId === it.id} />
                    ))}
                </div>
            </div>
            <div className='editor_section'>
                <h4>일기</h4>
                <div className='input_wrapper'> <textarea placeholder='오늘은 어땠나요?' value={state.content} onChange={handleChangeContent} ></textarea> </div>
            </div>
            <div className='editor_section bottom_section'>
                <Button text={"취소하기"} onClick={handleOnGoBack}></Button>
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}></Button>
            </div>
            
        </div>
    )
}

export default Editor
