// import logo from './logo.svg';
import './App.css';
import * as XLSX from "xlsx";
import { useState } from 'react'
import ReactPaginate from 'react-paginate';

function App() {
  var time = new Date();
  const [data,setData]=useState([]);
  // const [unique2,setFour]=useState([]);
  const [unique,setUnique]=useState([]);
  const [batches,setBatches]=useState({});

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(unique.length / usersPerPage);
  console.log(pageCount)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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

   function fun(prodName){
    // console.log(prodName)
    let four= data.filter((row) => row[1] ===prodName);
    // let four= unique2.filter(row=>row===prodName);
    // console.log(four)
    // setFour(four);
    // console.log(data)
    return four;
  }

const selectBatch=(batchValue,prodName)=>{
  console.log("slected batch called")
  console.log(batchValue,prodName)
  // setIsBatchSelected(true)// to render the page

}  
  return (
    <div className="App">
      <h2>Here the EXCEL</h2>
      <input type="file" onChange={readFile} />

      <table>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>mrp</th>
        </tr>
        {unique.slice(pagesVisited, pagesVisited + usersPerPage).map((prodName) => (
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
              {/* <td>{fun(prodName).filter((item) =>item[2]==value) */}
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
            {/* <td>{fun(prodName).reduce(function (min, item) {
              // let temp = Object.key(item[8]).toString();
              let temp1 = Object.key(item[8])
              // console.log(temp)
              let temp2=new Date(min);
              min=temp1<temp2?temp2:temp2;
              // let date1 = new Date(temp.replace(/-/g,'/'));  
              // console.log(date1)
              // let date2 = new Date(min.toString().replace(/-/g,'/'));
              // min= date1<date2?date1:date2
              return min;
            },'12-12-2022')
            }
            </td> */}
          </tr>
        ))}

        {/* <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr> */}
      </table>


      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
