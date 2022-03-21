import React from "react";

const Stock = (props) => {
    return (
        props.prodName in props.selectedBatches ? // check is batch there in currentSelectedBatchList?
            <td>
                {props.batches[Number(props.selectedBatches[props.prodName].split("-")[1])][3]
                }
            </td> :
            <td>
                {props.batches.reduce((total, item) => total + item[3], 0)
                }
            </td>
    )
};

export default Stock;