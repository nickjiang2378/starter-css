import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function Dropdown(props) {
  const { options, title, displayOption, setDisplayOption } = props;

  const handleChange = (event) => {
    setDisplayOption(event.target.value);
  };

  return (
    <TextField
      select
      label={title}
      value={displayOption}
      onChange={handleChange}
      sx={{ minWidth: '200px' }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
