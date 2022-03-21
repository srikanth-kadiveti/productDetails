import '../App.css';
import {useState,useEffect} from 'react'
import Batch from './TableComponents/Batch';
import Stock from './TableComponents/Stock';
import Deal from './TableComponents/Deal';
import Free from './TableComponents/Free';
import Mrp from './TableComponents/Mrp';
import Rate from './TableComponents/Rate';
import ExcelDates from './TableComponents/ExcelDates';

const Table=(props)=>{

 const [selectedBatches,setSelectedBatches]=useState({})

  const selectBatch=(batchValue,prodName)=>{
        setSelectedBatches({...selectedBatches,[prodName]:batchValue}
        )     
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
              <Batch
                 batches={batches}
                 prodName={prodName}
                 selectBatch={selectBatch}
              />
              <Stock
              batches={batches}
              prodName={prodName}
              selectedBatches={selectedBatches}
              />
              <Deal
              batches={batches}
              prodName={prodName}
              selectedBatches={selectedBatches}
              />
              <Free
                batches={batches}
                prodName={prodName}
                selectedBatches={selectedBatches}
              />
              <Mrp
               batches={batches}
               prodName={prodName}
               selectedBatches={selectedBatches}
              />
              <Rate
                batches={batches}
                prodName={prodName}
                selectedBatches={selectedBatches}
              />
              <ExcelDates
                batches={batches}
                prodName={prodName}
                selectedBatches={selectedBatches}
              />
          </tr>
        )}
        )}
      </table>
)
};

export default Table;


