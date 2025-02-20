import React from 'react';

import LeaderBoard from "./LeaderBoard";

export const App:React.FC = (props) => {
    return (
        <div>
            <h1>Spring Leaderboard</h1>
            <hr/>
            <LeaderBoard />
        </div>
    );
};

export default App;
