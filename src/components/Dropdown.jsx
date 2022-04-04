import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function Dropdown(props) {
  const { options, title, displayOption, setDisplayOption } = props;
  //const [displayOption, setDisplayOption] = useState(options[defaultIndex]);

  const handleChange = (event) => {
    setDisplayOption(event.target.value);
  };

  return (
    <TextField
      id="outlined-select"
      select
      label={title}
      value={displayOption}
      onChange={handleChange}
      sx={{ minWidth: '200px' }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
