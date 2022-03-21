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
  const [batches,setBatches]=useState({});
  const [currentPageRecords,setCurrentPageRecords]=useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [arrayForBatches,setArrayForBatches]=useState([])

  const recordsPerPage = 10;
  const pagesVisited = pageNumber * recordsPerPage;

  const pageCount = Math.ceil(unique.length / recordsPerPage);

  console.log(pageCount)

  useEffect(()=>{
    setCurrentPageRecords(unique.slice(0, 10))
  },[unique])
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    setCurrentPageRecords(unique.slice(pagesVisited, pagesVisited + recordsPerPage))
    // currentPage={unique.slice(pagesVisited, pagesVisited + recordsPerPage)}
  };


  const readFile = (e) => {
    console.log("read suss...")

    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary", cellDates: true, dateNF: 'dd-mm-yyyy' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let input = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(input);
      console.log(input)
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
    console.log(batchesArray)
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

      {/* <table>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>mrp</th>
        </tr>
        {unique.slice(pagesVisited, pagesVisited + recordsPerPage).map((prodName) => (
          <tr>
            <td>{prodName}</td>
            <td>
              <select name={prodName} id={prodName}
              // value=
              onChange={(e)=>{selectBatch(e.target.value,prodName)}}
              >

                <option value="none" selected disabled hidden>All</option>
                {
                  fun(prodName).map((arr) => (
                    <option value={arr[2]}>{arr[2]}</option>
                  ))
                }
              </select>
            </td>
            {false?
            <td>
              <h3>is selected</h3>
            </td>:
            <td>{fun(prodName).reduce((total, item) => total + item[3], 0)
            }
            </td>
            }
            <td>{fun(prodName).reduce((max, item) => max = max > item[6] ? max : item[6], 0)
            }
            </td>
            <td>{fun(prodName).reduce((min, item) => min = min < Math.floor(item[4] === 0 ? 0 : item[5] / item[4]) ? min : Math.floor(item[4] === 0 ? 0 : item[5] / item[4]), 0)}
            </td>
            <td>{fun(prodName).reduce((min, item) => min = min < Math.floor(item[4] === 0 ? 0 : item[5] / item[4]) ? min : Math.floor(item[4] === 0 ? 0 : item[5] / item[4]), 0)}
            </td>
            <td>{fun(prodName).reduce((max, item) => max = max > item[7] ? max : item[7], 0)
            }
            </td>
           
          </tr>
        ))}

      </table> */}


      
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
