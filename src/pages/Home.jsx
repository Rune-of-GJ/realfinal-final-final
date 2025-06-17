import Button from "../components/button";
import Header from "../components/Header";
import DiaryList from "../components/DiaryList";

import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from "../utils";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);

    const headerTitle = `${pivotDate.getFullYear()}년
                                     ${pivotDate.getMonth() + 1}월 `

    useEffect(() => {
        if(data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp)
            )
        } else {
            setFilteredData([]);
        }
    } , [data, pivotDate])

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
    }
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
    }

    return (
        <div>
            <Header title={ headerTitle }
            leftChild={ <Button text={"<"} onClick={ onDecreaseMonth }></Button>}
            rightChild={ <Button text={">"} onClick={ onIncreaseMonth }></Button>} >
            </Header>
            <DiaryList data={filteredData} />
        </div>
    )
}

export default Home