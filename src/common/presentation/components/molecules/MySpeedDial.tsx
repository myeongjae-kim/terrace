import {Fab, SpeedDial, SpeedDialAction, SpeedDialIcon, Theme, Tooltip} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

export interface SpeedDialActionData {
  icon: JSX.Element;
  name: string;
  handleClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): any;
}

const useStyles = makeStyles((theme: Theme) => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(15),
    right: theme.spacing(3),
  },
}));


interface Props {
  actions: SpeedDialActionData[];
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

const MySpeedDial: React.FC<Props> = ({ actions, disabled, type }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (actions.length === 1) {
    return (
      <div>
        <Tooltip title={actions[0].name} placement="left">
          <Fab
            type={type || "submit"}
            disabled={disabled}
            aria-label="MySpeedDial"
            color="primary"
            className={classes.speedDial}
            onClick={actions[0].handleClick}
          >
            {actions[0].icon}
          </Fab>
        </Tooltip>
      </div>
    );
  }

  return (
    <div>
      <SpeedDial
        ariaLabel="MySpeedDial"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onBlur={handleClose}
        onClick={handleClick}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={!disabled && open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default MySpeedDial;
