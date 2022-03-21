// import logo from './logo.svg';
import './App.css';
import * as XLSX from "xlsx";
import { useState,useEffect,createContext } from 'react'
import ReactPaginate from 'react-paginate';
import {BrowserRouter,Route,Routes,useNavigate} from 'react-router-dom'
import Table from './Components/table'
import Charts from './Components/Charts'

function App() {
  
  // var time = new Date();
  const [data,setData]=useState([]);
  const [unique,setUnique]=useState([]);
  const [isFileImported,setIsFileImported]=useState(false);
  // const [importedData,setImportedData]=useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [userInput,setUserInput]=useState("")
  const [currentFiltered,setCurrentFiltered]=useState([])
  const [heavyShortage,setHeavySHortage]=useState(0);
  const [nearToShortage,setNearToShortage]=useState(0);
  const [moderateShortage,setModerateShortage]=useState(0);
  const [adaquateStock,setAdaquateStock]=useState(0);
  const [toggleCharts,setToggleCharts]=useState(false)

  const recordsPerPage = 10;
  const pagesVisited = pageNumber * recordsPerPage;

  const pageCount = Math.ceil(unique.length / recordsPerPage);

  console.log(pageCount)


  const changePage = ({ selected }) => {
    setPageNumber(selected);
    };
  const readFile = (e) => {
    console.log("read success yooo ...")
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary",raw: false, cellDates: true});//dateNF: "DD-MM-YYYY" }
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let input = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(input)
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

      let Hshort=data.filter((arr)=>arr[3]<0)
      .reduce((total, item) => total + item[3], 0);

      console.log(Hshort)
      setHeavySHortage(Hshort)
  
      setNearToShortage(data.filter((arr)=>arr[3]<40&&arr[3]>0)
      .reduce((total, item) => total + item[3], 0));
  
      setModerateShortage(data.filter((arr)=>arr[3]<150&&arr[3]>40)
      .reduce((total, item) => total + item[3], 0));
  
      setAdaquateStock(data.filter((arr)=>arr[3]>150)
      .reduce((total, item) => total + item[3], 0));
  },[data])

  const stockPercentages=()=>{
      console.log([heavyShortage,nearToShortage,moderateShortage,adaquateStock]);

    return [heavyShortage,nearToShortage,moderateShortage,adaquateStock]
  }

  const handleChange=(e)=>{
    console.log(e.target.value)
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

      {isFileImported&&!toggleCharts?   
      <h2>The Medicines Inventory Data</h2>
      :
      <h2>Choose a file to import the data</h2>
      }
      
      <input type="file" onChange={(e)=>{readFile(e);
        setIsFileImported(true)}} />
      <button type="button" onClick={()=>setToggleCharts(true)}>
          View Charts
      </button>
      <button type="button" onClick={()=>setToggleCharts(false)}>
          View Tabel
      </button>

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
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />:
      <></>
      }
      {toggleCharts?
     <div className='chart'>
      <Charts
        stockPercentages={stockPercentages} 
      />
     </div> 
     :<></>
      }
    </div>
  );
}

export default App;
