import "./App.css"
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import New from "./pages/New"
import Edit from "./pages/Edit"
import Diary from "./pages/Diary"
import React, { useEffect, useReducer, useRef, useState } from "react"

function reducer(state, action) {
  switch(action.type) {
    case "CREATE": {
      // return [action.data, ...state]
      const newState = [action.data, ...state]
      localStorage.setItem("diary", JSON.stringify(newState))
      return newState
    }
    case "UPDATE": {
      // return state.map((it) =>
      //   String(it.id) === String(action.data.id) ? {...action.data} : it
      // )
      const newState = state.map((it) => {
        String(it.id) === String(action.data.id) ? {...action.data} : it
      })
      localStorage.setItem("diary", JSON.stringify(newState))
      return newState
    }
    case "DELETE": {
      // return state.filter((it) => String(it.id) !== String(action.targetId))
      const newState = state.filter((it) => String(it.id) !== String(action.targetId))
      localStorage.setItem("diary", JSON.stringify(newState))
      return newState
    }
    case "INIT": {
      return action.data
    }
    default: {
      return state
    }
  }
}

// const mockData = [
//   {
//     id: 0,
//     date: new Date().getTime() - 1,
//     content: "mock1",
//     emotionId: 1
//   },
//   {
//     id: 1,
//     date: new Date().getTime() - 2,
//     content: "mock2",
//     emotionId: 3
//   },
//   {
//     id: 2,
//     date: new Date().getTime() - 3,
//     content: "mock3",
//     emotionId: 5
//   },
// ]

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

function App () {
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)

  useEffect(() => {
    // dispatch({
    //   type: "INIT",
    //   data: mockData
    // })
    // setIsDataLoaded(true)

    const rawData = localStorage.getItem("diary")
    if (!rawData){
      setIsDataLoaded(true)
      return
    }
    const localData = JSON.parse(rawData)
    if (localData.length === 0) {
      setIsDataLoaded(true)
      return
    }
    localData.sort((a, b) => Number(b.id) - Number(a.id))
    idRef.current = localData[0].id + 1
    dispatch({type: "INIT", data: localData})
    setIsDataLoaded(true)
  }, [])

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type:"CREATE",
      data:{
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    })
    idRef.current += 1
  }

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type:"UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    })
  }

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId
    })
  }

  if(!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id"  element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    )
  }
}

export default App
