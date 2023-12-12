import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


export default function Result() {
  const [tenderId, setTenderId] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  const [name, setName] = useState(" [Getting Data.....] ");
  const [visible, setVisible] = useState("none");
  // const [, set] = useState("...");
  // const [, set] = useState("...");
  // const [, set] = useState("...");
  // const [, set] = useState("...");

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Field',
      headerName: 'Field',
      width: 150,
    },
    {
      field: 'Value',
      headerName: 'Value',
      width: 700,
    }
  ];

  const  [rows,setRows] = useState([]);

  useEffect(() => {
    async function chk1(){
      setVisible("block");
      await axios
      .get("http://localhost:8282/tenderDetails/" + tokenId)
      .then((response) => {
        if (response.data === "Error!!") {
          alert("Error");
          setVisible("none");
        } else {
          console.log(response.data);
          if(tenderId!==0&&tokenId!==0){
            setName(response.data.companyName);
            setRows( [
            { id: 1, Field: "Winner 1", Value: response.data.winner1},
            { id: 2, Field: "Winner 2", Value: response.data.winner2},
            { id: 3, Field: "Winner 3", Value: response.data.winner3},
            { id: 4, Field: "Winner 4", Value: response.data.winner4},
            { id: 5, Field: "Winner 5", Value: response.data.winner5},
            { id: 6, Field: "Winner 6", Value: response.data.winner6},
            { id: 7, Field: "Winner 7", Value: response.data.winner7},
            { id: 8, Field: "TWinner 8", Value: response.data.winner8},
            { id: 9, Field: "Winner 9", Value: response.data.winner9}
            { id: 10, Field: "Winner 10", Value: response.data.winner10}
            ])
            setVisible("none");
          }
        }
      });
    }
    async function chk2(){
    await axios.get("http://localhost:8282/getWinner").then((response) => {
      if (response.data === "Error") {
        alert(response.data);
      } else {
        setTenderId(response.data.tenderId);
        setTokenId(response.data.winnerId);
        console.log(tokenId);
        console.log(response.data.winnerId);
        chk1();
      }
    });
  }

  chk2();
  }, [tenderId,tokenId]);
  // useEffect(() => {

  // }, [tokenId]);
  console.log(rows);
  return(
    <div>
      <div className="containers mx-auto text-5xl font-semibold  my-20 text-center">the winner for the question: {tenderId} are</div>
      <LinearProgress className="mx-60 my-20" style={{ display: visible}} color="success"  />
    <Box className="px-10" sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  )
}
