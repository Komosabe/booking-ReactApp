import { DatePicker, DatePickerProps, DateTimePicker, DateTimePickerProps } from '@mantine/dates'
import { Controller, useFormContext } from 'react-hook-form'

export type TInputDateTimePickerProps = {
  name: string
} & DateTimePickerProps
export const InputDateTimePicker = ({ name, ...props }: TInputDateTimePickerProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DateTimePicker value={value} onChange={onChange} error={error?.message} {...props} />
      )}
    />
  )
}
