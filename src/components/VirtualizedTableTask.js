import React from 'react'  

import Table from '@material-ui/core/Table';  
import { makeStyles } from '@material-ui/core/styles';  
import { useState, useEffect } from 'react'   

import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TablePagination from '@material-ui/core/TablePagination';  
import './css/tableStyles.css';

import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const useStyles = makeStyles({  
    root: {  
      width: '100%',  
    },  
    container: {  
      maxHeight: 350,  
    },  
  });  

    
  export default function MatPaginationTable(props) {  
    const classes = useStyles();  
    const [page, setPage] = React.useState(0);  
    const [rowsPerPage, setRowsPerPage] = React.useState(5);  

    const Delete=(Data)=>{
        fetch("http://localhost:9000/deleteTask/tasks", {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          TID: Data.TID,
          
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        .then(window.location.reload(true));
    }

    

    
    const handleChangePage = (event, newPage) => {  
      setPage(newPage);  
    };  
    const handleChangeRowsPerPage = event => {  
      setRowsPerPage(+event.target.value);  
      setPage(0);  
    };  
    return (  
          <Paper className={classes.root}>  
            <TableContainer className={classes.container}>  
              <Table stickyHeader aria-label="sticky table">  
              <TableHead>  
                  <TableRow>  
                    <TableCell>Task ID</TableCell>  
                    <TableCell align="left">Appointment ID</TableCell>  
                    <TableCell align="left">Task Description</TableCell>  
                    <TableCell align="center">Outcome</TableCell>  
                    <TableCell align="right">Notes</TableCell>  
                    <TableCell align="right">Delete Tasks</TableCell>  
                  </TableRow>  
                </TableHead>  
                <TableBody> 
                  {props.Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                    return (  
                 <TableRow >  
                      <TableCell component="th" scope="row">  
                        {row.TID}  
                      </TableCell>  
                      <TableCell align="left">{row.AID}</TableCell>  
                      <TableCell align="left">{row.Description}</TableCell>
                      <TableCell align="center">{row.Outcome}</TableCell>  
                      <TableCell align="right">{row.Notes}</TableCell>  
                      <TableCell align = "right" ><IconButton onClick={() => Delete(row)}><DeleteForeverRoundedIcon/></IconButton></TableCell>
                      
                    </TableRow>  
                       
                    );  
                  })}  
                </TableBody>  
              </Table>  
            </TableContainer> 
            <TablePagination  
              rowsPerPageOptions={[5, 10, 15]}  
              component="div"  
              count={props.Data.length}  
              rowsPerPage={rowsPerPage}  
              page={page}  
              onChangePage={handleChangePage}  
              onChangeRowsPerPage={handleChangeRowsPerPage}  
            /> 
          </Paper>  
        );  
      } 
  


