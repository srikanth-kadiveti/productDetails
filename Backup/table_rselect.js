import '../App.css';
import {useState,useEffect} from 'react'
import Select from 'react-select'

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
      // console.log(e.target.id,e.target.value)
      // let obj ={prodName:batchValue}
      // setSelectedBatches((prev)=>prev={...prev,obj})       

      setSelectedBatches({...selectedBatches,[prodName]:batchValue}
          // setSelectedBatches({...selectedBatches,prodName:batchValue}
      )

      // setTimeout(()=>console.log(selectedBatches),3000); 

      // setSelectedBatches((prev)=>prev.batchValue=prodName);
      // console.log(props.getBatches(prodName))
   }
     
    
return(
<table>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>mrp</th>
        </tr>
        {props.currentPage.map((prodName) => (
          <tr>
            <td>{prodName}</td>
            <td>
            <Select
                name="Batches"
                options={props.getBatches(prodName).map((arr)=>({label:arr[2],value:arr[2]}))}
                defaultValue={{ label: "All", value: '0' }}
                onChange={e => {
                  selectBatch(e.target.value,prodName)
              }}
              />
              {/* <select name="Batch" 
            //  id={prodName} 
                //value={prodName}
            //   form="Batch
               onChange={(e)=>
                    selectBatch(e.target.value,prodName)
                //    e.preventDefault();
                }
                >
                <option value="none"  selected  hidden >All</option>
                {props.getBatches(prodName).map((arr,ind) => (
                    <option 
                    // key={Math.floor(Math.random() *100)+Math.floor(Math.random() *100)} 
                    value={arr[2]+'-'+ind}
                    >{arr[2]}</option>
                ))}
              </select> */}
            </td>
            {false?
            // prodName in selectedBatches? // check is batch there in currentSelectedBatchList?
            <td>
            {props.getBatches(prodName)
            .filter(function (row,ind){
                // console.log(Number(selectedBatches[prodName].split("-")[1]));
                // console.log(row[1]===prodName&&ind==2);
                console.log(row)
                console.log(ind)
                return (row[1]===prodName&&Number(ind)===Number((selectedBatches[prodName].split("-")[1])))[0][3]
            })
            }
                
            </td>:
            <td>{props.getBatches(prodName).reduce((total, item) => total + item[3], 0)
            }
            </td>
            }
            <td>{props.getBatches(prodName).reduce((max, item) => max = max > item[6] ? max : item[6], 0)
            }
            </td>
            <td>{props.getBatches(prodName).reduce((min, item) => min = min < Math.floor(item[4] === 0 ? 0 : item[5] / item[4]) ? min : Math.floor(item[4] === 0 ? 0 : item[5] / item[4]), 0)}
            </td>
            <td>{props.getBatches(prodName).reduce((min, item) => min = min < Math.floor(item[4] === 0 ? 0 : item[5] / item[4]) ? min : Math.floor(item[4] === 0 ? 0 : item[5] / item[4]), 0)}
            </td>
            <td>{props.getBatches(prodName).reduce((max, item) => max = max > item[7] ? max : item[7], 0)
            }
            </td>
             <td>{props.getBatches(prodName).reduce(function (min, item) {
                 let  date = new Date(item[8]),
                 mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                 day = ("0" + date.getDate()).slice(-2);
                 let temp = [day, mnth, date.getFullYear()].join("-")
               
            //   let temp1 = Object.key(item[8])
            if(prodName==='1-AL 5MG TABS ***')
            //   console.log(temp)
            //   let temp2=new Date(min);
              min=temp<min?min:temp;
            //   let date1 = new Date(temp.replace(/-/g,'/'));  
            //   console.log(date1)
            //   let date2 = new Date(min.toString().replace(/-/g,'/'));
            //   min= date1<date2?date1:date2
              return min;
            },'01-12-2050')
            }
            </td> 
            
          </tr>
        ))}
      </table>
)
};

export default Table;