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
      onChange={handleChange}
      sx={{ minWidth: '5em', ...sx }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
