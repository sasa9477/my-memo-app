import { List, ListItem, ListItemText } from '@mui/material';
import licences from './../licenses.json';
import packageJson from './../package.json';

const Licence = (): JSX.Element => {
  const licenseKeys = Object.keys(licences)

  return (
    <List>
      <ListItem key='version'>
        <ListItemText primary={`バージョン ${packageJson.version}`}/>
      </ListItem>
      {licenseKeys.map((key) => {
        const license = licences[key].licenses;
        const copyright = licences[key].copylight ?? `${license} License`;
        const licenseText = licences[key].licenseText;
        return (
          <ListItem key={key}>
          <ListItemText
            primary={key}
            secondary={`${copyright}\n${licenseText}`}
            secondaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }}/>
        </ListItem>
        )
      })}
    </List>
  )
}

export default Licence