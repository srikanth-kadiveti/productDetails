import React from 'react';

const Free = (props) => {
    return (
        props.prodName in props.selectedBatches ? // check is batch there in currentSelectedBatchList?
            <td>
                {props.batches[Number(props.selectedBatches[props.prodName].split("-")[1])][5]
                }
            </td> :
            <td>
                {props.batches.reduce((min, item) => min = min < Math.floor(item[4] === 0 ? 0 : item[5] / item[4]) ? min : Math.floor(item[4] === 0 ? 0 : item[5] / item[4]), 0)}
            </td>
    )
}

export default Free;
