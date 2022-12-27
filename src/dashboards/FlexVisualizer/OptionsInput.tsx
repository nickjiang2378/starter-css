import React, {useState, useEffect} from "react"
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/system';
import { Autocomplete, Input, TextField } from "@mui/material";
import { FixMeLater, ObjectStringKeys } from "../../types/general";
import { Option } from "../../types/dashboards";
  
// const InputCustom = styled('input')(({ theme }) => ({
//     width: "fit-content",
//     backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
//     color: theme.palette.mode === 'light' ? '#000' : '#fff',
//     padding: "1em",
//     fontSize: "inherit",
//     fontFamily: "inherit"
// }));

const Listbox = styled('ul')(({ theme }) => ({
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li.Mui-focused': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
}));

const ListItem = styled("li")(({ theme }) => ({
    padding: "0.5em 1em"
}))

  
type OptionsInputProps = {
    value: string;
    setValue: FixMeLater;
    options: Option[]
}

export default function OptionsInput({ value, setValue, options, ...props }: OptionsInputProps) {
    value = value ? value : ""

    const optionLabels = options.map((option) => option.label)
    const optionLabelToIndex: ObjectStringKeys = {}
    options.map((option, index) => {optionLabelToIndex[option.label] = index; return null})

    let longestOption = ""
    for (let option of optionLabels) {
        if (option.length > longestOption.length) {
            longestOption = option
        }
    }
    
    return (
        <div style={{ marginBottom: "10px" }}>
            <Autocomplete
                options={optionLabels}
                value={value}
                onChange={(e, newValue) => {setValue(newValue)}}
                onInputChange={(e, newValue) => {setValue(newValue)}}
                popupIcon={null}
                clearIcon={null}
                renderInput={(params) => <TextField {...params} InputProps={{...params.InputProps, endAdornment: null, sx: { fontSize: "1em", paddingRight: "0px !important" } }} variant="standard"/>}
                renderOption={(props, option) => {return (<li {...props} style={{ fontSize: "1em", paddingTop: "0.5em", paddingBottom: "0.5em" }} onMouseOver={() => setValue(option)}>
                    {optionLabelToIndex[option] && "display" in options[optionLabelToIndex[option]] ?
                        options[optionLabelToIndex[option]].display :
                        option
                    }
                </li>)}}
                filterOptions={(options) => options}
                ListboxProps={{ style: { fontSize: "12px" }}}
                sx={{ minWidth: `calc(${longestOption.length}ch + 3em)`, fontSize: "1em" }}
            />
        </div>
    );
}

// Same version as above but leverages the useAutocomplete hook
function OptionsInputCustom({ value, setValue, options, ...props }: OptionsInputProps) {
    value = value ? value : ""
    // const {
    //     getRootProps,
    //     getInputLabelProps,
    //     getInputProps,
    //     getListboxProps,
    //     getOptionProps,
    //     groupedOptions,
        
    // } = useAutocomplete({
    //     id: `autocomplete-input`,
    //     options: options,
    //     value: value,
    //     onChange: (e, value) => {setValue(value)},
    //     onInputChange: (e, value) => {setValue(value)},
    //     filterOptions: (options, state) => options
    // });
    
    // return (
    //     <div style={{ width: "fit-content", marginBottom: "10px" }}>
    //         <div {...getRootProps()}>
    //             <TextField inputProps={getInputProps()} variant="standard" />
    //         </div>
    //         {groupedOptions.length > 0 ?
    //             <Listbox {...getListboxProps()}>
    //                 {groupedOptions.map((option: FixMeLater, index) => (
    //                 <ListItem {...getOptionProps({ option, index })} onMouseOver={() => setValue(option)}>{option}</ListItem>
    //                 ))}
    //             </Listbox>
    //         : null}
    //     </div>
    // );
}