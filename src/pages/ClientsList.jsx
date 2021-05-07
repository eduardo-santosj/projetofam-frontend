import React, { useState, useEffect } from 'react'
import { 
    TableContainer, 
    Table, 
    Paper, 
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { clientActions } from "../actions/clientAction"


const ClientsList = () => {
    const [clients, setClient] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(()=> {
        setLoading(true)

        clientActions.getClient( (response) => {
            if(response !== undefined)
                setClient(response.data)
            setLoading(false)
        });
    },[])

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Nome</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right">Classificação</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {clients.map((client, key) => (
                        <TableRow key={key}>
                            <TableCell align="right">{++key}</TableCell>
                            <TableCell align="right">{client.name}</TableCell>
                            <TableCell align="right">{client.email}</TableCell>
                            <TableCell align="right">{client.classification}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
export default  ClientsList