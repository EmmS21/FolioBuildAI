import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const NavButtonsComponent = ({ activeStep, setActiveStep, steps, onFinish })  => {

    const handleNext = () => {
        if(activeStep < steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (onFinish){
            onFinish();
        }
    }

    const handleBack = () => {
        if(activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button 
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }} 
            >
                Back
            </Button>
            <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
    )
}

export default NavButtonsComponent;