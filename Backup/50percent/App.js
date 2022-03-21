// import logo from './logo.svg';
import './App.css';
import * as XLSX from "xlsx";
import { useState,useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import Table from './Components/table'

function App() {
  var time = new Date();
  const [data,setData]=useState([]);
  // const [unique2,setFour]=useState([]);
  const [unique,setUnique]=useState([]);
  // const [batches,setBatches]=useState({});
  // const [currentPageRecords,setCurrentPageRecords]=useState([])
  const [pageNumber, setPageNumber] = useState(0);
  // const [arrayForBatches,setArrayForBatches]=useState([])

  const recordsPerPage = 10;
  const pagesVisited = pageNumber * recordsPerPage;

  const pageCount = Math.ceil(unique.length / recordsPerPage);

  console.log(pageCount)

  useEffect(()=>{
    // setCurrentPageRecords(unique.slice(0, 10))
  },[pageNumber])
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    // setCurrentPageRecords(unique.slice(pagesVisited, pagesVisited + recordsPerPage))
    // currentPage={unique.slice(pagesVisited, pagesVisited + recordsPerPage)}
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
      // input.shift();
      setData(input)
      console.log(input.shift())
      let tabs = input.map((row) => row[1])

      let uni = [...new Set(tabs)];

      setUnique(uni);
    };
    reader.readAsBinaryString(file);
  }

  function getBatches(prodName){
    // console.log(prodName)
    let batchesArray= data.filter((row) => row[1] ===prodName);
    // setArrayForBatches(data.filter((row) => row[1] ===prodName))
    console.log(batchesArray.length)
    if(prodName==='1-AL 5MG TABS ***'){
      // console.log(batchesArray)
      // console.log(abc)
    }
    // console.log(arrayForBatches)
    return batchesArray;
    // return arrayForBatches;
  }


  return (
    <div className="App">
      <h2>Here the EXCEL</h2>
      <input type="file" onChange={readFile} />

    <Table
     getBatches={getBatches}
    // recordsPerPage={recordsPerPage}
    currentPage={unique.slice(pagesVisited, pagesVisited + recordsPerPage)}
    />
      
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
      />
    </div>
  );
}

export default App;
