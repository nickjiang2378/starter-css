import { Box } from "@mui/material";

export default function TooltipTemplate({ ContentComponent, title, computedStyles, openModal }) {
    return (
        <Box>
            <div className="category-header bold">{title}</div>
            {ContentComponent}
            <div style={{ display: 'flex', marginTop: '15px' }}>
                <div style={{ flex: 1 }}></div>
                <div onClick={openModal} style={{ marginRight: '10px' }}>See more</div>
                <div>See docs</div>
            </div>
        </Box>
    )
}
