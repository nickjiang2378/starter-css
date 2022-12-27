import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function Dropdown(props) {
  const { options, title, displayOption, setDisplayOption, sx } = props;

  const handleChange = (event) => {
    setDisplayOption(event.target.value);
  };

  return (
    <TextField
      select
      label={title}
      value={displayOption}
      InputLabelProps={{ shrink: true }}
      InputProps={{ sx: { fontSize: "1em" }}}
      onChange={handleChange}
      size="small"
      sx={{ ...sx, minWidth: "5em" }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option} sx={{ fontSize: "1em" }} dense>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
