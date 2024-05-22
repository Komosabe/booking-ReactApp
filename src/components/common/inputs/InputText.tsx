import { TextInput, TextInputProps } from '@mantine/core'
import { Controller, useFormContext } from 'react-hook-form'

export type TInputTextProps = {
  name: string
} & TextInputProps
export const InputText = ({ name, ...props }: TInputTextProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput value={value} onChange={onChange} error={error?.message} {...props} />
      )}
    />
  )
}
