import React from "react"

const Batch = (props) => {
    const selectTheBatch = (batch, pname) => {
        props.selectBatch(batch, pname)
    }
    return (
        <td>{
            props.batches.length > 1 ?
                (<select name="Batch"
                    style={{ width: '100px', overflow: 'hidden', textAlign: 'center' }}
                    onChange={(e) =>
                        selectTheBatch(e.target.value, props.prodName)
                    }
                >
                    <option value="none" selected hidden > All Batches</option>
                    {props.batches.map((arr, ind) => (
                        <option
                            value={arr[2] + '-' + ind}
                        >{arr[2]}</option>
                    ))}
                </select>) :
                (<p>{props.batches[0][2]}</p>)
        }
        </td>
    )
}

export default Batch;