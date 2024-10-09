'use client'

import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import { Images } from 'lucide-react'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";
import { FLIGHT_PARAMETERS } from 'next/dist/client/components/app-router-headers'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomProps{
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disable?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({field, props}: {field: any; props: CustomProps}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return(
        <div className="flex rounded-md border border-dark-400 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icons"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return(
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )  
    case FormFieldType.DATE_PICKER:
      return(
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className='ml-2'
          />
          <FormControl>
            <DatePicker 
              selected={field.value} 
              onChange={(date) => field.onChange(date)} 
              dateFormat={props.dateFormat ?? 'mm/dd/yyyy'}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel='Time:'
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      )

    case FormFieldType.SKELETON:
      return(
        props.renderSkeleton ? props.renderSkeleton
        (field) : null 
      )
    default:
      break;
  }
}

const CustomFormField = (props: CustomProps) => {
  const{control, fieldType, name, label} = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType != FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props}/>
          <FormMessage className="shad-error"/>

        </FormItem>
      )}
    />
  )
}

export default CustomFormField
