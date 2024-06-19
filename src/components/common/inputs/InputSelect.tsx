import { Select, SelectProps } from '@mantine/core'
import { Controller, useFormContext } from 'react-hook-form'

export type TInputSelectProps = {
  name: string
} & SelectProps
export const InputSelect = ({ name, ...props }: TInputSelectProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select value={value} onChange={onChange} error={error?.message} {...props} />
      )}
    />
  )
}
