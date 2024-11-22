import { Helmet } from 'react-helmet-async';

import QuizComponentView from 'src/sections/file-manager/view/quizReport';

export default function QuizComponentPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Quiz</title>
            </Helmet>

            <QuizComponentView />
        </>
    );
}
