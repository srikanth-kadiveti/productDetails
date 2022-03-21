import '../App.css';
import {useState,useEffect} from 'react'

const Table=(props)=>{

 const [selectedBatches,setSelectedBatches]=useState({})

useEffect(()=>{
    console.log("changed the pagenat..")
    // setSelectedBatches({})
    // console.log(props.currentPage)
},[props.currentPage])
useEffect(()=>{
    console.log("changed the pagenat..")
    // setSelectedBatches({})
    console.log(selectedBatches)
},[selectedBatches])

  const selectBatch=(batchValue,prodName)=>{
        console.log("slected batch called")
        console.log(prodName,batchValue) /// need to create the state   
        setSelectedBatches({...selectedBatches,[prodName]:batchValue}
        )     
      } 
      const requiredDateFormat=(InputDate)=>{
        let  date = new Date(InputDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        let temp = [day, mnth, date.getFullYear()].join("-")
        return temp;
       }    
return(
<table>
        <tr>
          <th>S.NO.</th>
          <th>Product Name</th>
          <th>Batch</th>
          <th>Stock</th>
          <th>Deal</th>
          <th>Free</th>
          <th>MRP</th>
          <th>Rate</th>
          <th>Date</th>
        </tr>
        {props.currentPage.map((prodName,sNo) => {
          let batches=props.getBatches(prodName);
          return (
          <tr>
            <td>{sNo+1}</td>
            <td>{prodName}</td>
            <td>
            {/* {props.getBatches(prodName).length>1?   */}
              {batches.length>1?         
              <select name="Batch" 
              // style="width:100px; overflow:hidden"
              style={{width:'100px', overflow: 'hidden', textAlign:'center'}}
            //  id={prodName} 
                //value={prodName}
               onChange={(e)=>
                    selectBatch(e.target.value,prodName)
                }
                >
                <option value="none"  selected hidden > All Batches</option>
                {batches.map((arr,ind) => (
                    <option 
                    // key={Math.floor(Math.random() *100)+Math.floor(Math.random() *100)} 
                    value={arr[2]+'-'+ind}
                    >{arr[2]}</option>
                ))}
              </select>:
                <p>{batches[0][2]}</p>       
             }
            </td>
            {prodName in selectedBatches? // check is batch there in currentSelectedBatchList?
            <td>
            {batches[Number(selectedBatches[prodName].split("-")[1])][3]
            } 
            </td>:
            <td>{batches.reduce((total, item) => total + item[3], 0)
            }
            </td>
            }
            {prodName in selectedBatches? // check is batch there in currentSelectedBatchList?
            <td>
            {batches[Number(selectedBatches[prodName].split("-")[1])][4]
            } 
            </td>:
            <td>{batches.reduce((min, item) => min = min < Math.floor(item[4] === 0 ? 0 : item[5] / item[4]) ? min : Math.floor(item[4] === 0 ? 0 : item[5] / item[4]), 0)}
            </td>
            }
            {prodName in selectedBatches? // check is batch there in currentSelectedBatchList?
            <td>
            {batches[Number(selectedBatches[prodName].split("-")[1])][5]
            } 
            </td>:
            <td>{batches.reduce((min, item) => min = min < Math.floor(item[4] === 0 ? 0 : item[5] / item[4]) ? min : Math.floor(item[4] === 0 ? 0 : item[5] / item[4]), 0)}
            </td>
            }
             {prodName in selectedBatches? // check is batch there in currentSelectedBatchList?
            <td>
            {batches[Number(selectedBatches[prodName].split("-")[1])][7]
            } 
            </td>:
            <td>{batches.reduce((max, item) => max = max > item[6] ? max : item[6], 0)
            }
            </td>
            }
            {prodName in selectedBatches? // check is batch there in currentSelectedBatchList?
            <td>
            {batches[Number(selectedBatches[prodName].split("-")[1])][7]
            } 
            </td>:
            <td>{batches.reduce((max, item) => max = max > item[7] ? max : item[7], 0)
            }
            </td>
            }
            {prodName in selectedBatches? // check is batch there in currentSelectedBatchList?
            <td>
            {requiredDateFormat(batches[Number(selectedBatches[prodName].split("-")[1])][8])
            } 
            </td>:
             <td>{batches.reduce(function (min, item) {
              let temp =requiredDateFormat(item[8])
              min=temp<min?min:temp;
              return min;
            },'01-12-2050')
            }
            </td> 
            }
          </tr>
        )}
        )}
      </table>
)
};

export default Table;