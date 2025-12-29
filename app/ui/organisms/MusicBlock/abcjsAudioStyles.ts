import { alpha } from "@mui/material";
import type { Theme } from "@mui/material/styles";

type BuildAbcJsStylesArgs = {
  paperId: string;
  audioId: string;
  theme: Theme;
};

export function buildAbcJsStyles({
  paperId,
  audioId,
  theme,
}: BuildAbcJsStylesArgs): string {
  const PLAYER_HEIGHT_PX = 22;
  const PLAYER_PADDING_X_PX = 6;
  const PLAYER_PADDING_Y_PX = 2;

  const BUTTON_WIDTH_PX = 22;
  const BUTTON_HEIGHT_PX = 26;
  const BUTTON_PADDING_X_PX = 2;
  const BUTTON_PADDING_Y_PX = 4;

  const audioBg =
    theme.palette.mode === "light"
      ? theme.palette.common.white
      : alpha(theme.palette.common.black, 0.35);
  const btnColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[900]
      : theme.palette.common.white;
  const progressBg =
    theme.palette.mode === "light"
      ? theme.palette.grey[200]
      : alpha(theme.palette.common.white, 0.12);

  return `
#${paperId} .abcjs-highlight { fill: ${theme.palette.primary.main}; }
#${paperId} .abcjs-cursor { stroke: ${theme.palette.error.main}; }

/* Audio controls (abcjs-audio.css styles icons via ".abcjs-btn g") */
#${audioId} .abcjs-inline-audio {
  height: ${PLAYER_HEIGHT_PX}px !important;
  background-color: ${audioBg} !important;
  border: 1px solid ${theme.palette.divider} !important;
  border-radius: ${theme.shape.borderRadius}px !important;
  padding: ${PLAYER_PADDING_Y_PX}px ${PLAYER_PADDING_X_PX}px !important;
}

#${audioId} .abcjs-inline-audio .abcjs-btn {
  width: ${BUTTON_WIDTH_PX}px !important;
  height: ${BUTTON_HEIGHT_PX}px !important;
  background-color: transparent !important;
  border: none !important;
  border-radius: ${theme.shape.borderRadius}px !important;
  padding: ${BUTTON_PADDING_Y_PX}px ${BUTTON_PADDING_X_PX}px !important;
  margin-right: 2px !important;
  box-sizing: border-box !important;
}

#${audioId} .abcjs-inline-audio .abcjs-btn g {
  fill: ${btnColor} !important;
  stroke: ${btnColor} !important;
}

#${audioId} .abcjs-inline-audio .abcjs-btn:hover {
  background-color: transparent !important;
  border-color: transparent !important;
}

#${audioId} .abcjs-inline-audio .abcjs-btn:hover g {
  fill: ${theme.palette.primary.main} !important;
  stroke: ${theme.palette.primary.main} !important;
}

#${audioId} .abcjs-inline-audio .abcjs-midi-selection.abcjs-pushed,
#${audioId} .abcjs-inline-audio .abcjs-midi-loop.abcjs-pushed,
#${audioId} .abcjs-inline-audio .abcjs-midi-reset.abcjs-pushed {
  background-color: transparent !important;
  border-color: transparent !important;
}

#${audioId} .abcjs-inline-audio .abcjs-midi-selection.abcjs-pushed g,
#${audioId} .abcjs-inline-audio .abcjs-midi-loop.abcjs-pushed g,
#${audioId} .abcjs-inline-audio .abcjs-midi-reset.abcjs-pushed g {
  fill: ${theme.palette.primary.main} !important;
  stroke: ${theme.palette.primary.main} !important;
}

#${audioId} .abcjs-inline-audio .abcjs-midi-progress-background {
  background-color: ${progressBg} !important;
  border-color: ${theme.palette.divider} !important;
}

#${audioId} .abcjs-inline-audio .abcjs-midi-progress-indicator {
  background-color: ${theme.palette.primary.main} !important;
}

#${audioId} .abcjs-inline-audio .abcjs-midi-clock,
#${audioId} .abcjs-inline-audio .abcjs-tempo-wrapper {
  color: ${theme.palette.text.primary} !important;
}
`;
}
