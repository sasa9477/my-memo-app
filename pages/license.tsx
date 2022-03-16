import { List, ListItem, ListItemText } from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import licenses from '../licenses.json';
import packageJson from '../package.json';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const License = (): JSX.Element => {
  const licenseKeys = Object.keys(licenses)

  return (
    <List>
      <ListItem key='version'>
        <ListItemText primary={`バージョン ${packageJson.version}`}/>
      </ListItem>
      {licenseKeys.map((key) => {
        const license = licenses[key].licenses;
        const copyright = licenses[key].copylight ?? `${license} License`;
        const licenseText = licenses[key].licenseText;
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

export default License