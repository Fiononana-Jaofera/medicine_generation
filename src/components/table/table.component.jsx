import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BasicTable = ({headers, body, title}) => {
    return (
        <TableContainer component={Paper}>
            <h4 style={{ textAlign: 'center' }}>{title}</h4>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, id_h) => <TableCell key={id_h}>{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body.map((row, id_r) => (
                        <TableRow key={id_r}>
                            {row.map((e, id_e) => <TableCell key={id_e}>{e}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;