# AI Failure Audit — Esports Fair-Play Appeal Tribunal

## Implementation scope

This review covers the React 19 prototype for the Himass and TanVuu case study.
The prototype supports dossier navigation, local appeal form validation, and a
demo countdown. Player records are defined in the frontend. The demo uses
15-minute and 20-minute appeal windows and stores the shared start time in
sessionStorage so both deadlines survive a refresh in the same tab.

The assignment title describes a full-stack application. The current
implementation covers the frontend. The supplied screenshot leaves the API,
persistence, and official deadline requirements unspecified.

## Architecture decisions

| Area | Implementation | Why it was chosen |
| --- | --- | --- |
| Dossier routing | One route, `/dossier/:playerID`, resolves the player by ID. | The same page handles both players and gives feedback for an unknown ID. |
| Form state | An `AppealFormProvider` owns the values and interaction state for the current dossier. | Validation and input values use the same state, and switching players clears the draft. |
| Live validation | Errors are derived from the current field values. Edited fields show feedback immediately, and a submit attempt reveals all errors. | An error clears as soon as the field becomes valid. |
| Countdown | `useAppealSlaTimer()` calculates the time remaining from the absolute deadline and `Date.now()`. | A late timeout callback may delay the display update, but the next update reflects the elapsed time. |
| Timer lifecycle | The hook refreshes when the tab becomes visible and removes its timeout and event listener on unmount. | A timer from a previous dossier cannot keep running after that dossier is left. |

## Issue found in the AI-assisted draft

The countdown and form provider were siblings with the same `player.id` key.
React keys must be unique among siblings so React can identify each component
correctly during an update. The fix uses `countdown-${player.id}` and
`form-${player.id}`. Each component now has a distinct key, and both keys still
change when the player changes.

## Remaining limitations

- A valid form displays a validation confirmation in the browser. The current
  application has no appeal submission endpoint or persistent appeal records.
- The countdown uses the browser clock and a tab-specific demo start time.
  Changing the device clock can change the displayed time. A real tribunal
  would store the deadline on the server and enforce it when receiving an appeal.
- Expiry updates the countdown and displays a closed-window message. The
  form still allows local validation after expiry.

## Verification checklist

Run the following checks in a local build. The table lists expected results.

| Check | Expected result |
| --- | --- |
| Open `/dossier/himass` and `/dossier/tanvuu` | Each URL displays the correct player. |
| Open `/dossier/unknown` | The page displays “Case not found.” |
| Submit the empty form, then correct both fields | Required-field errors appear and clear as the fields become valid. |
| Enter a draft and switch players | The destination form is empty and the development console shows no duplicate-key warning from the dossier components. |
| Leave the tab for several seconds, then return | The countdown reflects the elapsed time. |
| Refresh the dossier in the same tab | The countdown continues from the same demo deadline. |
| Let the countdown expire | It displays `00:00` and the closed-window message. |
| Run `npm run build` | Vite completes the production build. |