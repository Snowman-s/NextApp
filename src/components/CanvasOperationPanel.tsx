import {
  Button,
  Divider,
  Fab,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ReactNode, useState } from "react";

export type CanvasOperationPanelProps = {
  title: String,
  onRequireRestart: () => void,
  onRequireSave: () => void,
  slideOutOnRestart?: boolean,
  children?: ReactNode;
}

export function CanvasOperationPanel(props: CanvasOperationPanelProps) {
  const [slideIn, setSlideIn] = useState(true);

  const toggleSlideIn = () => {
    setSlideIn(!slideIn);
  };

  const actualSlideIn = slideIn;

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <Slide in={actualSlideIn}>
          <Paper style={{ padding: 20, margin: 20 }}>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h2">{props.title}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.onRequireSave()}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (props.slideOutOnRestart ?? false)
                      setSlideIn(false);
                    props.onRequireRestart();
                  }}
                >
                  Restart
                </Button>
              </Stack>
              <Divider />
              {props.children}
            </Stack>
          </Paper>
        </Slide>
        <Fab
          style={{ marginTop: 25 }}
          onClick={toggleSlideIn}
          color="secondary"
        >
          {actualSlideIn ? <ExpandLess /> : <ExpandMore />}
        </Fab>
      </Stack>
    </div>
  );
}
