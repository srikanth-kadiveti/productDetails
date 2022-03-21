import './App.css';
import * as XLSX from "xlsx";
import { useState,useEffect } from 'react'
import Table from './Components/table'
import Charts from './Components/Charts';
import Pagenation from './Components/Pagenation';

function App() {
  
  const [data,setData]=useState([]);
  const [unique,setUnique]=useState([]);
  const [isFileImported,setIsFileImported]=useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [userInput,setUserInput]=useState("")

  //stores chart related data
  const [stockShortageStats,setStockShortageStats]=useState([0,0,0,0])
  const [nearToExpiry,setNearToExpiry]=useState([0,0,0,0])

  const [toggleCharts,setToggleCharts]=useState(false)

  const recordsPerPage = 10;
  const pagesVisited = pageNumber * recordsPerPage;

  const pageCount = Math.ceil(unique.length / recordsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    };
  const readFile = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary",raw: false, cellDates: true});//dateNF: "DD-MM-YYYY" }
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let input = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(input)
      //the field names ::
      console.log(input.shift())
      let temp = input.map((row) => row[1])
      let uni = [...new Set(temp)];
      setUnique(uni);
    
    };
    reader.readAsBinaryString(file);
  }

  function getBatches(prodName){
    let batchesArray= data.filter((row) => row[1] ===prodName);
    return batchesArray;
  }

  
  useEffect(()=>{
    // inventory stock details
      let heavyShortage=data.filter((arr)=>arr[3]<10).length;
      let nearToShortage=data.filter((arr)=>arr[3]<30&&arr[3]>10).length;
      let moderateShortage=data.filter((arr)=>arr[3]<100&&arr[3]>30).length;
      let adaquateStock=data.filter((arr)=>arr[3]>100).length;

      //year wise expiring products
      let year2022=data.filter((arr)=>(new Date(arr[8]).getFullYear())===2022).length;
      let year2023and24=data.filter((arr)=>((new Date(arr[8]).getFullYear())===2023)||(new Date(arr[8]).getFullYear())===2024).length;
      let year2025plus=data.filter((arr)=>(new Date(arr[8]).getFullYear())>=2024).length;

      setNearToExpiry([year2022,year2023and24,year2025plus])
      setStockShortageStats([heavyShortage,nearToShortage,moderateShortage,adaquateStock])
  },[data])

  const stockPercentages=()=>{
    return stockShortageStats;
  }
  const getNearToExpiry=()=>{
    return nearToExpiry;
  }

  //handling search bar event changes
  const handleChange=(e)=>{
    setUserInput(e.target.value)
    if(e.target.value!=""){
      const filterRecords=data.filter((item)=>item[1].toLowerCase()
      .includes(e.target.value.toLowerCase()));
    let temp = filterRecords.map((row) => row[1]);
    let uni = [...new Set(temp)];
    setUnique(uni);
    }
    else{
      let temp = data.map((row) => row[1]);
      let uni = [...new Set(temp)];
      setUnique(uni)
    }

  }


  return (
    <div className="App">
      
      {isFileImported?   
      <h2>The Medicines Inventory Data</h2>
      :
      <h2>Choose a file to import the data</h2>
      }

    <div className='header'>
    <input type="file" onChange={(e)=>{readFile(e);
        setIsFileImported(true)}} />
     {isFileImported?
      <button type="button" onClick={()=>setToggleCharts(true)}>
          View Charts
      </button>
      :<></>}
     {isFileImported?
      <button type="button" onClick={()=>setToggleCharts(false)}>
          View Table
      </button>
      :<></>}
    </div>
      {isFileImported&&!toggleCharts?   
        <input className='searchBar'
          placeholder="Search for product"
          value={userInput}
          onChange={handleChange}
        />:<></>
      }
      {isFileImported&&!toggleCharts? 
        userInput.length>0?
            <Table
              getBatches={getBatches}
              currentPage={unique}
            />
            :  
             <Table
              getBatches={getBatches}
              currentPage={unique.slice(pagesVisited, pagesVisited + recordsPerPage)}
            />
           :
          <></>
          }

      {isFileImported&&userInput.length<1&&!toggleCharts? 
      <Pagenation
      changePage={changePage}
      pageCount={pageCount}
      />
      :
      <></>
      }
      {toggleCharts?
     <div>
      <Charts
        stockPercentages={stockPercentages} 
        getNearToExpiry={getNearToExpiry}
      />
     </div> 
     :<></>
      }
    </div>
  );
}

export default App;
