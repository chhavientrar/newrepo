import { Helmet } from 'react-helmet-async';

import AttendaceReport from 'src/sections/file-manager/view/attendaceReport';



// ----------------------------------------------------------------------

export default function AttendaceReportPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Attendance Report</title>
            </Helmet>

            <AttendaceReport />
        </>
    );
}
