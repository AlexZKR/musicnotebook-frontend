import React from "react";
import { Switch, FormControlLabel, Stack, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type HideCompletedToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  hiddenCount: number;
  showHiddenCount?: boolean;
};

export default function HideCompletedToggle({
  checked,
  onChange,
  hiddenCount,
  showHiddenCount = false,
}: HideCompletedToggleProps) {
  return (
    <FormControlLabel
      sx={{ ml: 0 }}
      control={
        <Switch
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          color="primary"
        />
      }
      label={
        <Stack direction="row" spacing={1} alignItems="center">
          {checked ? (
            <VisibilityOffIcon fontSize="small" color="action" />
          ) : (
            <VisibilityIcon fontSize="small" color="action" />
          )}
          <Typography variant="body2" fontWeight="medium">
            Hide completed
            {showHiddenCount && hiddenCount > 0 && <> ({hiddenCount} hidden)</>}
          </Typography>
        </Stack>
      }
    />
  );
}
