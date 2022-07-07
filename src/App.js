/* eslint-disable no-undef */
import './App.css';
import { useState } from 'react';
import EditDashboard from './pages/EditDashboard';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Button, Box, Modal, Typography } from '@mui/material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 1,
  p: 4,
};

function App() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      width: '100%'
    },
  }));

  const PropertyPreview = () => (
    <Box>
      <div className="category-header bold">Property Name</div>
      <p>
        This property means this.
      </p>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ marginRight: '10px' }}>See more</div>
        <div>See docs</div>
      </div>
    </Box>
  )

  return (
    <div className="App">
      {/* <EditDashboard /> */ }
      <HtmlTooltip title={<PropertyPreview />}>
        <Button>Arrow</Button>
      </HtmlTooltip>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default App;
