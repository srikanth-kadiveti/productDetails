import React from "react";

const ExcelDates = (props) => {
    const requiredDateFormat = (InputDate) => {
        let date = new Date(InputDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        let temp = [day, mnth, date.getFullYear()].join("-")
        return temp;
    }

    return (
        props.prodName in props.selectedBatches ? 
            <td>
                {requiredDateFormat(props.batches[Number(props.selectedBatches[props.prodName].split("-")[1])][8])
                }
            </td> :
            <td>
                {props.batches.reduce(function (min, item) {
                let temp = requiredDateFormat(item[8])
                min = temp < min ? min : temp;
                return min;
                }, '01-12-2050')
                }
            </td>
    )
}

export default ExcelDates;