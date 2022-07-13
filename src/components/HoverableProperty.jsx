import { useState } from "react";

import { Box, TextField, Modal, Typography } from "@mui/material";
import { HtmlTooltip } from "./HtmlTooltip";
import TooltipTemplate from "./TooltipTemplate";
import ModalTemplate from "./ModalTemplate";
import { filterInitialNumbers } from "../utils/helpers";

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

export default function HoverableProperty({ computedStyles, propertyTitle, propertyFullName, value, onChange, PropertyFull, PropertyPreview, UnitFull, UnitPreview }) {

    const [inputTooltipOpen, setInputTooltipOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState();

    const PropertyPreviewWrapper = ({ openModal }) => (
        <TooltipTemplate
            computedStyles={computedStyles}
            openModal={openModal}
            title={propertyFullName || propertyTitle}
            ContentComponent={PropertyPreview}
        />
    )
    const PropertyFullWrapper = () => (
        <ModalTemplate
            computedStyles={computedStyles}
            title={propertyFullName || propertyTitle}
            ContentComponent={PropertyFull}
        />
    )
    const unitTitle = `${propertyFullName || propertyTitle}: ${filterInitialNumbers(value)}`
    const UnitPreviewWrapper = ({ openModal }) => (
        <TooltipTemplate
            computedStyles={computedStyles}
            title={unitTitle}
            openModal={openModal}
            ContentComponent={UnitPreview}
        />
    )
    const UnitFullWrapper = () => (
        <ModalTemplate
            title={unitTitle}
            computedStyles={computedStyles}
            ContentComponent={UnitFull}
        />
    )

    const handleTooltipClose = () => {
        setInputTooltipOpen(false);
    };

    const handleTooltipOpen = () => {
        setInputTooltipOpen(true);
    };

    const openPropertyModal = () => {
        setModalOpen(true);
        setModalContent(<PropertyFullWrapper />)
    }

    const openUnitsModal = () => {
        setModalOpen(true);
        setModalContent(<UnitFullWrapper />)
    }

    return (
        <div className="hoverable-property">
            <HtmlTooltip title={<PropertyPreviewWrapper openModal={openPropertyModal} />}>
                <div className="hoverable-property-name">{propertyTitle}</div>
            </HtmlTooltip>
            <HtmlTooltip
                title={<UnitPreviewWrapper openModal={openUnitsModal} />}
                enterDelay={1000}
                open={inputTooltipOpen}
                onOpen={handleTooltipOpen}
                onClose={handleTooltipClose}
                disableFocusListener
            >
                <TextField
                    id="standard-basic" 
                    variant="standard"
                    value={value}
                    onChange={onChange}
                    onFocus={handleTooltipClose}
                    sx={{ marginLeft: '10px', maxWidth: 'calc(6em)'}}
                />
            </HtmlTooltip>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {modalContent}
                </Box>
            </Modal>
        </div>
    );
}