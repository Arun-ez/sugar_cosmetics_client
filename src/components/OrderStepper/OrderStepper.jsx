import {
    Box,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
} from '@chakra-ui/react';

const OrderStepper = ({ active }) => {

    const steps = [
        { title: 'Confirmed' },
        { title: 'Shipped' },
        { title: 'In Transit' },
        { title: 'Delivered' }
    ]

    return (
        <Stepper size={['sm', 'lg', 'lg', 'lg']} colorScheme={'blue'} index={active === 3 ? active + 1 : active} py={10}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0' display={index === active ? 'block' : ['none', 'none', 'block', 'block']} >
                        <StepTitle fontSize={15} >{step.title}</StepTitle>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}

export { OrderStepper }