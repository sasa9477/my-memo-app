import { List, ListItem, ListItemText } from '@mui/material';
import licences from './../licenses.json';
import packagejson from './../package.json';

const Licence = (): JSX.Element => {
  const licenseKeys = Object.keys(licences)

  return (
    <List>
      <ListItem key='version'>
        <ListItemText primary={`バージョン ${packagejson.version}`}/>
      </ListItem>
      {licenseKeys.map((key) => {
        const license = licences[key].licenses;
        const copyright = licences[key].copylight ?? '';
        const licenseText = licences[key].licenseText;
        return (
          <ListItem key={key}>
          <ListItemText
            primary={key}
            secondary={`${license} ${copyright} ${licenseText}`}/>
        </ListItem>
        )
      })}
    </List>
  )
}

export default Licence