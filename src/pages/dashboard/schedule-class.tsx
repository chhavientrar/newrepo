import { Helmet } from 'react-helmet-async';

import ScheduleClassView from 'src/sections/file-manager/view/schedule';

// ----------------------------------------------------------------------

export default function ScheduleClasses() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Schedule Class</title>
            </Helmet>

            <ScheduleClassView />
        </>
    );
}
