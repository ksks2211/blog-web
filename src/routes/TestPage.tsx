import SnackbarAlert from "../features/shared/components/SnackbarAlert";
import { useSnackbarState } from "../features/shared/hooks/useSnackbarState";

export default function TestPage() {
  const { closeSnackbar, displaySnackbar, snackbarState } = useSnackbarState({
    severity: "warning",
    duration: 2000,
  });

  return (
    <div>
      <button
        onClick={() =>
          displaySnackbar(
            "Hello World!dsad sadsakdjksadjksad jksadjks adjksadjjjjj jjjjjjjj jjjjjjjjj jjjjjjjjj jjjj jjjjds adsads akdjks adjksa djksadj ksadjksadjj jjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjj"
          )
        }
      >
        Open snackbar
      </button>

      <SnackbarAlert onClose={closeSnackbar} snackbarState={snackbarState} />
    </div>
  );
}
