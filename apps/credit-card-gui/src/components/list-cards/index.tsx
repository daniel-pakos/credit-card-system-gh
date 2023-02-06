
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function ListCards(props: any) {

  const {cards} = props

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150
    },
    {
      field: 'number',
      headerName: 'Number',
      type: 'string',
      width: 200
    },
    {
      field: 'balance',
      headerName: 'Balance',
      type: 'string',
      width: 110
    },
    {
      field: 'limit',
      headerName: 'Limit',
      type: 'string',
      width: 110
    }
  ];
  
    return (
        <Container maxWidth="xl" className='ListCards section'>
        <Box sx={{ height: 300, width: '100%' }}>
            <Typography variant="h5" component="h5">
              Existing Credit Cards
            </Typography>
            <Box sx={{ height: '100%', width: '100%', maxWidth: 800 }}>
              <DataGrid
                disableColumnFilter={true}
                disableColumnMenu={true}
                disableColumnSelector={true}
                rows={cards}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Box>
        </Box>
      </Container>
    )
  }

