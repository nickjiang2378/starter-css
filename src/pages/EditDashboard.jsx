import { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import StaticEffectsDisplay from "./StaticEffectsDashboard/StaticEffectsDisplay";
import { listenForElementChanges } from "../scripts/updateStyle"; 

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function EditDashboard() {
    const [tab, setTab] = useState(0);
    const [elementStyles, setElementStyles] = useState(null);

    useEffect(() => {
      console.log("Listening for element style changes");
      listenForElementChanges(setElementStyles);
    }, []);

    useEffect(() => {
      console.log(elementStyles);
    }, [elementStyles]);

    function handleTabChange(event, newVal) {
        setTab(newVal);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs sx={{ display: "flex" }} centered value={tab} onChange={handleTabChange} aria-label="Edit Dashboard Tabs">
                    <Tab sx={{ flex: 1 }} label="Static Effects" />
                    <Tab sx={{ flex: 1 }} label="Animated Effects" />
                </Tabs>
            </Box>
            {tab === 0 ? <StaticEffectsDisplay elementStyles={elementStyles} /> : null}
        </Box>
      );
}