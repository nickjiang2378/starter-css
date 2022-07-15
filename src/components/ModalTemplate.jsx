import { Box } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ModalTemplate({ ContentComponent, ComputedExplanationComponent, title, propertyName, computedStyles }) {
    return (
        <Box>
            <div className="category-header bold">{title}</div>
            {ContentComponent}
            {ComputedExplanationComponent && <Accordion sx={{ marginTop: '15px', boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    Computed Value Explanation
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {ComputedExplanationComponent}
                    </Typography>
                </AccordionDetails>
            </Accordion>}
            <div style={{ display: 'flex', marginTop: '15px' }}>
                <div style={{ flex: 1 }}></div>
                <a href="https://www.google.com">See docs</a>
            </div>
        </Box>
    )

}
