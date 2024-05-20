import { NumberInput, NumberInputProps } from '@mantine/core'
import { Controller, useFormContext } from 'react-hook-form'

export type TInputNumberProps = {
  name: string
} & NumberInputProps
export const InputNumber = ({ name, ...props }: TInputNumberProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <NumberInput value={value} onChange={onChange} error={error?.message} {...props} />
      )}
    />
  )
}
