import { Close } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function ModalHeader({
  children,
  title,
  open,
  handleClose,
  successActionName,
  handleSuccessAction,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="sm"
    >
      {fullScreen && (
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSuccessAction}>
              {successActionName}
            </Button>
          </Toolbar>
        </AppBar>
      )}
      {!fullScreen && <DialogTitle>{title}</DialogTitle>}
      <DialogContent sx={{ p: 5 }}>{children}</DialogContent>
      {!fullScreen && (
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSuccessAction}>{successActionName}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
