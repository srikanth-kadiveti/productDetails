import React from "react";

const Rate = (props) => {
    return (
        props.prodName in props.selectedBatches ?
            <td>
                {props.batches[Number(props.selectedBatches[props.prodName].split("-")[1])][7]
                }
            </td> :
            <td>
                {props.batches.reduce((max, item) => max = max > item[7] ? max : item[7], 0)
                }
            </td>
    )
}

export default Rate;
