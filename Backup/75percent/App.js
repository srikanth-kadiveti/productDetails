// import logo from './logo.svg';
import './App.css';
import * as XLSX from "xlsx";
import { useState,useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Table from './Components/table'
import Charts from './Components/Charts'


function App() {
  var time = new Date();
  const [data,setData]=useState([]);
  const [unique,setUnique]=useState([]);
  const [isFileImported,setIsFileImported]=useState(false);
  // const [importedData,setImportedData]=useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [userInput,setUserInput]=useState("")
  const [currentFiltered,setCurrentFiltered]=useState([])

  const recordsPerPage = 10;
  const pagesVisited = pageNumber * recordsPerPage;

  const pageCount = Math.ceil(unique.length / recordsPerPage);

  console.log(pageCount)

  useEffect(()=>{
    stockPercentages();
  },[data])
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
      // setImportedData
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

  const stockPercentages=()=>{
    // setTimeout(()=>{
      let heavyShortage=data.filter((arr)=>arr[3]<0)
      .reduce((total, item) => total + item[3], 0);
  
      let nearToShortage=data.filter((arr)=>arr[3]<40&&arr[3]>0)
      .reduce((total, item) => total + item[3], 0);
  
      let moderateShortage=data.filter((arr)=>arr[3]<150&&arr[3]>40)
      .reduce((total, item) => total + item[3], 0);
  
      let adaquateStock=data.filter((arr)=>arr[3]>150)
      .reduce((total, item) => total + item[3], 0);
      // let percentages=data.reduce()
      console.log([heavyShortage,nearToShortage,moderateShortage,adaquateStock]);
      return [heavyShortage,nearToShortage,moderateShortage,adaquateStock]
    // },3000)
  }

  const handleChange=(e)=>{
    console.log(e.target.value)
    setUserInput(e.target.value)
    if(e.target.value!=""){
      const filterRecords=data.filter((item)=>item[1].toLowerCase()
      .includes(e.target.value.toLowerCase()));
    // setCurrentFiltered([...filterRecords])
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
      <BrowserRouter>
      {isFileImported?   
      <h2>The Medicines Inventory Data</h2>
      :
      <h2>Choose a file to import the data</h2>
      }
      
      <input type="file" onChange={(e)=>{readFile(e);
        setIsFileImported(true)}} />
        <input className='searchBar'
          placeholder="Search for product"
          value={userInput}
          onChange={handleChange}
        />
      <Routes>
      {isFileImported? 
        userInput.length>0?
        <Route
          path="/" 
          exact 
            element={
              
              <Table
              getBatches={getBatches}
              currentPage={unique}
            />
             }
          />:  
        <Route
          path="/" 
          exact 
            element={
              
              <Table
              getBatches={getBatches}
              currentPage={unique.slice(pagesVisited, pagesVisited + recordsPerPage)}
            />
             }
          />
          :
          <></>
          }
        <Route
          path="/charts" 
          exact 
            element={
                <Charts
                  stockPercentages={stockPercentages} />
            }
          />          
      </Routes>
      </BrowserRouter>
      {isFileImported&&userInput.length<1?    
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
      {/* <div className='chart'>
      <Charts
      stockPercentages={stockPercentages}/>
      </div> */}
    </div>
  );
}

export default App;
