import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {Typography, Divider} from "@mui/material";

import LeaderBoard from "./LeaderBoard";

export const App:React.FC = (props) => {
    return (
        <div>
            <Typography variant="h3">Spring Leaderboard</Typography>
            <Divider sx={{my:2}}/>
            <LeaderBoard />
        </div>
    );
};

export default App;
