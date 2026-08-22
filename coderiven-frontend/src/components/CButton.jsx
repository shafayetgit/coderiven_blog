import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";

export default function CButton({
  label,
  onClick,
  sx,
  icon,
  tooltip,
  iconButton = false,
  ...other
}) {
  return (
    <Tooltip title={tooltip} followCursor>
      <Box component="span">
        {iconButton ? (
          <IconButton
            sx={{
              ...sx,
            }}
            onClick={onClick}
            {...other}
          >
            {icon}
          </IconButton>
        ) : (
          <Button
            sx={{
              ...sx,
            }}
            onClick={onClick}
            {...other}
          >
            {label}
          </Button>
        )}
      </Box>
    </Tooltip>
  );
}

CButton.propTypes = {
  label: PropTypes.string.isRequired, // Label for the button
  onClick: PropTypes.func, // Function to execute when the button is clicked
  sx: PropTypes.object, // Custom styles for the button
  icon: PropTypes.node, // Icon element for IconButton
  tooltip: PropTypes.string, // Tooltip text
  iconButton: PropTypes.bool, // Whether to render as IconButton
};
