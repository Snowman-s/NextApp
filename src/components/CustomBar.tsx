import { AppBar, Toolbar, Typography } from '@mui/material';
import App from 'next/app';

export default function CustomBar(props: { noScroll?: boolean, style?: React.CSSProperties }) {
  return (
    <AppBar position={props.noScroll ? "static" : "sticky"} style={props.style ?? {}} color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          {"SnowEsamoscのページ"}
        </Typography>
      </Toolbar>
    </AppBar >
  );
}
