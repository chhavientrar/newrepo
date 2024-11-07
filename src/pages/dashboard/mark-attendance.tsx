import { Helmet } from 'react-helmet-async';
import MarkAttendanceView from 'src/sections/file-manager/view/markAttendance';

// ----------------------------------------------------------------------

export default function MarkAttendancePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Mark Attendace</title>
      </Helmet>

      <MarkAttendanceView />
    </>
  );
}
