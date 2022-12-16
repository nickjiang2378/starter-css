import React, {useState, useEffect} from "react"
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/system';
import { Autocomplete, Input, TextField } from "@mui/material";
import { FixMeLater } from "../../types/general";
  
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
    options: string[]
}

export default function OptionsInput({ value, setValue, options, ...props }: OptionsInputProps) {
    value = value ? value : ""
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: `autocomplete-input`,
        options: options,
        value: value,
        onChange: (e, value) => {setValue(value)},
        onInputChange: (e, value) => {setValue(value)}
    });
    
    // const ListBoxComponent = (props: FixMeLater) => {
    //     console.log(props)
    //     return (
    //         <ul {...props}>
    //             {options.map((option, index) => (
    //                 <li onMouseOver={(e) => console.log(e)}>{option}</li>
    //             ))}
    //         </ul>
    //     )
    // }

    // return (
    //     <Autocomplete
    //         options={options}
    //         value={value ? value: ""}
    //         onChange={(e, value) => {setValue(value)}}
    //         onInputChange={(e, value) => {setValue(value)}}
    //         renderInput={(params) => <TextField {...params} label="clearOnEscape" variant="standard" />}
    //         ListboxComponent={ListBoxComponent}
    //     />
    // )
    
    return (
        <div style={{ width: "fit-content", marginBottom: "10px" }}>
            <div {...getRootProps()}>
                <TextField inputProps={getInputProps()} variant="standard" />
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {groupedOptions.map((option: FixMeLater, index) => (
                    <ListItem {...getOptionProps({ option, index })} onMouseOver={() => setValue(option)}>{option}</ListItem>
                    ))}
                </Listbox>
            ) : null}
        </div>
    );
}

