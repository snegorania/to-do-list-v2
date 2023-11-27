import React, { useState } from 'react';

function useInput (func) {
    const [value, setValue] = useState('');
    const [isBlur, setIsBlur] = useState(false);

    const isValid = func(value);
    const isNotValid = isBlur && !func(value);

    const handleChange = e => setValue(e.target.value);
    const handleBlur = () => setIsBlur(true);
    
    const reset = () => {
        setValue('');
        setIsBlur(false);
    }

    return [{value, isValid, isNotValid}, {handleChange, handleBlur, reset, setValue}];
}

export default useInput;