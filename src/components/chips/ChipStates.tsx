"use client"
import { ColorTypes } from '@/interfaces';
import React, { useEffect } from 'react'

export const ChipStates = ({
    label,
    color
}:{
    label: string;
    color: ColorTypes;
}) => {

  const [colorText, setColorText] = React.useState<string>('');
  const [bgColor, setBgColor] = React.useState<string>('');

  useEffect(() => {
    setColorText(`text-${color}-text`);
    setBgColor(`bg-${color}`);
    }
  , [color]);
  
  return (
    <>
        <span className={`px-3 py-1 text-xs font-semibold ${colorText} ${bgColor} rounded-full`}>
            {label}
        </span>
    </>
  )
}

